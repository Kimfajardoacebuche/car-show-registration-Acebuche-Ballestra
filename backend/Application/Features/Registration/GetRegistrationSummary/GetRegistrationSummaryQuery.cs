using Application.Abstractions.Messaging;
using Domain.Common;

namespace Application.Features.Registration.GetRegistrationSummary;

public record GetRegistrationSummaryQuery() : IQuery<Result<RegistrationSummaryResponse>>;