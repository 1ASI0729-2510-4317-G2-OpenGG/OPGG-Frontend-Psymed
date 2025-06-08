using RepairLink_Backend.ServiceCatalog.Domain.Model.Aggregates;
using RepairLink_Backend.ServiceCatalog.Interfaces.REST.Resources;

namespace RepairLink_Backend.ServiceCatalog.Interfaces.REST.Transform;

public class ServicesResourceFromEntityAssembler
{
    public static ServicesResource ToResourceFromEntity(Services entity)
    {
        return new ServicesResource(entity.Id, entity.name, entity.description, entity.baseprice);
    }
}