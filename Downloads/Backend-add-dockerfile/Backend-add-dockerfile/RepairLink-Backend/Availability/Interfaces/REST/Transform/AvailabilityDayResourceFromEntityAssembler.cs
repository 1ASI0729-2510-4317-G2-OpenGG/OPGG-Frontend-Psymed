using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Interfaces.REST.Resources;

namespace RepairLink_Backend.Availability.Interfaces.REST.Transform;

public static class AvailabilityDayResourceFromEntityAssembler
{
    public static AvailabilityDayResource ToResourceFromEntity(AvailabilityDays entity)
    {
        return new AvailabilityDayResource(entity.Id,entity.SlotId, entity.DayOfWeek);
    }
    
}