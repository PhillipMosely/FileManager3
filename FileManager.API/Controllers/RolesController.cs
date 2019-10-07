using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FileManager.API.Data;
using FileManager.API.Dtos;
using FileManager.API.Helpers;
using FileManager.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FileManager.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IFileManagerRepository _repo;
        private readonly IMapper _mapper;

        public RolesController(IFileManagerRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repository;
           
        }

        [HttpGet("{id}", Name="GetRole")]
        public async Task<IActionResult> GetRole(int id)
        {
            var rolefromRepo = await _repo.GetRole(id);

            var role = _mapper.Map<RoleForListDto>(rolefromRepo);

            return Ok(role);
        }

        [HttpGet]
        public async Task<IActionResult> GetRoles([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
 
            var roles = await _repo.GetRoles(userParams);
            var rolesToReturn = _mapper.Map<IEnumerable<RoleForListDto>>(roles);
            Response.AddPagination(roles.CurrentPage,roles.PageSize,roles.TotalCount,roles.TotalPages);
            return Ok(rolesToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id, RoleForUpdateDto roleForUpdateDto)
        {
            
            var roleFromRepo = await _repo.GetRole(id);
            if (roleFromRepo == null)
                return NotFound();

            _mapper.Map(roleForUpdateDto,roleFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating Role {id} failed on save");
        }

        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole(RoleForAddDto roleForAddDto)
        {

            if (await _repo.RoleExists(roleForAddDto.RoleName))
                return BadRequest("Role Name already exists");

            var roleToAdd = _mapper.Map<Role>(roleForAddDto);

            var createdRole = await _repo.AddRole(roleToAdd);

            var roleToReturn = _mapper.Map<RoleForListDto>(createdRole);

            return CreatedAtRoute("GetRole", new {controller = "Roles", id= createdRole.Id},roleToReturn);
        }

        [HttpDelete("{id}", Name="DeleteRole")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var roleToDelete = await _repo.GetRole(id);
            if (roleToDelete == null)
                return NotFound();

            if (await _repo.Delete(roleToDelete))
                return Ok();
            
            throw new Exception($"Role {id} failed on Delete");
        }
    }
}