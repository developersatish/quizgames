using Framework.Entity;
using Framework.Models;
using Framework.Services.Questions;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
namespace Framework.Services.Questions
{
    public class QuestionsService : IQuestionsService
    {
        public List<QuestionModel> GetAll()
        {
            List<QuestionModel> questions=new List<QuestionModel>();
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "qbankdata.json");
            var json = File.ReadAllText(filePath);
            if (json != null)
            {
                questions = JsonSerializer.Deserialize<List<QuestionModel>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
            return questions;
            
        }
    }
}
