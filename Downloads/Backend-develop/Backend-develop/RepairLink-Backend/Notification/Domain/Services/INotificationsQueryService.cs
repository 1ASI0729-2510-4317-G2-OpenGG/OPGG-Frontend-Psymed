using RepairLink_Backend.Notification.Domain.Model.Queries;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Queries;

namespace RepairLink_Backend.Notification.Domain.Services;

public interface INotificationsQueryService
{
    Task<IEnumerable<Model.Aggregates.Notification>> Handle(GetAllNotificationsByRecipientIdQuery query);
    Task<Model.Aggregates.Notification?> Handle(GetNotificationsByIdQuery query);
    
}