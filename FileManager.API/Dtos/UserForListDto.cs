using System;

namespace FileManager.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }        
        public string KnownAs { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string  PhotoUrl { get; set; }        
    }
}