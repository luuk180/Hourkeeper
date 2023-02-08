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
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("secrets.json")
            .AddEnvironmentVariables()
            .Build();
        optionsBuilder.UseNpgsql(configuration.GetConnectionString("Default"));
    }
}