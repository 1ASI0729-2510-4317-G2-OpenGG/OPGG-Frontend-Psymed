using System.ComponentModel.DataAnnotations.Schema;
using EntityFrameworkCore.CreatedUpdatedDate.Contracts;

namespace RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

public partial class Users : IEntityWithCreatedUpdatedDate
{
    [Column(name:"CreatedAt")] public DateTimeOffset? CreatedDate { get; set; }
    [Column(name:"UpdatedAt")] public DateTimeOffset? UpdatedDate { get; set; }
}
