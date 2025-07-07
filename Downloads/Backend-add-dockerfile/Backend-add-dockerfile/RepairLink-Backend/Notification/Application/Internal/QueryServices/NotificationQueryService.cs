using RepairLink_Backend.Notification.Domain.Model.Queries;
using RepairLink_Backend.Notification.Domain.Repositories;
using RepairLink_Backend.Notification.Domain.Services;
using RepairLink_Backend.Notification.Interfaces.REST.Resources;

namespace RepairLink_Backend.Notification.Application.Internal.QueryServices;

public class NotificationQueryService(INotificationRepository notificationRepository)
    : INotificationsQueryService
{
    public async Task<IEnumerable<Domain.Model.Aggregates.Notification>> Handle(
        GetAllNotificationsByRecipientIdQuery query)
    {
        return await notificationRepository.FindByRecipientIdAsync(query.recipient_id);
    }

    public async Task<Domain.Model.Aggregates.Notification?> Handle(GetNotificationsByIdQuery query)
    {
        return await notificationRepository.FindByIdAsync(query.id);
    }

}