using Hourkeeper_API.Models;
using Hourkeeper_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Hourkeeper_API.Controllers;

[ApiController]
[Route("[controller]")]
public class DayWorkedController(HoursContext context) : ControllerBase
{
    private readonly HoursService _hoursService = new(context);

    [Authorize]
    [HttpGet("{year:int}/{month:int}/{day:int}")]
    public ActionResult<double> GetTotal(int year, int month, int day)
    {
        var date = new DateTime(year, month, day);
        return Ok(_hoursService.GetTotal(date, User.Identity.Name));
    }

    [Authorize]
    [HttpGet("{year}/{month}")]
    public ActionResult<List<DayHours>> GetAllDays(string year, string month)
    {
        return Ok(_hoursService.GetAllDays(year, month, User.Identity.Name)
            .Select(h => new DayHours(){Date = h.Date, Hours = h.Hours}));
    }

    [Authorize]
    [HttpPost]
    public ActionResult AddDay([FromBody] DayHours day)
    {
        return _hoursService.AddDay(day.Date, day.Hours, User.Identity.Name) ? Ok() : BadRequest();
    }

    [Authorize]
    [HttpPut]
    public ActionResult UpdateDay([FromBody] DayHours day)
    {
        return _hoursService.EditDay(day.Date, day.Hours, User.Identity.Name) ? Ok() : BadRequest();
    }

    [Authorize]
    [HttpDelete("{year:int}/{month:int}/{day:int}")]
    public ActionResult DeleteDay([FromQuery] int year, int month, int day)
    {
        var date = new DateTime(year, month, day);
        return _hoursService.RemoveDay(date, User.Identity.Name) ? Ok() : BadRequest();
    }
}

public class DayHours
{
    public double Hours { get; set; }
    public DateTime Date { get; set; }
}