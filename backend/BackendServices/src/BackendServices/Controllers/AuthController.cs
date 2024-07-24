using Framework.Models;
using Framework.Services.Auth;
using Framework.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace BackendServices.Controllers
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
        public async Task<ApiResponse<UserResponse>> SignUp([FromBody] SignUpModel user)
        {
            ApiResponse<UserResponse> response = new ApiResponse<UserResponse>();
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Invalid data");
                }

                var userEntity = await _authService.SignUp(user);
                var token = _authService.GenerateToken(userEntity);
                response.Data =
                new UserResponse()
                {
                    Id = userEntity.Id,
                    Token = token,
                };
            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = ex.Message;
            }
            return response;

        }

        [HttpPost("login")]
        public async Task<ApiResponse<UserResponse>> Login([FromBody] LoginModel login)
        {
            ApiResponse<UserResponse> response = new ApiResponse<UserResponse>();
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new Exception("Invalid data");
                }
                var user = await _authService.Login(login);

                var token = _authService.GenerateToken(user);
                response.Data =
                 new UserResponse()
                 {
                     Id = user.Id,
                     Token = token,
                 };
            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = ex.Message;
            }
            return response;

        }


        // GET api/values/5
        [HttpGet("{name}")]
        public string Get(string name)
        {
            return name;
        }
    }
}
