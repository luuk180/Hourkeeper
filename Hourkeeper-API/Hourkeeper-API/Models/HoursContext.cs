using Microsoft.EntityFrameworkCore;

namespace Hourkeeper_API.Models;

public class HoursContext: DbContext
{
    static HoursContext() {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<HoursEntry> HoursEntries { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HoursEntry>().HasKey(entry => new { entry.Date, entry.UserUuid });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(
            "Host=lost-sable-1588.7tc.cockroachlabs.cloud;" +
            "Port=26257;" +
            "Database=hourkeeper;" +
            "Username=hourkeeper;" +
            "password=5M9u2YNc6n4UhkAfvHQudw");
    }
}