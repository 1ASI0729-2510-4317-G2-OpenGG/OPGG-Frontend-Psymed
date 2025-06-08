using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Queries;
using RepairLink_Backend.ServiceCatalog.Domain.Repositories;
using RepairLink_Backend.ServiceCatalog.Domain.Services;
using RepairLink_Backend.ServiceCatalog.Interfaces.REST.Resources;
using RepairLink_Backend.ServiceCatalog.Interfaces.REST.Transform;
using Swashbuckle.AspNetCore.Annotations;

namespace RepairLink_Backend.ServiceCatalog.Interfaces.REST;

[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Services")]
public class ServicesController(
    IServicesQueryService serviceQueryService,
    IServicesCommandService serviceCommandService
    ) : ControllerBase
{
    [HttpPost]
    [SwaggerOperation(
        Summary = "Creates a Service",
        Description = "Creates a Service",
        OperationId = "CreateService")]
    [SwaggerResponse(201, "The service was created", typeof(ServicesResource))]
    [SwaggerResponse(400, "The service was not created")]
    public async Task<ActionResult> CreateServiceAsync([FromBody] CreateServicesResource resource)
    {
        var createServiceCommand =
            CreateServicesCommandFromResourceAssembler.ToCommandFromResource(resource);
        var result = await serviceCommandService.Handle(createServiceCommand);
        if(result is null) return BadRequest();
        return CreatedAtAction(nameof(GetServiceId), new { id = result.Id },
            ServicesResourceFromEntityAssembler.ToResourceFromEntity(result));
    }

    [HttpGet]
    [SwaggerOperation(Summary =
            "Gets a Service by Id",
        Description = "Gets a Service by Id",
        OperationId = "GetServiceId")]
    [SwaggerResponse(200, "The service was found", typeof(ServicesResource))]
    public async Task<IActionResult> GetServiceId(int id)
    {
        var getServiceByIdQuery = new GetServiceByIdQuery(id);
        var result = await serviceQueryService.Handle(getServiceByIdQuery);
        if(result is null) return NotFound();
        var resource = ServicesResourceFromEntityAssembler.ToResourceFromEntity(result);
        return Ok(resource);
    }
}