using RepairLink_Backend.Booking.Domain.Model.Commands;
using RepairLink_Backend.Booking.Interfaces.REST.Resources;

namespace RepairLink_Backend.Booking.Interfaces.REST.Transform;

public static class CreateBookingCommandFromResourceAssembler
{
    public static CreateBookingsCommand ToCommandFromResource(CreateBookingResource resource)
    {
        return new CreateBookingsCommand(resource.CustomerId, resource.TechnicianId, resource.ServiceId,
            resource.AddressId, resource.ScheduledTime, resource.Status);
    }
    
}