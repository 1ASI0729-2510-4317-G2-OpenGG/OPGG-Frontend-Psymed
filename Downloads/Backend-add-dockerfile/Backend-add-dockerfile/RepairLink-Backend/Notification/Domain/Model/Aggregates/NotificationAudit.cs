using System.ComponentModel.DataAnnotations.Schema;

namespace RepairLink_Backend.Notification.Domain.Model.Aggregates;

public partial class NotificationAudit
{
    [Column("CreatedAt")] public DateTimeOffset? CreatedDate {get;set;}
    [Column("UpdatedAt")] public DateTimeOffset? UpdateDate {get;set;}
}