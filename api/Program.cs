using Microsoft.AspNetCore.Authentication.Negotiate;
using api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme).AddNegotiate();
builder.Services.AddAuthorization();
builder.Services.AddCors();

var corsAllowedOrigins = builder.Configuration["Configuration:CorsAllowedOrigins"];
var app = builder.Build();

app.UseCors(builder =>
{
  builder
    .WithOrigins(corsAllowedOrigins)
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials();
});
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
