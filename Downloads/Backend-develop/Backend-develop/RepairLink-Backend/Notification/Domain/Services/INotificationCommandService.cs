using RepairLink_Backend.Notification.Domain.Model.Commands;

namespace RepairLink_Backend.Notification.Domain.Services;

public interface INotificationCommandService
{
    Task<Model.Aggregates.Notification?> Handle(CreateNotificationCommand command);
}