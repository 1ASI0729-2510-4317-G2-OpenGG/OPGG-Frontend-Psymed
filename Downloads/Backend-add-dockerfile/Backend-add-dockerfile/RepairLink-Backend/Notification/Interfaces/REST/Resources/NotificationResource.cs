namespace RepairLink_Backend.Notification.Interfaces.REST.Resources;

public record NotificationResource(int Id, int RecipientId, string Message, string Type, string Status);