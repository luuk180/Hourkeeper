using Hourkeeper_API.Models;

namespace Hourkeeper_API.Services;

public class HoursService
{
    private readonly HoursContext _context;
    public HoursService(HoursContext context)
    {
        _context = context;
    }
    public double GetTotal(DateTime date, string uid)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserName == uid);
        if (user == null) return 0.0;
        return _context.DaysWorked
            .Where(d => d.Date == date && d.UserId == user.Id)
            .Sum(h => h.Hours);
    }

    public List<DayWorked> GetAllDays(string year, string month, string uid)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserName == uid);
        if (user == null) return [];
        return _context.DaysWorked
            .Where(d => d.Date.Year.ToString() == year && d.Date.Month.ToString() == month && d.UserId == user.Id)
            .ToList();
    }

    public bool AddDay(DateTime date, double hours, string username)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserName == username);
        if (user == null) return false;
        _context.DaysWorked.Add(new DayWorked()
        {
            Date = date,
            Hours = hours,
            UserId = user.Id
        });
        return _context.SaveChanges() > 0;
    }

    public bool EditDay(DateTime date, double hours, string username)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserName == username);
        if (user == null) return false;
        _context.DaysWorked.Update(new DayWorked()
        {
            Date = date,
            Hours = hours,
            UserId = user.Id
        });
        return _context.SaveChanges() > 0;
    }

    public bool RemoveDay(DateTime date, string username)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserName == username);
        if (user == null) return false;
        var dayWorked = _context.DaysWorked.FirstOrDefault(d => d.Date == date && d.UserId == user.Id);
        if (dayWorked == null) return false;
        _context.DaysWorked.Remove(dayWorked);
        return _context.SaveChanges() > 0;
    }
}