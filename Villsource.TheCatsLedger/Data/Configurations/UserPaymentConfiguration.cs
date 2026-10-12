using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Villsource.TheCatsLedger.Domain;

namespace Villsource.TheCatsLedger.Data.Configurations;

public class UserPaymentConfiguration : IEntityTypeConfiguration<UserPayment>
{
    public void Configure(EntityTypeBuilder<UserPayment> builder)
    {
        builder.ToTable("UserPayments");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedNever();

        builder.Property(x => x.Channel)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ChannelName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.AccountNo)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.ConfigureAuditable("Created");
    }
}