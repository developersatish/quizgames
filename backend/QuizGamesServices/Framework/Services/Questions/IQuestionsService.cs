using Framework.Entity;
using Framework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Services.Questions
{
    public interface IQuestionsService
    {
        List<QuestionModel> GetAll();
        Task<LeaderboardModel> GetLeaderbords(int userid);

        Task<bool> SubmitQuestion(QuizSubmitModel model);

        Task<List<QuestionModel>> GetUserSummery(int id);
    }
}
