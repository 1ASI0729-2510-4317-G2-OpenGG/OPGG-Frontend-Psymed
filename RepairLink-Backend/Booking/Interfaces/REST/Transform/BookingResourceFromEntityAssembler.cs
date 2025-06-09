using RepairLink_Backend.Booking.Domain.Model.Commands;
using RepairLink_Backend.Booking.Interfaces.REST.Resources;

namespace RepairLink_Backend.Booking.Interfaces.REST.Transform;

public static class BookingResourceFromEntityAssembler
{
    public static BookingResource ToReourceFromEntity(Domain.Model.Aggregates.Booking entity)
    {
        return new BookingResource(entity.Id, entity.CustomerId, entity.TechnicianId, entity.ServiceId, entity.AddressId, entity.ScheduledTime, entity.Status);
    }

}