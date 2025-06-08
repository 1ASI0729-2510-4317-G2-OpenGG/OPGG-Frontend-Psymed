using RepairLink_Backend.LocationRouting.Domain.Model.Queries;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Queries;

namespace RepairLink_Backend.ServiceCatalog.Domain.Services;

public interface IServicesQueryService
{
    Task<IEnumerable<Model.Aggregates.Services>> Handle(GetAllServicesQuery query);
    
    Task<Model.Aggregates.Services> Handle(GetServiceByNameQuery query);
    
    Task<Model.Aggregates.Services> Handle(GetServiceByIdQuery query);

}