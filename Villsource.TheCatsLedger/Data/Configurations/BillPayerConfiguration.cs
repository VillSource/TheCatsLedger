using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Villsource.TheCatsLedger.Domain;

namespace Villsource.TheCatsLedger.Data.Configurations;

public class BillPayerConfiguration : IEntityTypeConfiguration<BillPayer>
{
    public void Configure(EntityTypeBuilder<BillPayer> builder)
    {
        builder.ToTable("BillPayers");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        
        builder.ConfigureAuditable("Debtor");
    }
}