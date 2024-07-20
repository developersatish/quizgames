using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public uint Score { get; set; } = 0;
    }
}
