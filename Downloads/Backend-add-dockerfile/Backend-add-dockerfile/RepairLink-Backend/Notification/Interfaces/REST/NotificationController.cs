using System.ComponentModel;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using RepairLink_Backend.Notification.Domain.Model.Queries;
using RepairLink_Backend.Notification.Domain.Services;
using RepairLink_Backend.Notification.Interfaces.REST.Resources;
using RepairLink_Backend.Notification.Interfaces.REST.Transform;
using Swashbuckle.AspNetCore.Annotations;

namespace RepairLink_Backend.Notification.Interfaces.REST;

[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Notification")]
public class NotificationController(
    INotificationsQueryService notificationsQueryService,
    INotificationCommandService notificationCommandService
    ): ControllerBase
{
    [HttpPost]
    [SwaggerOperation(
        Summary = "Creates a notification",
        Description = "Creates a notification",
        OperationId = "CreateNotification")]
    [SwaggerResponse(201, "The notification was created")]
    [SwaggerResponse(400, "The notification was not created")]
    public async Task<ActionResult> CreateNotification([FromBody] CreateNotificationResource resource)
    {
        var createNotificationCommand =
            CreateNotificationCommandFromResourceAssembler.ToCommandFromResource(resource);
        var result = await notificationCommandService.Handle(createNotificationCommand);
        if (result is null) return BadRequest();
        return CreatedAtAction(nameof(GetNotificationId), new {id = result.Id },
            NotificationResourceFromEntityAssembler.ToResourceFromEntity(result));
    }

    [HttpGet]
    [SwaggerOperation(
        Summary = "Gets a notification by Id",
        Description = "Gets a notification by Id",
        OperationId = "GetNotificationId")]
    [SwaggerResponse(200, "The notification was found")]
    [SwaggerResponse(400, "The notification was not found")]
    public async Task<ActionResult> GetNotificationId(int id)
    {
        var getNotificationByIdQuery = new GetNotificationsByIdQuery(id);
        var result = await notificationsQueryService.Handle(getNotificationByIdQuery);
        if (result is null) return NotFound();
        var resource = NotificationResourceFromEntityAssembler.ToResourceFromEntity(result);
        return Ok(resource);
    }
}