using FluentValidation;
using RegistrationEntity = Domain.Entities.Registration;

namespace Application.Features.Registration.CreateRegistration;

public class CreateRegistrationCommandValidator : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationCommandValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty().WithMessage("'Participant Name' must not be empty.")
            .MaximumLength(150).WithMessage("Participant name must not exceed 150 characters.");

        RuleFor(x => x.ContactNumber)
            .NotEmpty().WithMessage("'Contact Number' must not be empty.")
            .Matches(@"^09\d{9}$").WithMessage("Contact number must follow the 09XXXXXXXXX format (11 digits starting with 09).");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("'Email' must not be empty.")
            .EmailAddress().WithMessage("Email must be a valid email address.")
            .MaximumLength(200).WithMessage("Email must not exceed 200 characters.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("'Address' must not be empty.")
            .MaximumLength(300).WithMessage("Address must not exceed 300 characters.");

        RuleFor(x => x.CarMakeModel)
            .NotEmpty().WithMessage("'Car Make Model' must not be empty.")
            .MaximumLength(100).WithMessage("Car make and model must not exceed 100 characters.");

        RuleFor(x => x.PlateNumber)
            .NotEmpty().WithMessage("'Plate Number' must not be empty.")
            .Must(p => string.IsNullOrWhiteSpace(p) || p.Trim().Length <= 15)
            .WithMessage("Plate number must not exceed 15 characters.");

        RuleFor(x => x.RegistrationType)
            .IsInEnum().WithMessage("Invalid registration type. Allowed values: Exhibitor, Competitor, VIP.");

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0m).WithMessage("Amount paid must be 0 or more.")
            .Must((cmd, amountPaid) => amountPaid <= GetFee(cmd.RegistrationType))
            .WithMessage(cmd => $"Amount paid cannot be more than the fee ({GetFee(cmd.RegistrationType):N0}).");
    }

    private static decimal GetFee(RegistrationEntity.RegistrationTypeEnum type) => type switch
    {
        RegistrationEntity.RegistrationTypeEnum.Exhibitor => 1500m,
        RegistrationEntity.RegistrationTypeEnum.Competitor => 2500m,
        RegistrationEntity.RegistrationTypeEnum.VIP => 5000m,
        _ => 0m
    };
}