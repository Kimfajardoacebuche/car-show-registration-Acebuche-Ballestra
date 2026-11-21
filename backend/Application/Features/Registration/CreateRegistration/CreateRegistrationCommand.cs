using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;

namespace Application.Features.Registration.CreateRegistration;

public sealed record CreateRegistrationCommand(
    string ParticipantName,
    string ContactNumber,
    string Email,
    string Address,
    string CarMakeModel,
    string PlateNumber,
    Domain.Entities.Registration.RegistrationTypeEnum RegistrationType,
    decimal AmountPaid
) : ICommand<Result<CreateRegistrationResponse>>;