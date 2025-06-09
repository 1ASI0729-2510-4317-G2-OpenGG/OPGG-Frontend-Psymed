using RepairLink_Backend.Booking.Domain.Model.Queries;

namespace RepairLink_Backend.Booking.Domain.Services;

public interface IBookingsQueryService
{
    Task<IEnumerable<Model.Aggregates.Booking>> Handle(GetAllBookingsByCustomerIdQuery query);
    
    Task<Model.Aggregates.Booking?> Handle(GetBookingsByCustomerIdTechnicianIdAndStatus query);
    
    Task<Model.Aggregates.Booking?> Handle(GetBookingsByIdQuery query);
}