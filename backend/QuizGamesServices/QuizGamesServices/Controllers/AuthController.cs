using Framework.Entity;
using Framework.Models;
using Framework.Services;
using Ganss.Xss;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizGamesServices.Data;
using System.Security.Cryptography;
using System.Text;

namespace QuizGamesServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAuthService _authService;

        public AuthController(AppDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest("Username already exists");


            var (passwordHash, key) = HashPassword(user.Password);

            var userEntity = new User()
            {
                PasswordHash = passwordHash,
                Key = key,
                Phone = user.Phone,
                Username = user.Username,
            };
            _context.Users.Add(userEntity);
            await _context.SaveChangesAsync();

            var token = _authService.GenerateToken(userEntity);
            return Ok(new { token, userEntity.Id });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);

            if (user == null || !VerifyPassword(login.Password, user.PasswordHash, user.Key))
                return Unauthorized("Invalid credentials");

            var token = _authService.GenerateToken(user);
            return Ok(new { token, user.Id });
        }

        private static (string PasswordHash, string Key) HashPassword(string password)
        {
            using (var hmac = new HMACSHA512())
            {
                var key = hmac.Key;
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return (Convert.ToBase64String(computedHash), Convert.ToBase64String(key));
            }
        }

        private static bool VerifyPassword(string enteredPassword, string storedHash, string storedKey)
        {
            var key = Convert.FromBase64String(storedKey);
            using (var hmac = new HMACSHA512(key))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(enteredPassword));
                return Convert.ToBase64String(computedHash) == storedHash;
            }
        }
    }
}
