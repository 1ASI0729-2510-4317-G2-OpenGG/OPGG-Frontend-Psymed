using RepairLink_Backend.Availability.Domain.Model.Commands;
using RepairLink_Backend.Availability.Interfaces.REST.Resources;

namespace RepairLink_Backend.Availability.Interfaces.REST.Transform;

public static class CreateAvailabilityDayCommandFromResourceAssembler
{
    public static CreateAvailabilityDayCommand ToCommandFromResource(CreateAvailabilityDayResource resource)
    {
        return new CreateAvailabilityDayCommand(resource.SlotId, resource.DayOfWeek);
    }
}