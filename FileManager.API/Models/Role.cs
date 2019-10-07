using System.Collections.Generic;
using System;

namespace FileManager.API.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public virtual ICollection<UserRole> Users { get; set; }
    }
}