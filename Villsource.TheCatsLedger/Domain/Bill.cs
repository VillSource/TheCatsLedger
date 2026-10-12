namespace Villsource.TheCatsLedger.Domain;

public class BillPayer : AuditableEntity
{
    public Guid Id { get; init; }
    public Guid BillId { get; init; }
    public bool IsPay { get; set; }
    public bool IsConfirm { get; set; }
}
public class Bill : AuditableEntity
{
    public Guid Id { get; init; }

    public string Name { get; init; }
    public string? Emoji { get; private set; }
    public decimal Amount { get; init; }
    public string? Notes { get; private set; }

    public ICollection<BillPayer> Payers { get; set; } =  new List<BillPayer>();

    private Bill(){}
    public Bill(Guid id, string name, decimal amount)
    {
        Id = id;
        Name = name;
        Amount = amount;
    }

    public void SetEmoji(string? emoji)
    {
        Emoji = emoji;
    }

    public void SetNotes(string? notes)
    {
        Notes = notes;
    }
}