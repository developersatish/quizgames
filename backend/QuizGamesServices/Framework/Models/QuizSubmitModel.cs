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
        public List<SelectedAnswer> SelectedAsnsers { get; set; }
    }

    public class SelectedAnswer
    {
        public string QID { get; set; }
        public string SelectedQid { get; set; }
        public bool IsCorrect { get; set; }
    }
}
