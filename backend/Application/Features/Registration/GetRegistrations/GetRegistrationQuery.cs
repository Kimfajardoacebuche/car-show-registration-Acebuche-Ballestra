using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registration.GetRegistrations;

public sealed record GetRegistrationsQuery(
    int Page = 1,
    int PageSize = 10,
    string? Type = null,
    string? Status = null,
    string? ParticipantName = null
) : IQuery<Result<PageResult<RegistrationResponse>>>;