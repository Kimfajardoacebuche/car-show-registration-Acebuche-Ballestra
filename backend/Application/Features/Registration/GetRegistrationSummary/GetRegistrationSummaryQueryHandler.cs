using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using RegistrationEntity = Domain.Entities.Registration;

namespace Application.Features.Registration.GetRegistrationSummary;

public class GetRegistrationSummaryQueryHandler
    : IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>>
{
    private readonly IAppDbContext _context;

    public GetRegistrationSummaryQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<RegistrationSummaryResponse>> HandleAsync(
        GetRegistrationSummaryQuery query,
        CancellationToken cancellationToken = default)
    {
        var all = await _context.Registrations
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        int totalRegistrations = all.Count;
        int confirmed = all.Count(r => r.Status == RegistrationEntity.StatusEnum.Confirmed);
        int checkedIn = all.Count(r => r.Status == RegistrationEntity.StatusEnum.CheckedIn);
        int pending = all.Count(r => r.Status == RegistrationEntity.StatusEnum.Pending);
        int cancelled = all.Count(r => r.Status == RegistrationEntity.StatusEnum.Cancelled);

        var active = all.Where(r => r.Status != RegistrationEntity.StatusEnum.Cancelled);
        decimal totalFees = active.Sum(r => r.RegistrationFee);
        decimal totalPayments = active.Sum(r => r.AmountPaid);
        decimal uncollectedPayments = totalFees - totalPayments;

        var summary = new RegistrationSummaryResponse(
            totalRegistrations,
            confirmed,
            checkedIn,
            pending,
            cancelled,
            totalFees,
            totalPayments,
            uncollectedPayments
        );

        return Result<RegistrationSummaryResponse>.Success(summary);
    }
}