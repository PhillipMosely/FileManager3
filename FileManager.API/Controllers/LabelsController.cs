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

namespace FileManager.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LabelsController : ControllerBase
    {
       private readonly IFileManagerRepository _repo;
        private readonly IMapper _mapper;

        public LabelsController(IFileManagerRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repository;
           
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLabel(int id)
        {
            var labelfromRepo = await _repo.GetLabel(id);
            if ( labelfromRepo == null)
                return NotFound();            

            var label = _mapper.Map<LabelForListDto>(labelfromRepo);

            return Ok(label);
        }

        [HttpGet]
        public async Task<IActionResult> GetLabels([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
 
            var labels = await _repo.GetLabels(userParams);
            var labelsToReturn = _mapper.Map<IEnumerable<LabelForListDto>>(labels);
            Response.AddPagination(labels.CurrentPage,labels.PageSize,labels.TotalCount,labels.TotalPages);
            return Ok(labelsToReturn);
        }

        [HttpGet("forcompany/{companyId}")]
        public async Task<IActionResult> GetLabelsforCompany(int companyId, [FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
 
            var labels = await _repo.GetLabelsforCompany(companyId, userParams);
            var labelsToReturn = _mapper.Map<IEnumerable<LabelForListDto>>(labels);
            Response.AddPagination(labels.CurrentPage,labels.PageSize,labels.TotalCount,labels.TotalPages);
            return Ok(labelsToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLabel(int id, LabelForListDto labelForListDto)
        {
            
            var labelFromRepo = await _repo.GetLabel(id);
            if (labelFromRepo == null)
                return NotFound();

            _mapper.Map(labelForListDto,labelFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating Label {id} failed on save");
        }


    }
}