using System;
using System.ComponentModel.DataAnnotations;

namespace FileManager.API.Dtos
{
    public class CompanyForListDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string WebsiteUrl { get; set; }       
        public string LogoUrl { get; set; }
        public string OverallStyleConfig { get; set; }
        [StringLength(5000)]
        public string ComponentConfig { get; set;}        
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }        
   
    }
}