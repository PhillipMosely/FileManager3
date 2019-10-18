using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FileManager.API.Dtos
{
    public class UserForUpdateDto
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public int CompanyId { get; set; }
        public string MobilePhone { get; set; }
        public string PhotoUrl { get; set; }
        public string PhotoStorageId {get; set;}        
        public string KnownAs { get; set; }

        public string City { get; set; }
        public string Country { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public ICollection<UserRoleForRegisterDto> Roles {get; set;}
        public UserForUpdateDto()
        {
            DateModified = DateTime.Now;
        }
    }
}