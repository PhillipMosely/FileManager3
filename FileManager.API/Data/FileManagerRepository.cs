using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FileManager.API.Helpers;
using FileManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FileManager.API.Data
{
    public class FileManagerRepository : IFileManagerRepository
    {
        private readonly DataContext _context;

        public FileManagerRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
            _context.SaveChanges();
        }

        public async Task<bool> Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();     
            return true;       
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.OrderBy(u => u.LastName).AsQueryable();

            return await PagedList<User>.CreateAsync(users,userParams.PageNumber,userParams.PageSize);
        }

        public async Task<File> GetFile(int id)
        {
            var File = await _context.Files.FirstOrDefaultAsync(p => p.Id == id);

            return File;
        }

        public async Task<PagedList<File>> GetFiles(UserParams userParams, int fmAdminId, int nodeId)
        {
            var files = _context.Files
                .Where(u => u.FileManagerAdminId == fmAdminId && u.NodeId == nodeId)
                .OrderBy(u => u.FileName).AsQueryable();

            return await PagedList<File>.CreateAsync(files,userParams.PageNumber,userParams.PageSize);

        }
        public async Task<File> AddFile(File file) 
        {
            await _context.Files.AddAsync(file);
            await _context.SaveChangesAsync();
            return file; 
        }
        public async Task<bool> FileExists(string filename, int fmadminid, int nodeid)
        {
            if (await _context.Files.AnyAsync(x => x.FileName == filename && 
                                              x.Id == fmadminid && x.NodeId == nodeid))
                return true;
            return false;
        }        
        public async Task<Role> GetRole(int id)
        {
            var Role = await _context.Roles.FirstOrDefaultAsync(p => p.Id == id);

            return Role;
        }
        public async Task<PagedList<Role>> GetRoles(UserParams userParams)
        {
            var roles = _context.Roles.OrderBy(u => u.RoleName).AsQueryable();

            return await PagedList<Role>.CreateAsync(roles,userParams.PageNumber,userParams.PageSize);

        }
        public async Task<Role> AddRole(Role role) 
        {
            await _context.Roles.AddAsync(role);
            await _context.SaveChangesAsync();
            return role; 
        }
        public async Task<bool> RoleExists(string rolename)
        {
            if (await _context.Roles.AnyAsync(x => x.RoleName == rolename))
                return true;
            return false;
        }
        public async Task<PagedList<Company>> GetCompanies(UserParams userParams)
        {
            var companies = _context.Companies.OrderBy(u => u.CompanyName).AsQueryable();

            return await PagedList<Company>.CreateAsync(companies,userParams.PageNumber,userParams.PageSize);
        }

        public async Task<Company> GetCompany(int id)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(u => u.Id == id);

            return company;
        }
        public async Task<Company> AddCompany(Company company) 
        {
            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
            return company; 
        }

        public async Task<bool> CompanyExists(string companyname)
        {
            if (await _context.Companies.AnyAsync(x => x.CompanyName == companyname))
                return true;
            return false;
        }

        public async Task<PagedList<FileManagerAdmin>> GetFMAdmins(UserParams userParams)
        {
            var fmadmins = _context.FileManagerAdmin.OrderBy(u => u.User.Company.CompanyName).AsQueryable();

            return await PagedList<FileManagerAdmin>.CreateAsync(fmadmins,userParams.PageNumber,userParams.PageSize);

        }

        public async Task<FileManagerAdmin> GetFMAdmin(int id)
        {
            var fmadmin = await _context.FileManagerAdmin.FirstOrDefaultAsync(u => u.Id == id);

            return fmadmin;
        }

        public async Task<FileManagerAdmin> GetFMAdminForUserId(int id)
        {
            var fmadmin = await _context.FileManagerAdmin.FirstOrDefaultAsync(u => u.UserId == id);

            return fmadmin;
        }

        public async Task<FileManagerAdmin> AddFMAdmin(FileManagerAdmin fmAdmin) 
        {
            await _context.FileManagerAdmin.AddAsync(fmAdmin);
            await _context.SaveChangesAsync();
            return fmAdmin; 
        }
        public async Task<bool> FMAdminExists(int userId)
        {
            if (await _context.FileManagerAdmin.AnyAsync(x => x.UserId == userId))
                return true;
            return false;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

      }
}