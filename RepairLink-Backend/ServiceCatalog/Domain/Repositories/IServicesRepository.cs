using RepairLink_Backend.ServiceCatalog.Domain.Model.Aggregates;
using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.ServiceCatalog.Domain.Repositories;

public interface IServicesRepository : IBaseRepository<Model.Aggregates.Services>
{
    Task<IEnumerable<Model.Aggregates.Services>> FindByNoParam();
    
    Task<Model.Aggregates.Services?> FindByName(string name);

}