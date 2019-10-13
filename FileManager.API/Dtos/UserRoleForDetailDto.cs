using FileManager.API.Models;

namespace FileManager.API.Dtos
{
    public class UserRoleForDetailDto
    {
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}