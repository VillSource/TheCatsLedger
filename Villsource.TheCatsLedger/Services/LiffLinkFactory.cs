namespace Villsource.TheCatsLedger.Services;

using Microsoft.Extensions.Options;

public interface ILiffLinkFactory
{
    string GetBillDetailUrl(Guid billId);
}

public class LiffLinkFactory( IConfiguration configuration ) : ILiffLinkFactory
{
    private const string _baseUrl = "https://miniapp.line.me/";
    
    public string GetBillDetailUrl(Guid billId)
    {
        var baseUrl = _baseUrl + configuration["LineOptions:LIFFID"] ?? throw new ArgumentNullException($"config:LineOptions:LIFFID");
        var path = "/bills/" + billId;
        return $"{baseUrl}{path}";
    }
}