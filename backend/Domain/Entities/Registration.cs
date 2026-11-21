using Domain.Common;

namespace Domain.Entities;

public class Registration : BaseEntity
{
    public string RegistrationNumber { get; set; } = default!;
    public DateTime RegistrationDate { get; set; }
    public string ParticipantName { get; set; } = default!;
    public string ContactNumber { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Address { get; set; } = default!;
    public string CarMakeModel { get; set; } = default!;
    public string PlateNumber { get; set; } = default!;

    public RegistrationTypeEnum RegistrationType { get; set; }
    public StatusEnum Status { get; set; }

    public decimal RegistrationFee { get; set; }
    public decimal AmountPaid { get; set; }

    public enum RegistrationTypeEnum
    {
        Exhibitor,
        Competitor,
        VIP
    }

    public enum StatusEnum
    {
        Pending,
        Confirmed,
        CheckedIn,
        Cancelled
    }
}