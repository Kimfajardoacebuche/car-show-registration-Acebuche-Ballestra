using Api.Features.Registration;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registration.CreateRegistration;
using Application.Features.Registration.GetRegistrationById;
using Application.Features.Registration.GetRegistrations;
using Application.Features.Registration.GetRegistrationSummary;
using Domain.Common;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Database - SQLite (EF Core)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=carshow.db";
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

// Validators
builder.Services.AddValidatorsFromAssembly(typeof(IAppDbContext).Assembly);

// Handlers
builder.Services.AddScoped<ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>, CreateRegistrationCommandHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationsQuery, Result<PageResult<RegistrationResponse>>>, GetRegistrationsQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>>, GetRegistrationByIdQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>>, GetRegistrationSummaryQueryHandler>();

// API & OpenAPI
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, _, _) =>
    {
        document.Info.Title = "Car Show Registration System API";
        document.Info.Description = "Backend API for Car Show 2027 Registration System";
        return Task.CompletedTask;
    });
});

// CORS
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
var isDevelopment = builder.Environment.IsDevelopment();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
                allowedOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase) ||
                (isDevelopment && Uri.TryCreate(origin, UriKind.Absolute, out _)))
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Seed data (25 registrations across types, statuses, and payment states)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();

    if (!await dbContext.Registrations.AnyAsync())
    {
        var baseUtc = DateTime.UtcNow.AddDays(-2);
        var seeds = new List<Registration>();

        for (int i = 1; i <= 25; i++)
        {
            var registrationType = (i % 3) switch
            {
                1 => Registration.RegistrationTypeEnum.Exhibitor,
                2 => Registration.RegistrationTypeEnum.Competitor,
                _ => Registration.RegistrationTypeEnum.VIP
            };

            // Covers Confirmed (10), CheckedIn (6), Pending (6), Cancelled (3) = 25 total
            var status = i <= 10
                ? Registration.StatusEnum.Confirmed
                : i <= 16
                    ? Registration.StatusEnum.CheckedIn
                    : i <= 22
                        ? Registration.StatusEnum.Pending
                        : Registration.StatusEnum.Cancelled;

            decimal fee = registrationType switch
            {
                Registration.RegistrationTypeEnum.Exhibitor => 1500m,
                Registration.RegistrationTypeEnum.Competitor => 2500m,
                Registration.RegistrationTypeEnum.VIP => 5000m,
                _ => 0m
            };

            // Cancelled registrations have 0 paid; active ones cover Unpaid (0), Partial, and Paid (full fee)
            decimal amountPaid = status == Registration.StatusEnum.Cancelled
                ? 0m
                : (i % 3) switch
                {
                    1 => fee,                         // Paid
                    2 => Math.Round(fee * 0.5m, 2), // Partial
                    _ => 0m                          // Unpaid
                };

            seeds.Add(new Registration
            {
                Id = Guid.NewGuid(),
                RegistrationNumber = $"CS27-{i:D4}",
                RegistrationDate = baseUtc.AddMinutes(i),
                ParticipantName = $"Seed Participant {i:D2}",
                ContactNumber = $"0917{1000000 + i:D7}",
                Email = $"participant{i:D2}@example.com",
                Address = $"Sorsogon City #{i}",
                CarMakeModel = i % 2 == 0 ? "Toyota Supra MK4" : "Honda Civic Type R",
                PlateNumber = $"CAR {i:D4}",
                RegistrationType = registrationType,
                Status = status,
                RegistrationFee = fee,
                AmountPaid = amountPaid
            });
        }

        dbContext.Registrations.AddRange(seeds);
        await dbContext.SaveChangesAsync();
    }
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors("Frontend");

// Root endpoint
app.MapGet("/", () => "Welcome to the Car Show Registration API! Go to /scalar/v1 for API documentation.");

// Map endpoints under /api
app.MapGroup("/api").MapRegistrationEndpoints();

app.Run();