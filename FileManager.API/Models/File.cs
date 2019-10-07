using System;

namespace FileManager.API.Models
{
    public class File
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Ext { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public double Size { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int FileManagerAdminId { get; set; }
        public virtual FileManagerAdmin FMAdmin { get; set; }
        public int NodeId {get; set;}

    }
}