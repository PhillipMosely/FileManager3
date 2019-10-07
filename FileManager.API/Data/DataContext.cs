using FileManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FileManager.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options){}

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<UserRole>  UserRole { get; set;}
        public DbSet<Company> Companies { get; set; }
        public DbSet<FileManagerAdmin> FileManagerAdmin { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserRole>()
                .HasKey(ur => new {ur.UserId, ur.RoleId});

            builder.Entity<UserRole>()
                .HasOne(u => u.User)
                .WithMany(u => u.Roles )
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            
             builder.Entity<UserRole>()
                .HasOne(u => u.Role)
                .WithMany(u => u.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<User>()
                .HasOne(u => u.Company);
            
            builder.Entity<FileManagerAdmin>()
                .HasOne(u => u.User);
            
            builder.Entity<File>()
                .HasOne(u => u.FMAdmin);

        }
    }
}