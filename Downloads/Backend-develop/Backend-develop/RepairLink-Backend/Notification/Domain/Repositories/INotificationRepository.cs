using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Notification.Domain.Repositories;

public interface INotificationRepository : IBaseRepository<Model.Aggregates.Notification>
{
    Task<IEnumerable<Model.Aggregates.Notification>> FindByRecipientIdAsync(int recipientId);
    Task<Model.Aggregates.Notification?> FindByAllParams(int recipientId, string message, string type, string status);
}