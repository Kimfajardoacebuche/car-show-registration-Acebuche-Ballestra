using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registration.GetRegistrations;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Registration.GetRegistrationById;

public class GetRegistrationByIdQueryHandler : IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>>
{
    private readonly IAppDbContext _context;

    public GetRegistrationByIdQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<Result<RegistrationResponse>> HandleAsync(
        GetRegistrationByIdQuery query,
        CancellationToken cancellationToken = default)
    {
        var registration = await _context.Registrations
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == query.Id, cancellationToken);

        if (registration == null)
        {
            return Result<RegistrationResponse>.Failure(["Registration not found."], "Registration.NotFound");
        }

        string paymentStatus = registration.AmountPaid switch
        {
            0 => "Unpaid",
            var p when p < registration.RegistrationFee => "Partial",
            _ => "Paid"
        };

        var response = new RegistrationResponse(
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

        return Result<RegistrationResponse>.Success(response);
    }
}