using System;
using System.ComponentModel.DataAnnotations;

namespace FileManager.API.Dtos
{
    public class FileForListDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Ext { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int Size { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int NodeId {get; set;}        
        public int FileManagerAdminId { get; set; }        
    }
}