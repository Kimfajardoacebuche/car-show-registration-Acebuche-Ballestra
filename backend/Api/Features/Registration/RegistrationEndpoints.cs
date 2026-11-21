using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Registration.CreateRegistration;
using Application.Features.Registration.GetRegistrationById;
using Application.Features.Registration.GetRegistrations;
using Application.Features.Registration.GetRegistrationSummary;
using Domain.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Api.Features.Registration;

public static class RegistrationEndpoints
{
    public static void MapRegistrationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/registrations").WithTags("Registration");

        group.MapPost("/", async (
            ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>> handler,
            CreateRegistrationCommand command,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(command, cancellationToken);
            return result.IsSuccess
                ? Results.Created($"/api/registrations/{result.Value!.Id}", result.Value)
                : result.ToProblemDetails();
        })
        .WithName("CreateRegistration")
        .Produces<CreateRegistrationResponse>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status409Conflict);

        group.MapGet("/", async (
            IQueryHandler<GetRegistrationsQuery, Result<PageResult<RegistrationResponse>>> handler,
            string? type,
            string? status,
            string? participantName,
            CancellationToken cancellationToken,
            int page = 1,
            int pageSize = 10) =>
        {
            var query = new GetRegistrationsQuery(page, pageSize, type, status, participantName);
            var result = await handler.HandleAsync(query, cancellationToken);

            return result.IsSuccess
                ? Results.Ok(result.Value)
                : result.ToProblemDetails();
        })
        .WithName("GetRegistrations")
        .Produces<PageResult<RegistrationResponse>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest);

        group.MapGet("/summary", async (
            IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>> handler,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(new GetRegistrationSummaryQuery(), cancellationToken);
            return result.IsSuccess
                ? Results.Ok(result.Value)
                : result.ToProblemDetails();
        })
        .WithName("GetRegistrationSummary")
        .Produces<RegistrationSummaryResponse>(StatusCodes.Status200OK);

        group.MapGet("/{id:guid}", async (
            IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>> handler,
            Guid id,
            CancellationToken cancellationToken) =>
        {
            var result = await handler.HandleAsync(new GetRegistrationByIdQuery(id), cancellationToken);
            return result.IsSuccess
                ? Results.Ok(result.Value)
                : result.ToProblemDetails();
        })
        .WithName("GetRegistrationById")
        .Produces<RegistrationResponse>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status404NotFound);
    }
}