using Microsoft.EntityFrameworkCore;
using Villsource.TheCatsLedger.Data;
using Villsource.TheCatsLedger.Domain;
using Villsource.TheCatsLedger.Services;

namespace Villsource.TheCatsLedger.Feature.v1.Bills;

public static class Endpoints
{
    public record AddBillBody(string Name, decimal Amount, string? Emoji, string? Note);

    public record PayBillBody(string? SlipImage, string? Note);

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

        group.MapGet("", async (bool? billToPay, ICurrentUser usr, AppDbContext db) =>
        {
            var bills = billToPay.HasValue && billToPay.Value
                ? db.Bills.Where(i => i.Payers.Any(x => x.UserId == usr.UserId))
                : db.Bills.Where(i => i.UserId == usr.UserId);

            bills = bills.Include(i => i.Payers);

            return Results.Ok(await bills.ToListAsync());
        }).RequireAuthorization();

        group.MapGet("{billId:guid}", async (Guid billId, ICurrentUser usr, AppDbContext db) =>
        {
            var bill = await db.Bills.Where(i => i.Id == billId).Include(i => i.Payers).SingleOrDefaultAsync();
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

        // 1. Debtor marks bill as paid, uploads optional slip image, and sends LINE notify to owner
group.MapPost("{billId:guid}/pay", async (Guid billId, PayBillBody body, ICurrentUser usr, AppDbContext db,
    ILineMessagingService lineMessaging, ILiffLinkFactory liffLinkFactory) =>
{
    if (usr.UserId is null) return Results.BadRequest("User not found in token");

    var bill = await db.Bills.Where(i => i.Id == billId).Include(i => i.Payers).SingleOrDefaultAsync();
    if (bill is null) return Results.NotFound("Bill not found");

    var payer = bill.Payers.FirstOrDefault(i => i.UserId == usr.UserId);
    if (payer is null)
    {
        payer = new BillPayer
        {
            Id = Guid.CreateVersion7(),
            BillId = billId,
            UserId = usr.UserId,
            UserName = usr.Name ?? "Debtor",
            UserProfile = usr.PictureUrl ?? string.Empty
        };
        db.BillsPayers.Add(payer);
    }

    payer.IsPay = true;
    payer.IsConfirm = false;
    payer.SlipImageBase64 = body.SlipImage;
    payer.PayerNote = body.Note;
    payer.PaidAt = DateTimeOffset.UtcNow;

    await db.SaveChangesAsync();

    // Push notification to bill owner
    if (!string.IsNullOrWhiteSpace(bill.UserId))
    {
        var debtorName = usr.Name ?? "A friend";
        
        // จัดการกรณี Emoji หรือ Name เป็น null
        var billNameDisplay = string.IsNullOrWhiteSpace(bill.Name) ? "ไม่มีชื่อบิล" : bill.Name;
        var headerText = string.IsNullOrWhiteSpace(bill.Emoji) 
            ? billNameDisplay 
            : $"{bill.Emoji} {billNameDisplay}";

        // สร้าง List แบบ Dynamic เพื่อแก้ปัญหา Array ซ้อน Array
        var bodyContents = new List<object>
        {
            new
            {
                type = "text", text = $"{debtorName} marked this bill as paid.", size = "sm",
                weight = "bold", color = "#1e293b", wrap = true
            },
            new
            {
                type = "box",
                layout = "horizontal",
                margin = "md",
                contents = new object[]
                {
                    new { type = "text", text = "Amount", size = "sm", color = "#64748b", flex = 1 },
                    new
                    {
                        type = "text", text = $"฿{bill.Amount:N2}", size = "lg", weight = "bold",
                        color = "#10b981", align = "end"
                    }
                }
            }
        };

        // ถ้ามี Note ค่อย Add เพิ่มเข้าไปใน List (จะอยู่ในระดับเดียวกัน ไม่ซ้อน Array)
        if (!string.IsNullOrWhiteSpace(body.Note))
        {
            bodyContents.Add(new { type = "separator", margin = "sm" });
            bodyContents.Add(new
            {
                type = "text", text = $"Note: {body.Note}", size = "xs", color = "#64748b",
                margin = "sm", wrap = true
            });
        }

        var flex = new
        {
            type = "bubble",
            size = "kilo",
            header = new
            {
                type = "box",
                layout = "vertical",
                backgroundColor = "#10b981",
                paddingAll = "16px",
                contents = new object[]
                {
                    new
                    {
                        type = "text", text = "🔔 Payment Notice Received", color = "#FFFFFF", size = "xs",
                        weight = "bold"
                    },
                    new
                    {
                        type = "text", text = headerText, color = "#FFFFFF", size = "lg",
                        weight = "bold", margin = "sm", wrap = true
                    }
                }
            },
            body = new
            {
                type = "box",
                layout = "vertical",
                paddingAll = "16px",
                contents = bodyContents // นำ List ที่เตรียมไว้มาใส่ตรงนี้
            },
            footer = new
            {
                type = "box",
                layout = "vertical",
                contents = new object[]
                {
                    new
                    {
                        type = "button",
                        style = "primary",
                        color = "#10b981",
                        height = "sm",
                        action = new
                        {
                            type = "uri",
                            label = "Review & Confirm Payment",
                            uri = liffLinkFactory.GetBillDetailUrl(bill.Id)
                        }
                    }
                }
            }
        };

        await lineMessaging.PushFlexMessageAsync(bill.UserId,
            $"🔔 {debtorName} has paid for {billNameDisplay} (฿{bill.Amount:N2}). Please confirm.", flex);
    }

    return Results.Ok(new { message = "Payment submitted for confirmation" });
}).RequireAuthorization();

        // 2. Owner confirms payment -> marks confirmed, deletes slip image to save DB space, notifies debtor
        group.MapPost("{billId:guid}/payers/{payerId:guid}/confirm", async (Guid billId, Guid payerId, ICurrentUser usr,
            AppDbContext db, ILineMessagingService lineMessaging) =>
        {
            var bill = await db.Bills.Where(i => i.Id == billId).Include(i => i.Payers).SingleOrDefaultAsync();
            if (bill is null) return Results.NotFound("Bill not found");
            if (bill.UserId != usr.UserId) return Results.Forbid();

            var payer = bill.Payers.FirstOrDefault(i => i.Id == payerId);
            if (payer is null) return Results.NotFound("Payer record not found");

            payer.IsPay = true;
            payer.IsConfirm = true;
            payer.ConfirmedAt = DateTimeOffset.UtcNow;
            payer.SlipImageBase64 = null; // Clear slip to save database space

            await db.SaveChangesAsync();

            // Push notification to debtor
            if (!string.IsNullOrWhiteSpace(payer.UserId))
            {
                var altText = $"ยืนยันการชำระเงิน ฿{bill.Amount:N2} สำหรับบิล {bill.Name} แล้ว 🎉";
                var confirmerName = usr.Name ?? "เจ้าของบิล";
                var confirmedTime = payer.ConfirmedAt.Value.ToLocalTime().ToString("dd/MM/yyyy HH:mm");
                var flexContents = new
                {
                    type = "bubble",
                    size = "kilo",
                    body = new
                    {
                        type = "box",
                        layout = "vertical",
                        paddingAll = "20px",
                        contents = new object[]
                        {
                            // หัวข้อ
                            new
                            {
                                type = "text", text = "✅ ยืนยันการรับเงินแล้ว", weight = "bold", color = "#1DB446",
                                size = "md"
                            },
                            new { type = "separator", margin = "md" },

                            // รายละเอียดบิล
                            new
                            {
                                type = "text", text = bill.Name, weight = "bold", size = "xl", margin = "md",
                                wrap = true
                            },

                            // ข้อมูลยอดเงิน
                            new
                            {
                                type = "box", layout = "baseline", margin = "md",
                                contents = new object[]
                                {
                                    new { type = "text", text = "ยอดเงิน", color = "#aaaaaa", size = "sm", flex = 1 },
                                    new
                                    {
                                        type = "text", text = $"฿{bill.Amount:N2}", weight = "bold", color = "#333333",
                                        size = "sm", flex = 3, align = "end"
                                    }
                                }
                            },

                            // ข้อมูลผู้ยืนยัน
                            new
                            {
                                type = "box", layout = "baseline", margin = "sm",
                                contents = new object[]
                                {
                                    new { type = "text", text = "ผู้ยืนยัน", color = "#aaaaaa", size = "sm", flex = 1 },
                                    new
                                    {
                                        type = "text", text = confirmerName, color = "#666666", size = "sm", flex = 3,
                                        align = "end", wrap = true
                                    }
                                }
                            },

                            // เวลา
                            new
                            {
                                type = "box", layout = "baseline", margin = "sm",
                                contents = new object[]
                                {
                                    new { type = "text", text = "เวลา", color = "#aaaaaa", size = "sm", flex = 1 },
                                    new
                                    {
                                        type = "text", text = confirmedTime, color = "#666666", size = "sm", flex = 3,
                                        align = "end"
                                    }
                                }
                            }
                        }
                    }
                };

                await lineMessaging.PushFlexMessageAsync(payer.UserId, altText, flexContents);
            }

            return Results.Ok(new { message = "Payment confirmed successfully" });
        }).RequireAuthorization();

        // 3. Owner rejects fake payment -> resets payment status, clears slip, notifies debtor
        group.MapPost("{billId:guid}/payers/{payerId:guid}/reject", async (Guid billId, Guid payerId, ICurrentUser usr,
            AppDbContext db, ILineMessagingService lineMessaging) =>
        {
            var bill = await db.Bills.Where(i => i.Id == billId).Include(i => i.Payers).SingleOrDefaultAsync();
            if (bill is null) return Results.NotFound("Bill not found");
            if (bill.UserId != usr.UserId) return Results.Forbid();

            var payer = bill.Payers.FirstOrDefault(i => i.Id == payerId);
            if (payer is null) return Results.NotFound("Payer record not found");

            payer.IsPay = false;
            payer.IsConfirm = false;
            payer.SlipImageBase64 = null;
            payer.PayerNote = null;
            payer.PaidAt = null;

            await db.SaveChangesAsync();

            // Push notification to debtor
            if (!string.IsNullOrWhiteSpace(payer.UserId))
            {
                var altText = $"⚠️ ถูกปฏิเสธการชำระเงินสำหรับบิล {bill.Name}";
                var rejecterName = usr.Name ?? "เจ้าของบิล";
                var rejectedTime = DateTimeOffset.UtcNow.ToLocalTime().ToString("dd/MM/yyyy HH:mm");

                var flexContents = new
                {
                    type = "bubble",
                    size = "kilo",
                    body = new
                    {
                        type = "box",
                        layout = "vertical",
                        paddingAll = "20px",
                        contents = new object[]
                        {
                            // หัวข้อ (สีแดงเพื่อสื่อถึงการแจ้งเตือน/ปฏิเสธ)
                            new
                            {
                                type = "text", text = "⚠️ ถูกปฏิเสธการชำระเงิน", weight = "bold", color = "#EF454D",
                                size = "md"
                            },
                            new { type = "separator", margin = "md" },

                            // ชื่อบิล
                            new
                            {
                                type = "text", text = bill.Name, weight = "bold", size = "xl", margin = "md",
                                wrap = true
                            },

                            // ข้อมูลผู้ปฏิเสธ
                            new
                            {
                                type = "box", layout = "baseline", margin = "md",
                                contents = new object[]
                                {
                                    new { type = "text", text = "ผู้ปฏิเสธ", color = "#aaaaaa", size = "sm", flex = 1 },
                                    new
                                    {
                                        type = "text", text = rejecterName, color = "#666666", size = "sm", flex = 3,
                                        align = "end", wrap = true
                                    }
                                }
                            },

                            // เวลาที่ทำการปฏิเสธ
                            new
                            {
                                type = "box", layout = "baseline", margin = "sm",
                                contents = new object[]
                                {
                                    new { type = "text", text = "เวลา", color = "#aaaaaa", size = "sm", flex = 1 },
                                    new
                                    {
                                        type = "text", text = rejectedTime, color = "#666666", size = "sm", flex = 3,
                                        align = "end"
                                    }
                                }
                            },

                            new { type = "separator", margin = "md" },

                            // คำแนะนำให้ส่งใหม่
                            new
                            {
                                type = "text",
                                text = "กรุณาตรวจสอบการชำระเงิน/สลิปของคุณ และทำการแจ้งชำระเงินเข้ามาใหม่อีกครั้ง",
                                color = "#EF454D",
                                size = "xs",
                                margin = "md",
                                wrap = true
                            }
                        }
                    }
                };

                await lineMessaging.PushFlexMessageAsync(payer.UserId, altText, flexContents);
            }

            return Results.Ok(new { message = "Payment rejected and reset" });
        }).RequireAuthorization();
    }
}