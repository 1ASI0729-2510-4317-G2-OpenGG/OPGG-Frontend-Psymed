using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.LocationRouting.Interfaces.REST.Resources;

namespace RepairLink_Backend.LocationRouting.Interfaces.REST.Transform;

public static class AddressResourceFromEntityAssembler
{
    public static AddressResource ToResourceFromEntity(Addresses entity)
    {
        return new AddressResource(entity.id, entity.street, entity.city, entity.zipCode, entity.lat, entity.lng);
    }
    
}