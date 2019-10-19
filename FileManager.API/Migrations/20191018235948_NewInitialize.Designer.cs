﻿// <auto-generated />
using System;
using FileManager.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FileManager.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20191018235948_NewInitialize")]
    partial class NewInitialize
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0");

            modelBuilder.Entity("FileManager.API.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CompanyName");
                        

                    b.Property<string>("ComponentConfig");
                        

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("DATETIME2");

                    b.Property<DateTime>("DateModified")
                        .HasColumnType("DATETIME2");

                    b.Property<string>("LogoUrl");
                        

                    b.Property<string>("OverallStyleConfig");
                        

                    b.Property<string>("WebsiteUrl");
                        

                    b.HasKey("Id");

                    b.ToTable("Companys");
                });

            modelBuilder.Entity("FileManager.API.Models.File", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("DATETIME2");

                    b.Property<DateTime>("DateModified")
                        .HasColumnType("DATETIME2");

                    b.Property<string>("Description");
                        

                    b.Property<string>("Ext");
                        

                    b.Property<int>("FileManagerAdminId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("FileName");
                        

                    b.Property<int>("NodeId")
                        .HasColumnType("INTEGER");

                    b.Property<long>("Size");

                    b.Property<string>("StorageId");
                        

                    b.Property<string>("Url");
                        

                    b.HasKey("Id");

                    b.HasIndex("FileManagerAdminId");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("FileManager.API.Models.FileManagerAdmin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("DATETIME2");

                    b.Property<DateTime>("DateModified")
                        .HasColumnType("DATETIME2");

                    b.Property<string>("FolderData");
                        

                    b.Property<string>("SubFolderName");
                        

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("FileManagerAdmin");
                });

            modelBuilder.Entity("FileManager.API.Models.Label", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CompanyId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LabelName");
                        

                    b.Property<string>("ModelName");
                        

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Labels");
                });

            modelBuilder.Entity("FileManager.API.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("DATETIME2");

                    b.Property<DateTime>("DateModified")
                        .HasColumnType("DATETIME2");

                    b.Property<string>("Description");
                        

                    b.Property<bool>("IsCompanyAdmin")
                        .HasColumnType("BIT");

                    b.Property<bool>("IsSuperUser")
                        .HasColumnType("BIT");

                    b.Property<string>("RoleName");
                        

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("FileManager.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("City");
                        

                    b.Property<int>("CompanyId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Country");
                        

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("DATETIME2");

                    b.Property<DateTime>("DateModified")
                        .HasColumnType("DATETIME2");

                    b.Property<string>("Email");
                        

                    b.Property<string>("FirstName");
                        

                    b.Property<string>("KnownAs");
                        

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("DATETIME2");

                    b.Property<string>("LastName");
                        

                    b.Property<string>("MobilePhone");
                        

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PhotoStorageId");
                        

                    b.Property<string>("PhotoUrl");
                        

                    b.Property<string>("UserName");
                        

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FileManager.API.Models.UserRole", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("FileManager.API.Models.File", b =>
                {
                    b.HasOne("FileManager.API.Models.FileManagerAdmin", "FMAdmin")
                        .WithMany("Files")
                        .HasForeignKey("FileManagerAdminId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FileManager.API.Models.FileManagerAdmin", b =>
                {
                    b.HasOne("FileManager.API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FileManager.API.Models.Label", b =>
                {
                    b.HasOne("FileManager.API.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FileManager.API.Models.User", b =>
                {
                    b.HasOne("FileManager.API.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FileManager.API.Models.UserRole", b =>
                {
                    b.HasOne("FileManager.API.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FileManager.API.Models.User", "User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
