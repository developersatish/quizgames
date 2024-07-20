using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Framework.Models
{
    public class QuestionModel
    {
        [JsonPropertyName("QID")]
        public string QID { get; set; }

        [JsonPropertyName("Question")]
        public string QuestionText { get; set; }

        [JsonPropertyName("Answer")]
        public string Answer { get; set; }

        [JsonPropertyName("A")]
        public string A { get; set; }

        [JsonPropertyName("B")]
        public string B { get; set; }

        [JsonPropertyName("C")]
        public string C { get; set; }

        [JsonPropertyName("D")]
        public string D { get; set; }
    }
}
