using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Hourkeeper_API.Models;

namespace Hourkeeper_API.Controllers;

[ApiController]
[Route("[Controller]")]
public class HoursEntryController : ControllerBase
{
    [HttpGet("allEntries/{year:int}/{month:int}")]
    public ActionResult<JsonContent> Get(int year, int month)
    {
        var context = new HoursContext();
        var entries = context.HoursEntries.Where(h => h.UserUuid == "herro")
            .Where(h => h.Date.Month == month).Where(h => h.Date.Year == year);
        return new ActionResult<JsonContent>(new JsonResult(entries));
    }

    [HttpPost("addEntry")]
    public ActionResult<JsonContent> Put()
    {
        try
        {
            using var stream = new StreamReader(HttpContext.Request.Body);
            var json = JsonSerializer.Deserialize<HoursEntry>(stream.ReadToEnd());
            if (json == null)
            {
                return new ActionResult<JsonContent>(NoContent());
            }
            var hours = new HoursEntry
            {
                Date = json.Date,
                Hours = json.Hours,
                UserUuid = json.UserUuid
            };
            var context = new HoursContext();
            context.Add(hours);
            context.SaveChanges();
            return new ActionResult<JsonContent>(new JsonResult(hours));
        }
        catch (JsonException e)
        {
            Console.WriteLine(e);
            return BadRequest();
        }
    }
}