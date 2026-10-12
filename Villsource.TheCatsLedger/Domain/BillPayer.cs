namespace Villsource.TheCatsLedger.Domain;

public class BillPayer : AuditableEntity
{
    public Guid Id { get; init; }
    public Guid BillId { get; init; }
    public bool IsPay { get; set; }
    public bool IsConfirm { get; set; }
}