using System;
using System.ComponentModel.DataAnnotations;

namespace FileManager.API.Dtos
{
    public class FileForUpdateDto
    {
        public int Id { get; set; }
        [Required]
        public string FileName { get; set; }
        public string Ext { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int Size { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        [Required]
        public int FileManagerAdminId { get; set; }        
        [Required]
        public int NodeId {get; set;}
        public FileForUpdateDto()
        {
            DateModified = DateTime.Now;
        }
    }
}