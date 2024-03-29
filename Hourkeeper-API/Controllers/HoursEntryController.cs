using System.Globalization;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Hourkeeper_API.Models;
using Microsoft.AspNetCore.Authorization;

namespace Hourkeeper_API.Controllers;

[ApiController]
[Route("[Controller]")]
public class HoursEntryController : ControllerBase
{
    [Authorize]
    [HttpGet("monthTotal/{year:int}/{month:int}")]
    public ActionResult<JsonContent> Total(int year, int month)
    {
        var id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (id == null)
        {
            return new ActionResult<JsonContent>(NoContent());
        }

        var monthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month);
        var db = new HoursContext();
        var userId = id.Value;
        
        var totalHours = db.HoursEntries.Where(h => h.UserUuid == userId)
            .Where(h => h.Date.Month == month).Where(h => h.Date.Year == year)
            .OrderBy(h => h.Date).Sum(h => h.Hours);
        
        var monthTotal = new MonthTotal
        {
            MonthName = monthName,
            MonthHours = totalHours
        };
        
        return new ActionResult<JsonContent>(totalHours > 0 ? new JsonResult(monthTotal) : NoContent());
}

    [Authorize]
    [HttpGet("allEntries/{year:int}/{month:int}")]
    public ActionResult<JsonContent> Get(int year, int month)
    {
        var id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (id == null)
        {
            return new ActionResult<JsonContent>(NoContent());
        }

        var userId = id.Value;

        var context = new HoursContext();
        var entries = context.HoursEntries.Where(h => h.UserUuid == userId)
            .Where(h => h.Date.Month == month).Where(h => h.Date.Year == year)
            .OrderBy(h => h.Date).Select(h => new {h.Date, h.Hours});

        return !entries.Any() ? new ActionResult<JsonContent>(NoContent()) : new ActionResult<JsonContent>(new JsonResult(entries));
    }

    [Authorize]
    [HttpPost("addEntry")]
    public ActionResult Post()
    {
        try
        {
            using var stream = new StreamReader(HttpContext.Request.Body);
            var json = JsonSerializer.Deserialize<ReturnHours>(stream.ReadToEnd());

            var id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (id == null || json == null)
            {
                return BadRequest();
            }

            var userId = id.Value;

            var hours = new HoursEntry
            {
                Date = json.Date,
                Hours = json.Hours,
                UserUuid = userId
            };
            var context = new HoursContext();
            context.Add(hours);
            return context.SaveChanges() > 0 ? Ok() : BadRequest();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest();
        }
    }
}