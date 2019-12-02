using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace API.Models
{
    public class BackendContext : DbContext
    {
        public DbSet<Users> Users { get; set; }
        public DbSet<UserMessages> UserMessages { get; set; }
        public BackendContext() { }

        public BackendContext(DbContextOptions<BackendContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Users>().HasKey(table => new {
                table.UserId,
                table.Email,
                table.Password,
                table.Active
            });

            builder.Entity<UserMessages>().HasKey(table => new {
                table.UserId,
                table.Message,
                table.Active
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json")
               .Build();
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseNpgsql(connectionString);
            }
        }
    }
}
