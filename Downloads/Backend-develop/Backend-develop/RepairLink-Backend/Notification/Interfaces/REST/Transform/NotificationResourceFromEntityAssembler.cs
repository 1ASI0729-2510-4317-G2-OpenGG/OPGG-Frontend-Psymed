using RepairLink_Backend.Notification.Interfaces.REST.Resources;

namespace RepairLink_Backend.Notification.Interfaces.REST.Transform;

public static class NotificationResourceFromEntityAssembler
{
    public static NotificationResource ToResourceFromEntity(Domain.Model.Aggregates.Notification entity)
    {
        return new NotificationResource(entity.Id, entity.recipient_id, entity.message, entity.type, entity.status);
    }
}