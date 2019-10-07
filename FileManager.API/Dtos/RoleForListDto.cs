using System;

namespace FileManager.API.Dtos
{
    public class RoleForListDto
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }        
   
    }
}