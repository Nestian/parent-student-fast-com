using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Users
    {
        [Key]
        public string UserId { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
    }
}
