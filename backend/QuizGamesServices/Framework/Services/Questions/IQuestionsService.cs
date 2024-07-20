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
    }
}
