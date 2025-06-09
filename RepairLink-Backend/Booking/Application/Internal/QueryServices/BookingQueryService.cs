using RepairLink_Backend.Booking.Domain.Model.Queries;
using RepairLink_Backend.Booking.Domain.Repositories;
using RepairLink_Backend.Booking.Domain.Services;
using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.Payment.Domain.Model.Queries;
using RepairLink_Backend.Payment.Domain.Repositories;
using RepairLink_Backend.Payment.Domain.Services;

namespace RepairLink_Backend.Booking.Application.Internal.QueryServices;

public class BookingQueryService(IBookingRepository bookingRepository) 
    : IBookingsQueryService
{
    public async Task<IEnumerable<Domain.Model.Aggregates.Booking>> Handle(GetAllBookingsByCustomerIdQuery query)
    {
        return await bookingRepository.FindByCustomerIdAsync(query.CustomerId);
    }

    public async Task<Domain.Model.Aggregates.Booking?> Handle(
        GetBookingsByCustomerIdTechnicianIdAndStatus query)
    {
        return await bookingRepository.FindByCustomerIdTechnicianIdAndStatusAsync(query.CustomerId,query.TechnicianId, query.Status);
    }

    public async Task<Domain.Model.Aggregates.Booking?> Handle(GetBookingsByIdQuery query)
    {
        return await bookingRepository.FindByIdAsync(query.Id);
    }
    
}