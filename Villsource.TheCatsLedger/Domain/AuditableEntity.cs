using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Villsource.TheCatsLedger.Domain;

public abstract class AuditableEntity
{
    public DateTimeOffset Timestamp { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string UserProfile { get; set; }
}

public static class AuditableEntityExtensions
{
    public static void ConfigureAuditable<T>(this EntityTypeBuilder<T> builder, string prefix)
        where T : AuditableEntity
    {
        builder.Property(x => x.Timestamp)
            .HasColumnName(prefix + "Timestamp")
            .IsRequired();

        builder.Property(x => x.UserId)
            .HasMaxLength(34)
            .HasColumnName(prefix + "UserId")
            .IsRequired();

        builder.Property(x => x.UserName)
            .HasMaxLength(200)
            .HasColumnName(prefix + "UserName")
            .IsRequired();

        builder.Property(x => x.UserProfile)
            .HasColumnName(prefix + "UserProfile")
            .HasMaxLength(300);
    }
}