using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Hourkeeper_API.Models;

public class HoursContext: IdentityDbContext<IdentityUser>
{
    public HoursContext(DbContextOptions<HoursContext> options): base(options) {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<DayWorked> DaysWorked { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DayWorked>()
            .HasOne<IdentityUser>()
            .WithMany()
            .HasForeignKey(h => h.UserId);
        modelBuilder.Entity<DayWorked>()
            .HasKey(h => new { h.UserId, h.Date });
        base.OnModelCreating(modelBuilder);
    }
}