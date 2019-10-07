using System;
using System.Collections.Generic;
using System.Linq;
using FileManager.API.Models;
using Newtonsoft.Json;

namespace FileManager.API.Data
{
    public class Seed
    {
        public static void SeedData(DataContext context) 
        {
            if (!context.Users.Any())
            {
                var company = new Company {
                    CompanyName = "Google",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now
                };
                context.Companies.Add(company);

                var role = new Role { 
                    RoleName="Admin",
                    Description="Administrative Role",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now};
                context.Roles.Add(role);
                    
                var role2 = new Role {
                    RoleName="Users",
                    Description="User Role",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now};
                context.Roles.Add(role2);

                var user = new User {
                    FirstName = "Admin",
                    LastName = "Admin",
                    UserName = "admin",
                    PhotoUrl = "",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    Company = company
                };            
                
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password",out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                context.Users.Add(user);

                var user2 = new User {
                    FirstName = "Test",
                    LastName = "User",
                    UserName = "testuser",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    Company = company
                };            
                
                CreatePasswordHash("password",out passwordHash, out passwordSalt);
                user2.PasswordHash = passwordHash;
                user2.PasswordSalt = passwordSalt;

                context.Users.Add(user2);

                var userRole = new UserRole {
                    User = user,
                    Role = role
                };
                context.UserRole.Add(userRole);
                
                var userRole2 = new UserRole {
                    User = user2,
                    Role = role2
                };
                context.UserRole.Add(userRole2);                

                var fmAdmin = new FileManagerAdmin {
                    User = user2,
                    SubFolderName = "Admin Folder",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    FolderData = "[{\"id\": \"2\",\"parentid\": \"1\",\"text\": \"Hot Chocolate\",\"value\": \"$2.3\"},{\"id\": \"3\",\"parentid\": \"1\",\"text\": \"Peppermint Hot Chocolate\",\"value\": \"$2.3\"},{\"id\": \"4\",\"parentid\": \"1\",\"text\": \"Salted Caramel Hot Chocolate\",\"value\": \"$2.3\"},{\"id\": \"5\",\"parentid\": \"1\",\"text\": \"White Hot Chocolate\",\"value\": \"$2.3\"},{\"text\": \"Chocolate Beverage\",\"id\": \"1\",\"parentid\": \"-1\",\"value\": \"$2.3\"},{\"id\": \"6\",\"text\": \"Espresso Beverage\",\"parentid\": \"-1\",\"value\": \"$2.3\"},{\"id\": \"7\",\"parentid\": \"6\",\"text\": \"Caffe Americano\",\"value\": \"$2.3\"}]"
                };
                context.FileManagerAdmin.Add(fmAdmin);

                var file = new File {
                    FMAdmin = fmAdmin,
                    FileName = "user.png",
                    Ext = "png",
                    Url = "./assets/img/user.png",
                    Size = 12.5,
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    NodeId = 2
                };
                context.Files.Add(file);

            }

            context.SaveChanges();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            
        }        

    }
}