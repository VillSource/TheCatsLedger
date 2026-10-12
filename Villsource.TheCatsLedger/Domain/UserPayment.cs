namespace Villsource.TheCatsLedger.Domain;

public class UserPayment : AuditableEntity
{
    public Guid Id { get; init; }

    public string Channel { get; set; }   
    public string ChannelName { get; set; }   
    public string AccountNo { get; set; }
    public string Name { get; set; }    
}