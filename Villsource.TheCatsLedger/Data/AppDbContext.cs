using Microsoft.EntityFrameworkCore;
using Villsource.TheCatsLedger.Domain;
using Villsource.TheCatsLedger.Services;

namespace Villsource.TheCatsLedger.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options, ICurrentUser currentUser) : DbContext(options)
{
    public DbSet<Bill> Bills => Set<Bill>(); 
    public DbSet<BillPayer> BillsPayers => Set<BillPayer>(); 
    public DbSet<UserPayment> UserPayments => Set<UserPayment>(); 
    
    public override int SaveChanges()
    {
        ApplyAuditInfo();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ApplyAuditInfo();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void ApplyAuditInfo()
    {
        var entries = ChangeTracker.Entries<AuditableEntity>();

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.Timestamp = DateTimeOffset.UtcNow;
                entry.Entity.UserId = currentUser.UserId ?? string.Empty;
                entry.Entity.UserName = currentUser.Name ?? string.Empty;
                entry.Entity.UserProfile = currentUser.PictureUrl ?? string.Empty;
            }
            else if (entry.State == EntityState.Modified)
            {
            }
        }
    }

}