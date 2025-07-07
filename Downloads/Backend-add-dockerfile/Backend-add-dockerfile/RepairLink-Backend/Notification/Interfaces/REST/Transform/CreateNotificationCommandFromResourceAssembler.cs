using RepairLink_Backend.Notification.Domain.Model.Commands;
using RepairLink_Backend.Notification.Interfaces.REST.Resources;

namespace RepairLink_Backend.Notification.Interfaces.REST.Transform;

public static class CreateNotificationCommandFromResourceAssembler
{
    public static CreateNotificationCommand ToCommandFromResource(CreateNotificationResource resource)
    {
        return new CreateNotificationCommand(resource.recipientId, resource.message, resource.type, resource.status);
    }
}