using System;
using System.ComponentModel.DataAnnotations;

namespace FileManager.API.Dtos
{
    public class CompanyForAddDto
    {
        [Required]
        public string CompanyName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }        
        public CompanyForAddDto()
        {
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
        }
    }
}