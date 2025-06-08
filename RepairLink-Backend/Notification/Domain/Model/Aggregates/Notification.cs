using RepairLink_Backend.Notification.Domain.Model.Commands;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

namespace RepairLink_Backend.Notification.Domain.Model.Aggregates;

public partial class Notification
{
    protected Notification()
    {
        recipient_id = 0;
        message = string.Empty;
        type = string.Empty;
        status = string.Empty;
    }

    public Notification(CreateNotificationCommand command)
    {
        recipient_id = command.recipient_id;
        message = command.message;
        type = command.type;
        status = command.status;
    }
    
    public int Id { get; }
    public int recipient_id { get;  private set; }
    public string message { get; private set; }
    public string type { get; private set; }
    public string status { get; private set; }
    
    //Navigation Property
    public virtual Users Users { get; private set; } = null!;
    
}