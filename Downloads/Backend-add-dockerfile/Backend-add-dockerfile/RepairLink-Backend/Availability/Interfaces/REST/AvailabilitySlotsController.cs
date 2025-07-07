using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using RepairLink_Backend.Availability.Domain.Model.Queries;
using RepairLink_Backend.Availability.Domain.Services;
using RepairLink_Backend.Availability.Interfaces.REST.Resources;
using RepairLink_Backend.Availability.Interfaces.REST.Transform;
using Swashbuckle.AspNetCore.Annotations;

namespace RepairLink_Backend.Availability.Interfaces.REST;


[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Availability Slots")]
public class AvailabilitySlotsController(
    IAvailabilitySlotQueryService availabilitySlotQueryService,
    IAvailabilitySlotCommandService availabilitySlotCommandService
    ) : ControllerBase
{
    [HttpPost]
    [SwaggerOperation(
        Summary = "Creates a Availability Slot",
        Description = "Creates a Availability Slot",
        OperationId = "CreteAvailabilitySlot")]
    [SwaggerResponse(201, "The Availability Slot was created", typeof(AvailabilitySlotResource))]
    [SwaggerResponse(404, "The Availability Slot was not created")]
    public async Task<ActionResult> CreateAvailabilitySlot([FromBody] CreateAvailabilitySlotResource resource)
    {
        var createAvailabilitySlotCommand =
            CreateAvailabilitySlotCommandFromResourceAssembler.ToCommandFromResource(resource);
        var result = await availabilitySlotCommandService.Handle(createAvailabilitySlotCommand);
        if (result is null) return BadRequest();
        return CreatedAtAction(nameof(GetAvailabilitySlotId), new { id = result.Id },
            AvailabilitySlotResourceFromEntityAssembler.ToResourceFromEntity(result));
    }

    [HttpGet]
    [SwaggerOperation(
        Summary = "Gets a Availability Slot by Id",
        Description = "Get a Availability Slot by Id",
        OperationId = "GetAvailabilitySlotId")]
    [SwaggerResponse(200, "The Availability Slot was found", typeof(AvailabilitySlotResource))]
    public async Task<ActionResult> GetAvailabilitySlotId(int id)
    {
        var getAvailabilitySlotByIdQuery = new GetAvailabilitySlotByIdQuery(id);
        var result = await availabilitySlotQueryService.Handle(getAvailabilitySlotByIdQuery);
        if (result is null) return NotFound();
        var resource = AvailabilitySlotResourceFromEntityAssembler.ToResourceFromEntity(result);
        return Ok(resource);
    }
    
}