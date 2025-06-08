using RepairLink_Backend.LocationRouting.Domain.Model.Commands;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Commands;
using RepairLink_Backend.ServiceCatalog.Interfaces.REST.Resources;

namespace RepairLink_Backend.ServiceCatalog.Interfaces.REST.Transform;

public static class CreateServicesCommandFromResourceAssembler
{
    public static CreateServicesCommand ToCommandFromResource(CreateServicesResource resource)
    {
        return new CreateServicesCommand(resource.Name, resource.Description, resource.basePrice);
    }
    
}