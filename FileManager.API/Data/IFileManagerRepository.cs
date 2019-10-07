using System.Collections.Generic;
using System.Threading.Tasks;
using FileManager.API.Helpers;
using FileManager.API.Models;

namespace FileManager.API.Data
{
    public interface IFileManagerRepository
    {
         void Add<T>(T entity) where T: class;
         Task<bool> Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<User> GetUser(int id);

         Task<PagedList<Company>> GetCompanies(UserParams userParams);
         Task<Company> GetCompany(int id);
         Task<Company> AddCompany(Company company);
         Task<bool> CompanyExists(string companyname);

         Task<PagedList<FileManagerAdmin>> GetFMAdmins(UserParams userParams);
         Task<FileManagerAdmin> GetFMAdmin(int id);
         Task<FileManagerAdmin> GetFMAdminForUserId(int id);
         Task<FileManagerAdmin> AddFMAdmin(FileManagerAdmin fmAdmin);
         Task<bool> FMAdminExists(int userId);

         Task<File> GetFile(int id);
         Task<PagedList<File>> GetFiles(UserParams userParams, int fmAdminId, int nodeId);
         Task<File> AddFile(File file);
         Task<bool> FileExists(string filename, int fmadminid, int nodeid);

         Task<Role> GetRole(int id);
         Task<PagedList<Role>> GetRoles(UserParams userParams);
         Task<Role> AddRole(Role role);
         Task<bool> RoleExists(string rolename);

    }
}