using Framework.Entity;
using Framework.Models;
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
        private readonly AppDbContext _context;
        public QuizController(AppDbContext context)
        {
            _context = context;
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
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == model.Id);
                if (user == null) { return BadRequest("Username already exists"); }

                user.Score = model.Score;

                await _context.SaveChangesAsync();

                return Ok(new { user });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            try
            {

                var users = await _context.Users.Where(x => x.Score > 0).OrderByDescending(x => x.Score)
                                                 .Take(10)
                                                 .Select(x => new UserModel
                                                 {
                                                     Id = x.Id,
                                                     Username = x.Username,
                                                     Score = x.Score
                                                 })
                                                 .ToListAsync();



                return Ok(new { users });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}