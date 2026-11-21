using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using RegistrationEntity = Domain.Entities.Registration;

namespace Application.Features.Registration.CreateRegistration;

public class CreateRegistrationCommandHandler : ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>
{
    private readonly IAppDbContext _dbContext;
    private readonly IValidator<CreateRegistrationCommand> _validator;

    public CreateRegistrationCommandHandler(IAppDbContext dbContext, IValidator<CreateRegistrationCommand> validator)
    {
        _dbContext = dbContext;
        _validator = validator;
    }

    public async Task<Result<CreateRegistrationResponse>> HandleAsync(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
            return Result<CreateRegistrationResponse>.Failure(errors, "Registration.Validation");
        }

        var normalizedPlate = command.PlateNumber.Trim();
        var existingPlate = await _dbContext.Registrations
            .AnyAsync(r => r.PlateNumber.ToLower() == normalizedPlate.ToLower(), cancellationToken);

        if (existingPlate)
        {
            return Result<CreateRegistrationResponse>.Failure(
                [$"A registration with plate number '{normalizedPlate}' already exists."],
                "Registration.Conflict");
        }

        decimal fee = command.RegistrationType switch
        {
            RegistrationEntity.RegistrationTypeEnum.Exhibitor => 1500m,
            RegistrationEntity.RegistrationTypeEnum.Competitor => 2500m,
            RegistrationEntity.RegistrationTypeEnum.VIP => 5000m,
            _ => throw new ArgumentOutOfRangeException(nameof(command.RegistrationType), "Invalid registration type.")
        };

        var existingNumbers = await _dbContext.Registrations
            .AsNoTracking()
            .Where(r => r.RegistrationNumber.StartsWith("CS27-"))
            .Select(r => r.RegistrationNumber)
            .ToListAsync(cancellationToken);

        int maxNumber = 0;
        foreach (var regNum in existingNumbers)
        {
            var parts = regNum.Split('-');
            if (parts.Length == 2 && int.TryParse(parts[1], out var parsedNum) && parsedNum > maxNumber)
            {
                maxNumber = parsedNum;
            }
        }

        int numberNext = maxNumber + 1;
        string generatedRegistrationNumber = $"CS27-{numberNext:D4}";

        var registration = new RegistrationEntity
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = generatedRegistrationNumber,
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName.Trim(),
            ContactNumber = command.ContactNumber.Trim(),
            Email = command.Email.Trim(),
            Address = command.Address.Trim(),
            CarMakeModel = command.CarMakeModel.Trim(),
            PlateNumber = normalizedPlate,
            RegistrationType = command.RegistrationType,
            Status = RegistrationEntity.StatusEnum.Pending,
            RegistrationFee = fee,
            AmountPaid = command.AmountPaid
        };

        _dbContext.Registrations.Add(registration);

        try
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException)
        {
            return Result<CreateRegistrationResponse>.Failure(
                [$"A registration with plate number '{normalizedPlate}' already exists."],
                "Registration.Conflict");
        }

        string paymentStatus = registration.AmountPaid switch
        {
            0 => "Unpaid",
            var p when p < registration.RegistrationFee => "Partial",
            _ => "Paid"
        };

        var response = new CreateRegistrationResponse(
            registration.Id,
            registration.RegistrationNumber,
            registration.RegistrationDate,
            registration.ParticipantName,
            registration.ContactNumber,
            registration.Email,
            registration.Address,
            registration.CarMakeModel,
            registration.PlateNumber,
            registration.RegistrationType.ToString(),
            registration.Status.ToString(),
            registration.RegistrationFee,
            registration.AmountPaid,
            paymentStatus
        );

        return Result<CreateRegistrationResponse>.Success(response);
    }
}