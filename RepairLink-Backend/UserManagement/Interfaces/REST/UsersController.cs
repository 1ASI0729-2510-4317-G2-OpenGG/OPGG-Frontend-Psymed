using System.ComponentModel;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using RepairLink_Backend.UserManagement.Domain.Model.Queries;
using RepairLink_Backend.UserManagement.Domain.Services;
using RepairLink_Backend.UserManagement.Interfaces.REST.Resources;
using RepairLink_Backend.UserManagement.Interfaces.REST.Transform;
using Swashbuckle.AspNetCore.Annotations;

namespace RepairLink_Backend.UserManagement.Interfaces.REST;
[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Users")]
public class UsersController(
    IUsersQueryService usersQueryService,
    IUsersCommandService usersCommandService
    ) : ControllerBase
{
    [HttpPost]
    [SwaggerOperation(
        Summary = "Creates a User",
        Description = "Creares a User",
        OperationId = "CreateUser")]
    [SwaggerResponse(201, "The User was created", typeof(UsersResource))]
    [SwaggerResponse(400, "The User was not created", typeof(UsersResource))]
    public async Task<ActionResult> CreateUser([FromBody] CreateUsersResource resource)
    {
        var createUserCommand =
            CreateUsersCommandFromResourceAssembler.ToCommandFromResource(resource);
        var result = await usersCommandService.Handle(createUserCommand);
        if (result is null) return BadRequest();
        return CreatedAtAction(nameof(GetUserId), new { id = result.Id },
            UsersResourceFromEntityAssembler.ToResourceFromEntity(result));
    }

    [HttpGet]
    [SwaggerOperation(
        Summary = "Get User by Id",
        Description = "Gets a User by Id",
        OperationId = "GetUserById")
    ]
    public async Task<ActionResult> GetUserId(int id)
    {
        var getUserByIdQuery = new GetUsersByIdQuery(id);
        var result = await usersQueryService.Handle(getUserByIdQuery);
        if (result is null) return NotFound();
        var resource = UsersResourceFromEntityAssembler.ToResourceFromEntity(result);
        return Ok(resource);
    }
    
}