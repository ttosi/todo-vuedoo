namespace api.Models;

public class User
{
  public string Username { get; set; }

  public bool IsAuthenticated { get; set; }

  public bool IsAdmin { set; get; }
}