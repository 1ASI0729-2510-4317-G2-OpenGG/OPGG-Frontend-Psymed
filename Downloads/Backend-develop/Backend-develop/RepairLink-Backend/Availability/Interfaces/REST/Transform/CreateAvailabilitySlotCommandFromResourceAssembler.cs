using RepairLink_Backend.Availability.Domain.Model.Commands;
using RepairLink_Backend.Availability.Interfaces.REST.Resources;

namespace RepairLink_Backend.Availability.Interfaces.REST.Transform;

public static class CreateAvailabilitySlotCommandFromResourceAssembler
{
    public static CreateAvailabilitySlotCommand ToCommandFromResource(CreateAvailabilitySlotResource resource)
    {
        return new CreateAvailabilitySlotCommand(resource.TechnicianId, resource.StartTime, resource.EndTime, resource.IsRecurring);
    }
}