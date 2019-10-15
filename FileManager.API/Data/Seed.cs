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
                    CompanyName = "HRTMS Inc",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now
                };
                context.Companies.Add(company); 
                
                var company2 = new Company {
                    CompanyName = "Google",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now
                };
                context.Companies.Add(company2);

                var company3 = new Company {
                    CompanyName = "Lexus Nexus",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now
                };
                context.Companies.Add(company3);

                CompanySettings(ref context);

                var role = new Role { 
                    RoleName="HRTMS Admin",
                    IsSuperUser = true,
                    IsCompanyAdmin = true,
                    Description="HRTMS Master Administrative Role",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now};
                context.Roles.Add(role);
                    
                var role2 = new Role {
                    RoleName="Users",
                    Description="User Role",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now};
                context.Roles.Add(role2);

                var role3 = new Role {
                    RoleName="Company Admin",
                    Description="The admin role for a single company.  Can configure options for the company",
                    IsCompanyAdmin = true,
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now};
                context.Roles.Add(role3);
                
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
                    Company = company3
                };            
                
                CreatePasswordHash("password",out passwordHash, out passwordSalt);
                user2.PasswordHash = passwordHash;
                user2.PasswordSalt = passwordSalt;

                context.Users.Add(user2);

                var userRole = new UserRole {
                    User = user,
                    Role = role
                };
                context.UserRoles.Add(userRole);
                
                var userRole2 = new UserRole {
                    User = user2,
                    Role = role2
                };
                context.UserRoles.Add(userRole2);                

                var fmAdmin = new FileManagerAdmin {
                    User = user,
                    SubFolderName = "Admin Folder",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    FolderData = "[{\"id\": \"2\",\"parentid\": \"1\",\"text\": \"Admin Hot Chocolate\",\"value\": \"\"},{\"id\": \"3\",\"parentid\": \"1\",\"text\": \"Peppermint Hot Chocolate\",\"value\": \"$\"},{\"id\": \"4\",\"parentid\": \"1\",\"text\": \"Salted Caramel Hot Chocolate\",\"value\": \"\"},{\"id\": \"5\",\"parentid\": \"1\",\"text\": \"White Hot Chocolate\",\"value\": \"\"},{\"text\": \"Chocolate Beverage\",\"id\": \"1\",\"parentid\": \"0\",\"value\": \"\"},{\"id\": \"6\",\"text\": \"Espresso Beverage\",\"parentid\": \"0\",\"value\": \"\"},{\"id\": \"7\",\"parentid\": \"6\",\"text\": \"Caffe Americano\",\"value\": \"\"}]"
                };
                context.FileManagerAdmin.Add(fmAdmin);
                
                var fmAdmin2 = new FileManagerAdmin {
                    User = user2,
                    SubFolderName = "User Folder",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    FolderData = "[{\"id\": \"2\",\"parentid\": \"1\",\"text\": \"User Hot Chocolate\",\"value\": \"\"},{\"id\": \"3\",\"parentid\": \"1\",\"text\": \"Peppermint Hot Chocolate\",\"value\": \"$\"},{\"id\": \"4\",\"parentid\": \"1\",\"text\": \"Salted Caramel Hot Chocolate\",\"value\": \"\"},{\"id\": \"5\",\"parentid\": \"1\",\"text\": \"White Hot Chocolate\",\"value\": \"\"},{\"text\": \"Chocolate Beverage\",\"id\": \"1\",\"parentid\": \"0\",\"value\": \"\"},{\"id\": \"6\",\"text\": \"Espresso Beverage\",\"parentid\": \"0\",\"value\": \"\"},{\"id\": \"7\",\"parentid\": \"6\",\"text\": \"Caffe Americano\",\"value\": \"\"}]"
                };
                context.FileManagerAdmin.Add(fmAdmin2);

            }

            context.SaveChanges();
            
        }

        private static void CompanySettings(ref DataContext context)
        {
            var label = new Label {
                CompanyId = 1,
                ModelName = "Company.CompanyName",
                LabelName = "Company Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "Company.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 1,
                ModelName = "Company.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "File.FileName",
                LabelName = "File Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "File.Ext",
                LabelName = "Ext"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "File.Url",
                LabelName = "Url"
            };
            context.Labels.Add(label);           
            label = new Label {
                CompanyId = 1,
                ModelName = "File.Description",
                LabelName = "Description"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 1,
                ModelName = "File.Size",
                LabelName = "Size"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 1,
                ModelName = "File.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 1,
                ModelName = "File.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);            

            label = new Label {
                CompanyId = 1,
                ModelName = "FileManagerAdmin.SubFolderName",
                LabelName = "SubFolderName"
            };
            context.Labels.Add(label);     
            label = new Label {
                CompanyId = 1,
                ModelName = "FileManagerAdmin.FolderData",
                LabelName = "FolderData"
            };
            context.Labels.Add(label);                 
            label = new Label {
                CompanyId = 1,
                ModelName = "FileManagerAdmin.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 1,
                ModelName = "FileManagerAdmin.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label); 

            label = new Label {
                CompanyId = 1,
                ModelName = "User.UserName",
                LabelName = "Username"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 1,
                ModelName = "User.FirstName",
                LabelName = "First Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "User.LastName",
                LabelName = "Last Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "User.Email",
                LabelName = "Email"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "User.MobilePhone",
                LabelName = "Mobile Phone"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "User.KnownAs",
                LabelName = "Known As"
            };
           context.Labels.Add(label);            
            label = new Label {
                CompanyId = 1,
                ModelName = "User.City",
                LabelName = "City"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "User.Country",
                LabelName = "Country"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 1,
                ModelName = "User.PhotoUrl",
                LabelName = "Photo Url"
            };
            context.Labels.Add(label);

            label = new Label {
                CompanyId = 1,
                ModelName = "User.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 1,
                ModelName = "User.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);


            label = new Label {
                CompanyId = 2,
                ModelName = "Company.CompanyName",
                LabelName = "Company Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "Company.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 2,
                ModelName = "Company.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "File.FileName",
                LabelName = "File Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "File.Ext",
                LabelName = "Ext"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "File.Url",
                LabelName = "Url"
            };
            context.Labels.Add(label);           
            label = new Label {
                CompanyId = 2,
                ModelName = "File.Description",
                LabelName = "Description"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 2,
                ModelName = "File.Size",
                LabelName = "Size"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 2,
                ModelName = "File.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 2,
                ModelName = "File.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);            

            label = new Label {
                CompanyId = 2,
                ModelName = "FileManagerAdmin.SubFolderName",
                LabelName = "SubFolderName"
            };
            context.Labels.Add(label);     
            label = new Label {
                CompanyId = 2,
                ModelName = "FileManagerAdmin.FolderData",
                LabelName = "FolderData"
            };
            context.Labels.Add(label);                 
            label = new Label {
                CompanyId = 2,
                ModelName = "FileManagerAdmin.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 2,
                ModelName = "FileManagerAdmin.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label); 

            label = new Label {
                CompanyId = 2,
                ModelName = "User.UserName",
                LabelName = "Username"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 2,
                ModelName = "User.FirstName",
                LabelName = "First Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "User.LastName",
                LabelName = "Last Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "User.Email",
                LabelName = "Email"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "User.MobilePhone",
                LabelName = "Mobile Phone"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "User.KnownAs",
                LabelName = "Known As"
            };
           context.Labels.Add(label);            
            label = new Label {
                CompanyId = 2,
                ModelName = "User.City",
                LabelName = "City"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "User.Country",
                LabelName = "Country"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 2,
                ModelName = "User.PhotoUrl",
                LabelName = "Photo Url"
            };
            context.Labels.Add(label);

            label = new Label {
                CompanyId = 2,
                ModelName = "User.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 2,
                ModelName = "User.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);


            label = new Label {
                CompanyId = 3,
                ModelName = "Company.CompanyName",
                LabelName = "Company Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "Company.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 3,
                ModelName = "Company.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "File.FileName",
                LabelName = "File Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "File.Ext",
                LabelName = "Ext"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "File.Url",
                LabelName = "Url"
            };
            context.Labels.Add(label);           
            label = new Label {
                CompanyId = 3,
                ModelName = "File.Description",
                LabelName = "Description"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 3,
                ModelName = "File.Size",
                LabelName = "Size"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 3,
                ModelName = "File.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 3,
                ModelName = "File.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 3,
                ModelName = "FileManagerAdmin.SubFolderName",
                LabelName = "SubFolderName"
            };
            context.Labels.Add(label);     
            label = new Label {
                CompanyId = 3,
                ModelName = "FileManagerAdmin.FolderData",
                LabelName = "FolderData"
            };
            context.Labels.Add(label);                 
            label = new Label {
                CompanyId = 3,
                ModelName = "FileManagerAdmin.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 3,
                ModelName = "FileManagerAdmin.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label); 

            label = new Label {
                CompanyId = 3,
                ModelName = "User.UserName",
                LabelName = "Username"
            };
            context.Labels.Add(label); 
            label = new Label {
                CompanyId = 3,
                ModelName = "User.FirstName",
                LabelName = "First Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "User.LastName",
                LabelName = "Last Name"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "User.Email",
                LabelName = "Email"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "User.MobilePhone",
                LabelName = "Mobile Phone"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "User.KnownAs",
                LabelName = "Known As"
            };
           context.Labels.Add(label);            
            label = new Label {
                CompanyId = 3,
                ModelName = "User.City",
                LabelName = "City"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "User.Country",
                LabelName = "Country"
            };
            context.Labels.Add(label);
            label = new Label {
                CompanyId = 3,
                ModelName = "User.PhotoUrl",
                LabelName = "Photo Url"
            };
            context.Labels.Add(label);

            label = new Label {
                CompanyId = 3,
                ModelName = "User.DateCreated",
                LabelName = "Date Created"
            };
            context.Labels.Add(label);            
            label = new Label {
                CompanyId = 3,
                ModelName = "User.DateModified",
                LabelName = "Date Modified"
            };
            context.Labels.Add(label);            
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