using RepairLink_Backend.ServiceCatalog.Domain.Model.Aggregates;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Queries;
using RepairLink_Backend.ServiceCatalog.Domain.Repositories;
using RepairLink_Backend.ServiceCatalog.Domain.Services;

namespace RepairLink_Backend.ServiceCatalog.Application.Internal.QueryServices;

public class ServicesQueryService(IServicesRepository servicesRepository) 
    :IServicesQueryService
{
    public async Task<IEnumerable<Services>> Handle(GetAllServicesQuery query)
    {
        return await servicesRepository.FindByNoParamAsync();
    }

    public async Task<Services?> Handle(GetServiceByNameQuery query)
    {
        return await servicesRepository.FindByNameAsync(query.name);
    }
    
    public async Task<Services?> Handle(GetServiceByIdQuery query)
    {
        return await servicesRepository.FindByIdAsync(query.Id);
    }
    
}