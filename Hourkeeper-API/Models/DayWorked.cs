namespace Hourkeeper_API.Models;

public class DayWorked
{
    public DateTime Date { get; set; }

    public double Hours { get; set; }
    public string UserId { get; set; }
}