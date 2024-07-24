using Framework.DataContext;
using Framework.Entity;
using Framework.Models;
using Framework.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<User> Login(LoginModel login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
            if (user == null) {
                throw new Exception("User not found!");
            }

            if (user == null || !Password.VerifyPassword(login.Password, user.PasswordHash, user.Key))
                throw new Exception("Invalid credentials");


            return user;

        }

        public async Task<User> SignUp(SignUpModel user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                throw new Exception("Username already exists");


            var (passwordHash, key) = Password.HashPassword(user.Password);

            var userEntity = new User()
            {
                PasswordHash = passwordHash,
                Key = key,
                Phone = user.Phone,
                Username = user.Username,
            };
            _context.Users.Add(userEntity);
            await _context.SaveChangesAsync();
            return userEntity;
        }
    }
}
