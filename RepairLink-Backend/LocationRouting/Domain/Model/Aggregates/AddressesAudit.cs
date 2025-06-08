using System.ComponentModel.DataAnnotations.Schema;
using EntityFrameworkCore.CreatedUpdatedDate.Contracts;

namespace RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;

public partial class AddressesAudit: IEntityWithCreatedUpdatedDate
{
    [Column(name:"CreatedAt")] public DateTimeOffset? CreatedDate { get; set; }
    [Column(name:"UpdatedAt")] public DateTimeOffset? UpdatedDate { get; set; }
}