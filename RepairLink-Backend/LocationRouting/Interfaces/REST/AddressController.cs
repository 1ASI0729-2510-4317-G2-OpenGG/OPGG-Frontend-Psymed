using System.ComponentModel;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.LocationRouting.Domain.Model.Commands;
using RepairLink_Backend.LocationRouting.Domain.Model.Queries;
using RepairLink_Backend.LocationRouting.Domain.Services;
using RepairLink_Backend.LocationRouting.Interfaces.REST.Resources;
using RepairLink_Backend.LocationRouting.Interfaces.REST.Transform;
using Swashbuckle.AspNetCore.Annotations;

namespace RepairLink_Backend.LocationRouting.Interfaces.REST;

[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Addresses")]
public class AddressController(
    IAddressesQueryService addressesQueryService,
    IAddressesCommandService addressesCommandService
    ) : ControllerBase
{
    [HttpPost]
    [SwaggerOperation(
        Summary = "Creates a Address",
        Description = "Creates a new Address",
        OperationId = "CreateAddress")]
    [SwaggerResponse(201, "The Address was created", typeof(Addresses))]
    [SwaggerResponse(400, "The address was not created")]
    public async Task<ActionResult> CreateAddress([FromBody] CreateAddressResource resource)
    {
        var createAddressesCommand =
            CreateAddressCommandFromResourceAssembler.ToCommandFromResource(resource);
        var result = await addressesCommandService.Handle(createAddressesCommand);
        if (result is null) return BadRequest();
        return CreatedAtAction(nameof(GetAddressId), new {id =result.id},
            AddressResourceFromEntityAssembler.ToResourceFromEntity(result));
    }

    [HttpGet]
    [SwaggerOperation(
        Summary = "Get Address by Id",
        Description = "Get Address by Id",
        OperationId = "GetAddressId")]
    [SwaggerResponse(200, "The Address was found", typeof(AddressResource))]
    public async Task<ActionResult> GetAddressId(int id)
    {
        var getAddressByIdQuery = new GetAddressesByIdQuery(id);
        var result = await addressesQueryService.Handle(getAddressByIdQuery);
        if (result is null) return NotFound();
        var resource = AddressResourceFromEntityAssembler.ToResourceFromEntity(result);
        return Ok(resource);
    }
    
}