using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Utilities
{
    public static class Password
    {
        public static (string PasswordHash, string Key) HashPassword(string password)
        {
            using (var hmac = new HMACSHA512())
            {
                var key = hmac.Key;
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return (Convert.ToBase64String(computedHash), Convert.ToBase64String(key));
            }
        }

        public static bool VerifyPassword(string enteredPassword, string storedHash, string storedKey)
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
