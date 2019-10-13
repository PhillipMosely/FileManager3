using System.Collections.Generic;
using System;

namespace FileManager.API.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public bool IsSuperUser { get; set; }
        public bool IsCompanyAdmin {get; set;}
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}