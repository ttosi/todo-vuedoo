using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Models;

namespace api.Controllers
{
  [ApiController]
  // [Authorize(Roles = "RWRD_test_treatmentjoc_admins")]
  [Authorize(Roles = "ITD_all")]
  [Route("api/[controller]")]
  public class UserController : ControllerBase
  {
    [HttpGet]
    public ActionResult<User> GetUser()
    {
      var user = new User()
      {
        Username = HttpContext.User.Identity.Name,
        IsAuthenticated = HttpContext.User.Identity.IsAuthenticated,
        IsAdmin = HttpContext.User.IsInRole("ITD_all")
        // IsAdmin = false
      };

      return user;
    }
  }
}