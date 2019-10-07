using System;

namespace FileManager.API.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }       
    }
}