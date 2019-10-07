using System;

namespace FileManager.API.Dtos
{
    public class CompanyForUpdateDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }        
        public CompanyForUpdateDto()
        {
            DateModified = DateTime.Now;
        }
    }
}