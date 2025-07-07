using RepairLink_Backend.Payment.Domain.Model.Queries;
using RepairLink_Backend.Payment.Domain.Repositories;
using RepairLink_Backend.Payment.Domain.Services;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;

namespace RepairLink_Backend.Payment.Application.Internal.QueryServices;

public class PaymentQueryService(IPaymentRepository paymentRepository) 
    : IPaymentQueryService
{
    public async Task<IEnumerable<Domain.Model.Aggregates.Payment>> Handle(GetAllPaymentByNoParamQuery query)
    {
        return await paymentRepository.FindByNoParam();
    }

    public async Task<Domain.Model.Aggregates.Payment?> Handle(GetPaymentByBookingIdPaymentMethodAndStatusQuery query)
    {
        return await paymentRepository.FindByBookingIdPaymentMethodAndStatus(query.BookingId, query.PaymentMethod, query.Status);
    }

    public async Task<Domain.Model.Aggregates.Payment?> Handle(GetPaymentByIdQuery query)
    {
        return await paymentRepository.FindByIdAsync(query.Id);
    }

}