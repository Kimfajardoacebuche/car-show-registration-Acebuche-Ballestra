using FluentValidation;

namespace Application.Features.Registration.GetRegistrations;

public class GetRegistrationsQueryValidator : AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsQueryValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1)
            .WithMessage("Page must be greater than or equal to 1.");

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 50)
            .WithMessage("PageSize must be between 1 and 50.");

        RuleFor(x => x.Type)
            .Must(type => string.IsNullOrWhiteSpace(type) ||
                         type is "Exhibitor" or "Competitor" or "VIP")
            .WithMessage("Invalid registration type filter.");

        RuleFor(x => x.Status)
            .Must(status => string.IsNullOrWhiteSpace(status) ||
                           status is "Pending" or "Confirmed" or "CheckedIn" or "Cancelled")
            .WithMessage("Invalid status filter.");

        RuleFor(x => x.ParticipantName)
            .MaximumLength(150)
            .When(x => !string.IsNullOrEmpty(x.ParticipantName))
            .WithMessage("ParticipantName must not exceed 150 characters.");
    }
}