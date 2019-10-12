using System;

namespace FileManager.API.Models
{
    public class FMAdminForListDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SubFolderName { get; set; }
        public string FolderData { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }     
        public UserForListDto User { get; set; }  

    }
}