using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace FileManager.API.Dtos
{
    public class FileForAddDto
    {

        public string FileName { get; set; }
        public string Ext { get; set; }
        public string Url { get; set; }
        public string StorageId {get; set;}
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public long Size { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public int FileManagerAdminId { get; set; }    

        public int NodeId {get; set;}            
        public FileForAddDto()
        {
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
        }
    }
}