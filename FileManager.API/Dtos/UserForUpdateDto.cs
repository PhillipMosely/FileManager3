using System;
using System.ComponentModel.DataAnnotations;

namespace FileManager.API.Dtos
{
    public class UserForUpdateDto
    {
        [Required]
        public string UserName { get; set; }
        public string KnownAs { get; set; }
        [Required]
        public int CompanyId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateModified { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public UserForUpdateDto()
        {
            DateModified = DateTime.Now;
        }
    }
}