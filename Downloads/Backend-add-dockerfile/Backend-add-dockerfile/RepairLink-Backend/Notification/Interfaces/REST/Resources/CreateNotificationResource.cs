namespace RepairLink_Backend.Notification.Interfaces.REST.Resources;

public record CreateNotificationResource(int recipientId, string message, string type, string status);