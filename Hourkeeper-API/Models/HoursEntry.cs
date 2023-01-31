namespace Hourkeeper_API.Models;

public class HoursEntry
{
    public DateTime Date { get; set; }

    public double Hours { get; set; }

    public string? UserUuid { get; set; }
}