using Microsoft.EntityFrameworkCore;
using Villsource.TheCatsLedger.Data;

namespace Villsource.TheCatsLedger.Services;

public class BillSummaryJob
{
    private readonly AppDbContext _db;
    private readonly ILineMessagingService _lineMessaging;
    private readonly ILogger<BillSummaryJob> _logger;

    public BillSummaryJob(AppDbContext db, ILineMessagingService lineMessaging, ILogger<BillSummaryJob> logger)
    {
        _db = db;
        _lineMessaging = lineMessaging;
        _logger = logger;
    }

    /// <summary>
    /// 08:00 daily reminder for debtors about bills waiting to be paid.
    /// </summary>
    public async Task SendMorningDebtorSummaryAsync()
    {
        _logger.LogInformation("Starting SendMorningDebtorSummaryAsync at {Time}", DateTimeOffset.UtcNow);

        // Find all debtors who have unpaid or unconfirmed bills
        var pendingPayers = await _db.BillsPayers
            .Where(p => !p.IsConfirm)
            .Join(_db.Bills, p => p.BillId, b => b.Id, (p, b) => new
            {
                PayerUserId = p.UserId,
                PayerName = p.UserName,
                BillId = b.Id,
                BillName = b.Name,
                BillEmoji = b.Emoji,
                b.Amount,
                p.IsPay
            })
            .ToListAsync();

        var debtors = pendingPayers
            .GroupBy(x => x.PayerUserId)
            .Where(g => !string.IsNullOrWhiteSpace(g.Key));

        foreach (var group in debtors)
        {
            var debtorUserId = group.Key;
            var billCount = group.Count();
            var totalAmount = group.Sum(x => x.Amount);

            var flex = new
            {
                type = "bubble",
                size = "kilo",
                header = new
                {
                    type = "box",
                    layout = "vertical",
                    backgroundColor = "#0284c7",
                    paddingAll = "16px",
                    contents = new object[]
                    {
                        new
                        {
                            type = "text",
                            text = "☀️ Morning Bill Reminder",
                            color = "#FFFFFF",
                            size = "xs",
                            weight = "bold"
                        },
                        new
                        {
                            type = "text",
                            text = $"You have {billCount} pending bill{(billCount > 1 ? "s" : "")}",
                            color = "#FFFFFF",
                            size = "lg",
                            weight = "bold",
                            margin = "sm"
                        }
                    }
                },
                body = new
                {
                    type = "box",
                    layout = "vertical",
                    paddingAll = "16px",
                    contents = new object[]
                    {
                        new
                        {
                            type = "box",
                            layout = "horizontal",
                            contents = new object[]
                            {
                                new { type = "text", text = "Total to Pay", size = "sm", color = "#64748b", flex = 1 },
                                new { type = "text", text = $"฿{totalAmount:N2}", size = "xl", weight = "bold", color = "#0284c7", align = "end" }
                            }
                        },
                        new { type = "separator", margin = "md" },
                        new { type = "text", text = "Open TheCat's Ledger to view your bills and transfer to owners.", size = "xs", color = "#94a3b8", margin = "md", wrap = true }
                    }
                }
            };

            await _lineMessaging.PushFlexMessageAsync(debtorUserId, $"☀️ Morning Reminder: You have {billCount} bill(s) to pay (฿{totalAmount:N2})", flex);
        }
    }

    /// <summary>
    /// 20:00 daily summary for bill owners on outstanding uncollected bills.
    /// </summary>
    public async Task SendEveningOwnerSummaryAsync()
    {
        _logger.LogInformation("Starting SendEveningOwnerSummaryAsync at {Time}", DateTimeOffset.UtcNow);

        // Find all bills where any payer is not confirmed yet
        var outstandingBills = await _db.Bills
            .Include(b => b.Payers)
            .Where(b => b.Payers.Any(p => !p.IsConfirm))
            .ToListAsync();

        var owners = outstandingBills
            .GroupBy(b => b.UserId)
            .Where(g => !string.IsNullOrWhiteSpace(g.Key));

        foreach (var group in owners)
        {
            var ownerUserId = group.Key;
            var billsList = group.ToList();
            var billCount = billsList.Count;
            var uncollectedTotal = billsList.Sum(b => b.Amount);

            var flex = new
            {
                type = "bubble",
                size = "kilo",
                header = new
                {
                    type = "box",
                    layout = "vertical",
                    backgroundColor = "#059669",
                    paddingAll = "16px",
                    contents = new object[]
                    {
                        new
                        {
                            type = "text",
                            text = "🌙 Daily Ledger Summary",
                            color = "#FFFFFF",
                            size = "xs",
                            weight = "bold"
                        },
                        new
                        {
                            type = "text",
                            text = $"{billCount} Outstanding Bill{(billCount > 1 ? "s" : "")}",
                            color = "#FFFFFF",
                            size = "lg",
                            weight = "bold",
                            margin = "sm"
                        }
                    }
                },
                body = new
                {
                    type = "box",
                    layout = "vertical",
                    paddingAll = "16px",
                    contents = new object[]
                    {
                        new
                        {
                            type = "box",
                            layout = "horizontal",
                            contents = new object[]
                            {
                                new { type = "text", text = "Uncollected Total", size = "sm", color = "#64748b", flex = 1 },
                                new { type = "text", text = $"฿{uncollectedTotal:N2}", size = "xl", weight = "bold", color = "#059669", align = "end" }
                            }
                        },
                        new { type = "separator", margin = "md" },
                        new { type = "text", text = "Check pending transfers or confirm debtor payments in the app.", size = "xs", color = "#94a3b8", margin = "md", wrap = true }
                    }
                }
            };

            await _lineMessaging.PushFlexMessageAsync(ownerUserId, $"🌙 Daily Summary: {billCount} outstanding bill(s) total ฿{uncollectedTotal:N2}", flex);
        }
    }
}
