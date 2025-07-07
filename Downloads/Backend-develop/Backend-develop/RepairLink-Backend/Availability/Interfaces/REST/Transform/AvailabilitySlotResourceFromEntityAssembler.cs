using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Interfaces.REST.Resources;

namespace RepairLink_Backend.Availability.Interfaces.REST.Transform;

public static class AvailabilitySlotResourceFromEntityAssembler
{
    public static AvailabilitySlotResource ToResourceFromEntity(AvailabilitySlots entity)
    {
        return new AvailabilitySlotResource(entity.Id, entity.TechnicianId, entity.StartTime, entity.EndTime, entity.IsRecurring);
    }
    
}