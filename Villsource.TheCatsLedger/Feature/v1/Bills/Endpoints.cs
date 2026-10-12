using Microsoft.EntityFrameworkCore;
using Villsource.TheCatsLedger.Data;
using Villsource.TheCatsLedger.Domain;
using Villsource.TheCatsLedger.Services;

namespace Villsource.TheCatsLedger.Feature.v1.Bills;

public static class Endpoints
{
    public record AddBillBody(string Name, decimal Amount, string? Emoji, string? Note);

    public static void MapBills(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("bills");

        group.MapPost("", async (AddBillBody body, ICurrentUser usr, AppDbContext db) =>
        {
            if (usr.UserId is null) return Results.BadRequest("User not found in token");

            var bill = new Bill(Guid.CreateVersion7(), body.Name, body.Amount);
            bill.SetEmoji(body.Emoji);
            bill.SetNotes(body.Note);
            await db.Bills.AddAsync(bill);
            await db.SaveChangesAsync().ConfigureAwait(false);
            return Results.Created($"bills/{bill.Id}", bill.Id);
        }).RequireAuthorization();


        group.MapGet("", async (ICurrentUser usr, AppDbContext db) =>
        {
            var bills = await db.Bills.Where(i => i.UserId == usr.UserId).ToListAsync();
            return Results.Ok(bills);
        }).RequireAuthorization();

        group.MapGet("{billId:guid}", async (Guid billId, ICurrentUser usr, AppDbContext db) =>
        {
            var bill = await db.Bills.Where(i => i.Id == billId).Include(i => i.Payers).SingleAsync();
            if (bill is null) return Results.NotFound();
            if (bill.UserId != usr.UserId &&
                !(await db.BillsPayers.AnyAsync(i => i.UserId == usr.UserId && i.BillId == billId)))
            {
                db.BillsPayers.Add(new() { Id = Guid.CreateVersion7(), BillId = billId, UserId = usr.UserId });
                await db.SaveChangesAsync();
            }

            return Results.Ok(new
            {
                isOwner = bill.UserId == usr.UserId,
                bill,
            });
        }).RequireAuthorization();
    }
}