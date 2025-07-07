using Microsoft.VisualBasic.CompilerServices;

namespace RepairLink_Backend.Notification.Domain.Model.Commands;

public record CreateNotificationCommand(int recipient_id, string message, string type, string status );