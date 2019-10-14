using FileManager.API.Models;

namespace FileManager.API.Dtos
{
    public class UserRoleForDetailDto
    {
        public int UserId {get; set;}
        public int RoleId {get; set;}
        public Role Role { get; set; }
    }
}