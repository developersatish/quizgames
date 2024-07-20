using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Models
{
    public class QuizSubmitModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public uint Score { get; set; }
    }
}
