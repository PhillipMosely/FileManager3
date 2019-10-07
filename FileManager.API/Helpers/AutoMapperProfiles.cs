using System.Linq;
using AutoMapper;
using FileManager.API.Dtos;
using FileManager.API.Models;

namespace FileManager.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDto>();
            CreateMap<User,UserForDetailedDto>();
            CreateMap<UserForUpdateDto,User>();
            CreateMap<UserForRegisterDto,User>();

            CreateMap<RoleForAddDto,Role>();
            CreateMap<RoleForUpdateDto,Role>();
            CreateMap<Role,RoleForListDto>();
            
            CreateMap<CompanyForAddDto,Company>();
            CreateMap<CompanyForUpdateDto,Company>();
            CreateMap<Company,CompanyForListDto>();
            
            CreateMap<FMAdminForAddDto,FileManagerAdmin>();
            CreateMap<FMAdminForUpdateDto,FileManagerAdmin>();
            CreateMap<FileManagerAdmin,FMAdminForListDto>();
   
            CreateMap<FileForAddDto,File>();
            CreateMap<FileForUpdateDto,File>();
            CreateMap<File,FileForListDto>();
        }
    }
}