using System;

namespace FileManager.API.Models
{
    public class FMAdminForDetailDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SubFolderName { get; set; }
        public string FolderData { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }  
        public User User {get; set;}     

    }
}