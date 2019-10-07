using System;
using System.Collections.Generic;

namespace FileManager.API.Models
{
    public class FileManagerAdmin
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SubFolderName { get; set; }
        public string FolderData { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }       
        public virtual User User { get; set;}
        public virtual ICollection<File> Files { get; set; }
    }
}