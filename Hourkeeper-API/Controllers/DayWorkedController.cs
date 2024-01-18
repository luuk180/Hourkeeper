using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Hourkeeper_API.Controllers;

[ApiController]
[Route("[Controller]/daysworked")]
public class DayWorkedController : ControllerBase
{
    [Authorize]
    [HttpGet("{year:int}/{month:int}/{day:int}")]
    public ActionResult GetTotal(int year, int month, int day, ClaimsPrincipal user)
    {
        return new OkResult();
    }
}