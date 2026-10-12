using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Villsource.TheCatsLedger.Domain;

namespace Villsource.TheCatsLedger.Data.Configurations;

public class BillConfiguration : IEntityTypeConfiguration<Bill>
{
    public void Configure(EntityTypeBuilder<Bill> builder)
    {
        builder.ToTable("Bills");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.Emoji).HasMaxLength(50);
        builder.Property(x => x.Amount).IsRequired();
        builder.Property(x => x.Notes).HasMaxLength(500);
        
        builder.ConfigureAuditable("Created");
    }
}