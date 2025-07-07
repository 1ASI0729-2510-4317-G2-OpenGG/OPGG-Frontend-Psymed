using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Booking.Domain.Repositories;

public interface IBookingRepository : IBaseRepository<Model.Aggregates.Booking>
{
    Task<IEnumerable<Model.Aggregates.Booking>> FindByCustomerIdAsync(int customerId);
    
    Task<Model.Aggregates.Booking?> FindByCustomerIdTechnicianIdAndStatusAsync(int customerId, int technicianId ,string status);
}