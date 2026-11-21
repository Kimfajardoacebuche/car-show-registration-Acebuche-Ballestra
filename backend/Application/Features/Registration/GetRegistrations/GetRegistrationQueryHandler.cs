using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using RegistrationEntity = Domain.Entities.Registration;

namespace Application.Features.Registration.GetRegistrations;

public class GetRegistrationsQueryHandler
    : IQueryHandler<GetRegistrationsQuery, Result<PageResult<RegistrationResponse>>>
{
    private readonly IAppDbContext _context;

    public GetRegistrationsQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PageResult<RegistrationResponse>>> HandleAsync(
        GetRegistrationsQuery query,
        CancellationToken cancellationToken = default)
    {
        var errors = new List<string>();

        if (query.Page < 1)
            errors.Add("Page must be greater than or equal to 1.");

        if (query.PageSize < 1 || query.PageSize > 50)
            errors.Add("PageSize must be between 1 and 50.");

        if (!string.IsNullOrWhiteSpace(query.ParticipantName) && query.ParticipantName.Trim().Length > 150)
            errors.Add("ParticipantName must not exceed 150 characters.");

        // DITO ILALAGAY (sa loob ng HandleAsync sa GetRegistrationsQueryHandler.cs):
        RegistrationEntity.RegistrationTypeEnum? parsedType = null;
        if (!string.IsNullOrWhiteSpace(query.Type))
        {
            if (Enum.TryParse<RegistrationEntity.RegistrationTypeEnum>(query.Type.Trim(), ignoreCase: true, out var t)
                && Enum.IsDefined(t))
            {
                parsedType = t;
            }
            else
            {
                errors.Add($"Invalid registration type '{query.Type}'.");
            }
        }

        RegistrationEntity.StatusEnum? parsedStatus = null;
        if (!string.IsNullOrWhiteSpace(query.Status))
        {
            if (Enum.TryParse<RegistrationEntity.StatusEnum>(query.Status.Trim(), ignoreCase: true, out var s)
                && Enum.IsDefined(s))
            {
                parsedStatus = s;
            }
            else
            {
                errors.Add($"Invalid status '{query.Status}'.");
            }
        }

        if (errors.Count > 0)
            return Result<PageResult<RegistrationResponse>>.Failure(errors, "Registration.Validation");

        var q = _context.Registrations.AsNoTracking().AsQueryable();

        if (parsedType.HasValue)
            q = q.Where(r => r.RegistrationType == parsedType.Value);

        if (parsedStatus.HasValue)
            q = q.Where(r => r.Status == parsedStatus.Value);

        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            var term = query.ParticipantName.Trim().ToLower();
            q = q.Where(r => r.ParticipantName.ToLower().Contains(term));
        }

        var totalCount = await q.CountAsync(cancellationToken);

        var items = await q
            .OrderByDescending(r => r.RegistrationDate)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(cancellationToken);

        var mapped = items.Select(r => new RegistrationResponse(
            r.Id,
            r.RegistrationNumber,
            r.RegistrationDate,
            r.ParticipantName,
            r.ContactNumber,
            r.Email,
            r.Address,
            r.CarMakeModel,
            r.PlateNumber,
            r.RegistrationType.ToString(),
            r.Status.ToString(),
            r.RegistrationFee,
            r.AmountPaid,
            r.AmountPaid <= 0m ? "Unpaid" : r.AmountPaid < r.RegistrationFee ? "Partial" : "Paid"
        )).ToList();

        return Result<PageResult<RegistrationResponse>>.Success(new PageResult<RegistrationResponse>
        {
            Items = mapped,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        });
    }
}