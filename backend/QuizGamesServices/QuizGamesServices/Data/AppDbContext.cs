using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Framework.Models;
namespace QuizGamesServices.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Question> Questions { get; set; }
    }
}
