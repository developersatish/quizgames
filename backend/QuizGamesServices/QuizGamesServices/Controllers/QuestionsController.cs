using Framework.Models;
using Framework.Services;
using Framework.Services.Questions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuizGamesServices.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionsService _service;
        public QuestionsController(IQuestionsService service)
        {
            _service = service;
        }
        // GET: api/<QuestionsController>
        [HttpGet]
        public List<QuestionModel> Get()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // GET api/<QuestionsController>/5
        [HttpGet("{id}")]
        public async Task<List<QuestionModel>> Get(int id)
        {
            try
            {
                return await _service.GetUserSummery(id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //// POST api/<QuestionsController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<QuestionsController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<QuestionsController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
