using System.Security.Claims;
using Villsource.TheCatsLedger.Domain;

namespace Villsource.TheCatsLedger.Services;

public interface ICurrentUser
{
    bool IsAuthenticated { get; }
    string? UserId { get; }
    string? Name { get; }
    string? PictureUrl { get; }
}

public class CurrentUser(IHttpContextAccessor httpContextAccessor) : ICurrentUser
{
    private ClaimsPrincipal? Principal => httpContextAccessor.HttpContext?.User;

    public bool IsAuthenticated => Principal?.Identity?.IsAuthenticated ?? false;

    public string? UserId => 
        Principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? 
        Principal?.FindFirst("sub")?.Value;

    public string? Name => 
        Principal?.FindFirst(ClaimTypes.Name)?.Value ?? 
        Principal?.FindFirst("name")?.Value;

    public string? PictureUrl => 
        Principal?.FindFirst("picture")?.Value;

}