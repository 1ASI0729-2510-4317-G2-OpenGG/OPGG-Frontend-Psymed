using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Payment.Domain.Repositories;

public interface IPaymentRepository : IBaseRepository<Model.Aggregates.Payment>
{
    Task<IEnumerable<Model.Aggregates.Payment>> FindByNoParam();
    
    Task<Model.Aggregates.Payment?> FindByBookingIdPaymentMethodAndStatus(int bookingId, string paymentMethod, string status); 

}