using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Entity
{
    public class UserQuestionAnswer
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Qid { get; set; }

        [Required]
        public string SelectedQid { get; set; }

        [Required]
        public bool IsCorrect { get; set; }

        public DateTime Date { get; set; }= DateTime.UtcNow;
    }
}
