using Microsoft.EntityFrameworkCore;
using Villsource.TheCatsLedger.Data;
using Villsource.TheCatsLedger.Domain;
using Villsource.TheCatsLedger.Services;

namespace Villsource.TheCatsLedger.Feature.v1.Ledgers;

public static class Endpoints
{
    public static void MapLedgers(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("seeding", async (AppDbContext db, CancellationToken ct) =>
        {
            db.Bills.Add(new Bill(Guid.CreateVersion7(), "", 1.0m));
            await db.SaveChangesAsync(ct).ConfigureAwait(false);
        });

        endpoints.MapGet("ledgers", async (AppDbContext db, CancellationToken ct) =>
        {
            return db.Bills.ToListAsync(ct);
        }).RequireAuthorization();
        
        
        endpoints.MapGet("me", (ICurrentUser usr, CancellationToken ct) =>
        {
            return new
            {
                usr.UserId,
                usr.Name,
                usr.PictureUrl,
            };
        }).RequireAuthorization();
    }
}