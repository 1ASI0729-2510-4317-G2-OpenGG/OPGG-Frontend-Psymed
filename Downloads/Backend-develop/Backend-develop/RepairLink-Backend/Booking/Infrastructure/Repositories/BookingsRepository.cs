using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.Booking.Domain.Repositories;
using RepairLink_Backend.Booking.Domain.Services;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;

namespace RepairLink_Backend.Booking.Infrastructure.Repositories;

public class BookingsRepository(AppDbContext context) 
    : BaseRepository<Domain.Model.Aggregates.Booking>(context), IBookingRepository
{
    public async Task<IEnumerable<Domain.Model.Aggregates.Booking>> FindByCustomerIdAsync(int customerId)
    {
        return await Context.Set<Domain.Model.Aggregates.Booking>().Where(f => f.CustomerId == customerId)
            .ToListAsync();
    }

    public async Task<Domain.Model.Aggregates.Booking?> FindByCustomerIdTechnicianIdAndStatusAsync(int customerId,
        int technicianId, string status)
    {
        return await Context.Set<Domain.Model.Aggregates.Booking>().FirstOrDefaultAsync(f => f.CustomerId == customerId && f.TechnicianId == technicianId && f.Status == status);
    }
    
}