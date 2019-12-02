using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class UserMessages
    {
        [Key]
        public string UserId { get; set; }
        public string Message { get; set; }
        public bool Active { get; set; }
    }
}
