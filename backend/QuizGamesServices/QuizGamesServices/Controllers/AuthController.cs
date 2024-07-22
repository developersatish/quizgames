using Framework.Entity;
using Framework.Models;
using Framework.Services.Auth;
using Framework.Utilities;
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

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {

            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<UserResponse> SignUp([FromBody] SignUpModel user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Invalid data");
                }

                var userEntity = await _authService.SignUp(user);
                var token =  _authService.GenerateToken(userEntity);
                return new UserResponse()
                {
                    Id = userEntity.Id,
                    Token = token,
                };
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }

        }

        [HttpPost("login")]
        public async Task<UserResponse> Login([FromBody] LoginModel login)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Invalid data");
                }
                var user = await _authService.Login(login);

                var token = _authService.GenerateToken(user);
                return new UserResponse()
                {
                    Id = user.Id,
                    Token = token,
                };
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }

        }
    }
}
