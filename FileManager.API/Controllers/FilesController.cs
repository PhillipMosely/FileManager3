using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FileManager.API.Data;
using FileManager.API.Dtos;
using FileManager.API.Helpers;
using FileManager.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace FileManager.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFileManagerRepository _repo;
        private readonly IMapper _mapper;

        private CloudBlobClient serviceClient;
        private CloudBlobContainer azureContainer;

        public FilesController(IFileManagerRepository repository, IMapper mapper,
                               IOptions<AzureSettings> azureConfig)
        {
            _mapper = mapper;
            _repo = repository;

            CloudStorageAccount account = CloudStorageAccount.Parse(azureConfig.Value.ConnectionString);
            serviceClient = account.CreateCloudBlobClient();

            azureContainer = serviceClient.GetContainerReference(azureConfig.Value.Container);
           
        }

        [HttpGet("{id}", Name="GetFile")]
        public async Task<IActionResult> GetFile(int id)
        {
            var filefromRepo = await _repo.GetFile(id);

            var file = _mapper.Map<FileForListDto>(filefromRepo);

            return Ok(file);
        }

        [HttpGet("{fmAdminId}/{nodeId}")]
        public async Task<IActionResult> GetFiles([FromQuery]UserParams userParams, 
                                                  int fmAdminId, int nodeId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
 
            var files = await _repo.GetFiles(userParams, fmAdminId, nodeId);
            var filesToReturn = _mapper.Map<IEnumerable<FileForListDto>>(files);
            Response.AddPagination(files.CurrentPage,files.PageSize,files.TotalCount,files.TotalPages);
            return Ok(filesToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(int id, FileForUpdateDto fileForUpdateDto)
        {
            
            var fileFromRepo = await _repo.GetFile(id);
            if (fileFromRepo == null)
                return NotFound();

            _mapper.Map(fileForUpdateDto,fileFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating File {id} failed on save");
        }

        [HttpPost("{fmAdminId}/{nodeId}")]
        public async Task<IActionResult> AddFile(int fmAdminId, int nodeId, [FromForm]FileForAddDto fileForAddDto)
        {
            //FileForAddDto fileForAddDto = new FileForAddDto(){FileManagerAdminId = fmAdminId, NodeId = nodeId};
            var myFile = fileForAddDto.File;
            fileForAddDto.FileManagerAdminId = fmAdminId;
            fileForAddDto.NodeId = nodeId;
            

            if (await _repo.FileExists(fileForAddDto.FileName,
                                       fileForAddDto.FileManagerAdminId,
                                       fileForAddDto.NodeId))
                return BadRequest("File already exists for folder");
            
            if (myFile != null)
            {
                fileForAddDto.FileName = myFile.FileName;
                fileForAddDto.Ext = Path.GetExtension(myFile.FileName);
                fileForAddDto.Size = myFile.Length;
                string _imageName = Guid.NewGuid().ToString() + "-" + Path.GetExtension(myFile.FileName);
                CloudBlockBlob blob = azureContainer.GetBlockBlobReference(_imageName);
                blob.Properties.ContentType = myFile.ContentType;
                fileForAddDto.StorageId = _imageName;
                fileForAddDto.Url = blob.Uri.ToString();

                if (myFile.Length > 0)
                {
                    using (var stream = myFile.OpenReadStream())
                    {
                        blob.UploadFromStreamAsync(stream).Wait();
                    }
                }
            }

            var fileToAdd = _mapper.Map<FileManager.API.Models.File>(fileForAddDto);

            var createdFile = await _repo.AddFile(fileToAdd);

            var fileToReturn = _mapper.Map<FileForListDto>(createdFile);

            return CreatedAtRoute("GetFile", new {controller = "Files", id= createdFile.Id},fileToReturn);
        }

        [HttpDelete("{id}", Name="DeleteFile")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            var fileToDelete = await _repo.GetFile(id);
            if (fileToDelete == null)
                return NotFound();

            if (await _repo.Delete(fileToDelete))
                return Ok();
            
            throw new Exception($"Could not delete File {id}");
        }
    }
}