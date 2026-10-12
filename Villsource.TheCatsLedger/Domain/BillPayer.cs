namespace Villsource.TheCatsLedger.Domain;

public class BillPayer : AuditableEntity
{
    public Guid Id { get; init; }
    public Guid BillId { get; init; }
    public bool IsPay { get; set; }
    public bool IsConfirm { get; set; }
    
    public string? SlipImageBase64 { get; set; }
    public string? PayerNote { get; set; }
    public DateTimeOffset? PaidAt { get; set; }
    public DateTimeOffset? ConfirmedAt { get; set; }
}