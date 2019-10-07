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
    public class CompanysController : ControllerBase
    {
        private readonly IFileManagerRepository _repo;
        private readonly IMapper _mapper;

        public CompanysController(IFileManagerRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanys([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            userParams.UserId = currentUserId;
 
            var companies = await _repo.GetCompanies(userParams);
            var companiesToReturn = _mapper.Map<IEnumerable<CompanyForListDto>>(companies);
            Response.AddPagination(companies.CurrentPage,companies.PageSize,companies.TotalCount,companies.TotalPages);
            return Ok(companiesToReturn);
        }

        [HttpGet("{id}", Name="GetCompany")]
        public async Task<IActionResult> GetCompany(int id)
        {
            var company = await _repo.GetCompany(id);
            var companyToReturn = _mapper.Map<CompanyForListDto>(company);
            return Ok(companyToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, CompanyForUpdateDto companyForUpdateDto)
        {
          
            var companyFromRepo = await _repo.GetCompany(id);
            if (companyFromRepo == null)
                return NotFound();            

            _mapper.Map(companyForUpdateDto,companyFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating Company {id} failed on save");
        }

        [HttpPost("AddCompany")]
        public async Task<IActionResult> AddCompany(CompanyForAddDto companyForAddDto)
        {

            if (await _repo.CompanyExists(companyForAddDto.CompanyName))
                return BadRequest("Company Name already exists");

            var companyToAdd = _mapper.Map<Company>(companyForAddDto);

            var createdCompany = await _repo.AddCompany(companyToAdd);

            var companyToReturn = _mapper.Map<CompanyForListDto>(createdCompany);

            return CreatedAtRoute("GetCompany", new {controller = "Companys", id= createdCompany.Id},companyToReturn);
        }

        
        [HttpDelete("{id}", Name="DeleteCompany")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var companyToDelete = await _repo.GetCompany(id);
            if (companyToDelete == null)
                return NotFound();

            if (await _repo.Delete(companyToDelete))
                return Ok();
            
            throw new Exception($"Company {id} failed on Delete");
        }
    }
}