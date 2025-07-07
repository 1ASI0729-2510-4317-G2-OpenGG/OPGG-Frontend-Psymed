using RepairLink_Backend.LocationRouting.Domain.Model.Commands;
using RepairLink_Backend.LocationRouting.Interfaces.REST.Resources;

namespace RepairLink_Backend.LocationRouting.Interfaces.REST.Transform;

public static class CreateAddressCommandFromResourceAssembler
{
    public static CreateAddressesCommand ToCommandFromResource(CreateAddressResource resource)
    {
        return new CreateAddressesCommand(resource.street, resource.city, resource.zipCode, resource.lat, resource.lng);
    }
    
}