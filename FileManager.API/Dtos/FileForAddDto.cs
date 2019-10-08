using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace FileManager.API.Dtos
{
    public class FileForAddDto
    {
        [Required]
        public string FileName { get; set; }
        public string Ext { get; set; }
        public IFormFile File { get; set; }
        public string Url { get; set; }
        public string StorageId {get; set;}

        public string Description { get; set; }
        public long Size { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        [Required]
        public int FileManagerAdminId { get; set; }    
        [Required]
        public int NodeId {get; set;}            
        public FileForAddDto()
        {
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
        }
    }
}