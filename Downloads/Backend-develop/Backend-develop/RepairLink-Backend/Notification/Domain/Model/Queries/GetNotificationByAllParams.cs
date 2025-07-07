namespace RepairLink_Backend.Notification.Domain.Model.Queries;

public record GetNotificationByAllParams(int recipientId, string message, string type, string status);