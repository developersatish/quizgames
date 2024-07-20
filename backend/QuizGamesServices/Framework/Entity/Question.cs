using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Entity
{
    public class Question
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public List<Option> Options { get; set; }
    }

    public class Option
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}
