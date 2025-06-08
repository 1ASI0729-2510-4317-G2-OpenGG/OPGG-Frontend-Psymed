using RepairLink_Backend.Notification.Domain.Model.Commands;
using RepairLink_Backend.Notification.Domain.Repositories;
using RepairLink_Backend.Notification.Domain.Services;
using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Notification.Application.Internal.CommandServices;

public class NotificationCommandService(INotificationRepository notificationRepository, IUnitOfWork unitOfWork)
    : INotificationCommandService
{
    public async Task<Domain.Model.Aggregates.Notification?> Handle(CreateNotificationCommand command)
    {
        var notification =
            await notificationRepository.FindByAllParams(command.recipient_id, command.message, command.type, command.status);
        if(notification != null)
            throw new Exception("Notification already exists");
        notification = new Domain.Model.Aggregates.Notification(command);
        try
        {
            await notificationRepository.AddAsync(notification);
            await unitOfWork.CompleteAsync();

        }
        catch (Exception e)
        {
            return null;
        }

        return notification;
    }
}