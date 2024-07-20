using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Models
{
    public class SignUpModel
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; }


        [Required]
        [Phone]
        public string Phone { get; set; }


        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }
    }
}
