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
using Framework.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Framework.Services.Questions
{
    public class QuestionsService : IQuestionsService
    {
        private readonly AppDbContext _context;
        public QuestionsService(AppDbContext context)
        {
            _context = context;
        }

        public List<QuestionModel> GetAll()
        {
            List<QuestionModel> questions = new List<QuestionModel>();
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

        public async Task<LeaderboardModel> GetLeaderbords(int userid)
        {
            LeaderboardModel leaderboard = new LeaderboardModel();

            var users = await _context.Users.Where(x => x.Score > 0).OrderByDescending(x => x.Score).ToListAsync();


            leaderboard.TopUsers = users.Take(3)
                                                .Select(x => new UserModel
                                                {
                                                    Id = x.Id,
                                                    Username = x.Username,
                                                    Score = x.Score
                                                })
                                                .ToList(); ;
            leaderboard.YourRank = users.FindIndex(x => x.Id == userid) + 1;

            return leaderboard;
        }

        public async Task<List<QuestionModel>> GetUserSummery(int id)
        {
            List<QuestionModel> questions = new List<QuestionModel>();

            var user = await _context.Users.FirstOrDefaultAsync(t => t.Id == id);
            if (user == null)
                throw new Exception("User not found");

            var userAnswers = await _context.UserQuestionAnswers.Where(t => t.UserId == user.Id).ToListAsync();

            if (userAnswers.Any())
            {
                var questionsList = this.GetAll();

                foreach (var question in questionsList)
                {
                    var userSelection = userAnswers.FirstOrDefault(t => t.Qid == question.QID);
                    questions.Add(new QuestionModel()
                    {
                        QID = question.QID,
                        A = question.A,
                        Answer = userSelection.SelectedQid,
                        B = question.B,
                        C = question.C,
                        D = question.D,
                        IsCorrect = userSelection.IsCorrect,
                        QuestionText = question.QuestionText

                    });

                }
            }

            return questions;
        }

        public async Task<bool> SubmitQuestion(QuizSubmitModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(t => t.Id == model.Id);
            if (user == null)
                throw new Exception("User not found");


            var existingAnsers = await _context.UserQuestionAnswers.Where(u => u.Id == model.Id).ToListAsync();
            if (existingAnsers != null)
            {
                _context.UserQuestionAnswers.RemoveRange(existingAnsers);
            }

            foreach (var item in model.SelectedAsnsers)
            {
                var answer = new UserQuestionAnswer()
                {
                    UserId = model.Id,
                    IsCorrect = item.IsCorrect,
                    Qid = item.QID,
                    SelectedQid = item.SelectedQid
                };
                _context.UserQuestionAnswers.Add(answer);
            }

            int currectAnswers = model.SelectedAsnsers.Count(v => v.IsCorrect == true);
            user.Score = (uint)currectAnswers;

            await _context.SaveChangesAsync();

            return true;
        }


    }
}
