using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.Payment.Domain.Repositories;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;

namespace RepairLink_Backend.Payment.Infrastructure.Repositories;

public class PaymentRepository(AppDbContext context) 
    : BaseRepository<Domain.Model.Aggregates.Payment>(context), IPaymentRepository
{
    public async Task<IEnumerable<Domain.Model.Aggregates.Payment>> FindByNoParam()
    {
        return await Context.Set<Domain.Model.Aggregates.Payment>().ToListAsync();
    }

    public async Task<Domain.Model.Aggregates.Payment?> FindByBookingIdPaymentMethodAndStatus(int bookingId ,string paymentMethod,
        string status)
    {
        return await Context.Set<Domain.Model.Aggregates.Payment>().FirstOrDefaultAsync(f => f.BookingId == bookingId && f.PaymentMethod == paymentMethod && f.Status == status);
    }
    
}