using Framework.Entity;
using Framework.Models;
using Framework.Services.Questions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using QuizGamesServices.Data;
using System.Runtime.CompilerServices;

namespace QuizGamesServices.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {

        private readonly IQuestionsService _service;
        public QuizController(IQuestionsService service)
        {
            _service = service;
        }
        // POST api/<QuestionsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] QuizSubmitModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = await _service.SubmitQuestion(model);

                return Ok(new { user });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {

               var users= await _service.GetLeaderbords(id);
                return Ok(new { users });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}