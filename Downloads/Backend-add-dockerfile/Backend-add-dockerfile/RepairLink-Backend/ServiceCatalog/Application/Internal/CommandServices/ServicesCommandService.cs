using RepairLink_Backend.LocationRouting.Domain.Model.Commands;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Aggregates;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Commands;
using RepairLink_Backend.ServiceCatalog.Domain.Repositories;
using RepairLink_Backend.ServiceCatalog.Domain.Services;
using RepairLink_Backend.Shared.Domain.Repositories;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;

namespace RepairLink_Backend.ServiceCatalog.Application.Internal.CommandServices;

public class ServicesCommandService(IServicesRepository servicesRepository, IUnitOfWork unitOfWork) 
    : IServicesCommandService
{
    public async Task<Services?> Handle(CreateServicesCommand command)
    {
        var service =
            await servicesRepository.FindByNameAsync(command.name);
        if (service != null)
            throw new Exception("Service already exists");
        service = new Services(command);
        try
        {
            await servicesRepository.AddAsync(service);
            await unitOfWork.CompleteAsync();

        }
        catch (Exception e)
        {
            return null;
        }

        return service;
    }
    
}