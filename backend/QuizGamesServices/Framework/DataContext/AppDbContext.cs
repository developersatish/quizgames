﻿using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Framework.Entity;
namespace Framework.DataContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserQuestionAnswer> UserQuestionAnswers { get; set; }
    }
}
