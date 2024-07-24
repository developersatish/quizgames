using Framework.Entity;
using Framework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Services.Auth
{
    public interface IAuthService
    {
        string GenerateToken(User user);
        Task<User> SignUp(SignUpModel user);
        Task<User> Login(LoginModel login);
    }
}
