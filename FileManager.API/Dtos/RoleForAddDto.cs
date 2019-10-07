using System;
using System.ComponentModel.DataAnnotations;

namespace FileManager.API.Dtos
{
    public class RoleForAddDto
    {
        [Required]
        public string RoleName { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }        
        public RoleForAddDto()
        {
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
        }
    }
}