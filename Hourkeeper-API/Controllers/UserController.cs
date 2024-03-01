using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hourkeeper_API.Controllers;

[ApiController]
[Route("")]
public class UserController
{
    [Authorize]
    [HttpPost("/logout")]
    public async Task<IResult> Logout(SignInManager<IdentityUser> signInManager, [FromBody] object? empty)
    {
        if (empty == null) return Results.Unauthorized();
        await signInManager.SignOutAsync();
        return Results.Ok();
    }
}