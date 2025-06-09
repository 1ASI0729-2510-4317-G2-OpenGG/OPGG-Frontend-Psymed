using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Model.Queries;
using RepairLink_Backend.Availability.Domain.Services;
using RepairLink_Backend.Availability.Interfaces.REST.Resources;
using RepairLink_Backend.Availability.Interfaces.REST.Transform;
using Swashbuckle.AspNetCore.Annotations;

namespace RepairLink_Backend.Availability.Interfaces.REST;



[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Availability Days")]
public class AvailabilityDaysController(
    IAvailabilityDayQueryService availabilityDayQueryService,
    IAvailabilityDayCommandService availabilityDayCommandService
    ) : ControllerBase
{
    [HttpPost]
    [SwaggerOperation(
        Summary = "Creates a Availability Day",
        Description = "Creates a Availability Day",
        OperationId = "AvailabilityDays.Create")]
    [SwaggerResponse(201, "The Availability Day was created", typeof(AvailabilityDays))]
    [SwaggerResponse(400, "The Availability Day was not created")]
    public async Task<ActionResult> CreateAvailabilityDayResource([FromBody] CreateAvailabilityDayResource resource)
    {
        var createAvailabilityDaysCommand =
            CreateAvailabilityDayCommandFromResourceAssembler.ToCommandFromResource(resource);
        var result = await availabilityDayCommandService.Handle(createAvailabilityDaysCommand);
        if (result is null) return BadRequest();
        return CreatedAtAction(nameof(GetAvailabilityDayId), new { id = result.Id },
            AvailabilityDayResourceFromEntityAssembler.ToResourceFromEntity(result));
    }

    [HttpGet]
    [SwaggerOperation(
        Summary = "Gets a Availability Day by Id",
        Description = "Gets a Availability Day by Id",
        OperationId = "GetAvailabilityDayId"
    )]
    [SwaggerResponse(200, "The Availability Day was FOUND", typeof(AvailabilityDayResource))]
    public async Task<ActionResult> GetAvailabilityDayId(int id)
    {
        var getAvailabilityDayByIdQuery = new GetAvailabilityDayByIdQueryQuery(id);
        var result = await availabilityDayQueryService.Handle(getAvailabilityDayByIdQuery);
        if (result is null) return NotFound();
        var resource = AvailabilityDayResourceFromEntityAssembler.ToResourceFromEntity(result);
        return Ok(resource);
    }
}