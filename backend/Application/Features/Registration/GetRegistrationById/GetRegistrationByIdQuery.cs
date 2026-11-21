using Application.Features.Registration.GetRegistrations;
using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registration.GetRegistrationById;

public sealed record GetRegistrationByIdQuery(Guid Id) : IQuery<Result<RegistrationResponse>>;