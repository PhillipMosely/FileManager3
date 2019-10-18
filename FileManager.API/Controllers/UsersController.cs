using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FileManager.API.Data;
using FileManager.API.Dtos;
using FileManager.API.Helpers;
using FileManager.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.Extensions.Options;
using System.Net;

namespace FileManager.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IFileManagerRepository _repo;
        private readonly IMapper _mapper;
        
        private CloudBlobClient serviceClient;
        private CloudBlobContainer azureContainer;

        public UsersController(IFileManagerRepository repo, IMapper mapper,
                               IOptions<AzureSettings> azureConfig)
        {
            _mapper = mapper;
            _repo = repo;

            CloudStorageAccount account = CloudStorageAccount.Parse(azureConfig.Value.ConnectionString);
            serviceClient = account.CreateCloudBlobClient();

            azureContainer = serviceClient.GetContainerReference(azureConfig.Value.Container);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
 
            var users = await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage,users.PageSize,users.TotalCount,users.TotalPages);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            if (user == null)
                return NotFound();

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        [HttpGet("getbyusername/{username}", Name="GetByUserName")]
        public async Task<IActionResult> GetByUserName(string username)
        {
            var user = await _repo.GetUserByUserName(username);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating User {id} failed on save");
        }

        [HttpPost("{id}/updateprofilepicture")]
        public async Task<IActionResult> UpdateProfilePicture(int id, [FromForm]IFormFile file)
        {
          
            if (file != null)
            {
                string myGuid = Guid.NewGuid().ToString();
                string _imageName = myGuid + "-" + Path.GetExtension(file.FileName);
                CloudBlockBlob blob = azureContainer.GetBlockBlobReference(_imageName);
                blob.Properties.ContentType = file.ContentType;

                var userFromRepo = await _repo.GetUser(id);
                userFromRepo.PhotoStorageId = _imageName;
                userFromRepo.PhotoUrl = blob.Uri.ToString();

                if (file.Length > 0)
                {
                    using (var stream = file.OpenReadStream())
                    {
                        await blob.UploadFromStreamAsync(stream);
                    }
                }
                await _repo.SaveAll();
                return Ok("Profile Picture saved and User Updated.");
            }

            return NoContent();
        }

    }
}