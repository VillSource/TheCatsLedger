using Microsoft.EntityFrameworkCore;
using Villsource.TheCatsLedger.Data;
using Villsource.TheCatsLedger.Domain;
using Villsource.TheCatsLedger.Services;

namespace Villsource.TheCatsLedger.Feature.v1.Payments;

public static class Endpoint
{
    
    
    public class AddUserPaymentBody
    {
        public string Channel { get; set; }
        public string ChannelName { get; set; }   
        public string AccountNo { get; set; }
        public string Name { get; set; }    
    }

    public static void MapPayment(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("payments");

        group.MapGet("{userId}", async (string userId, AppDbContext db) =>
        {
            var userPayment = await db.UserPayments.SingleOrDefaultAsync(i => i.UserId == userId);
            if (userPayment == null)
                return  Results.NotFound();
            
            return Results.Ok(userPayment);
        }).RequireAuthorization();
            
        group.MapPost("", async (AddUserPaymentBody body, ICurrentUser usr, AppDbContext db) =>
        {
            var userPayment = await db.UserPayments.Where(i => i.UserId == usr.UserId)
                .SingleOrDefaultAsync();

            if (userPayment == null)
            {
                userPayment = new UserPayment()
                {
                    Id = Guid.CreateVersion7(),
                    Channel = body.Channel,
                    ChannelName = body.ChannelName,
                    AccountNo = body.AccountNo,
                    Name = body.Name,
                };
                db.UserPayments.Add(userPayment);
            }
            else
            {
                userPayment.Channel =  body.Channel;
                userPayment.ChannelName = body.ChannelName;
                userPayment.AccountNo = body.AccountNo;
                userPayment.Name = body.Name;
            }
            
            await db.SaveChangesAsync();
            
            return Results.Created($"/payments/{usr}", usr.UserId);
            
        }).RequireAuthorization();
    }
}