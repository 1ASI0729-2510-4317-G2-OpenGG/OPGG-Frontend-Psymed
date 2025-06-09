using RepairLink_Backend.Payment.Domain.Model.Commands;
using RepairLink_Backend.Payment.Domain.Model.Queries;

namespace RepairLink_Backend.Payment.Domain.Services;

public interface IPaymentQueryService
{
    Task<IEnumerable<Model.Aggregates.Payment>> Handle(GetAllPaymentByNoParamQuery query);
    
    Task<Model.Aggregates.Payment?> Handle(GetPaymentByBookingIdPaymentMethodAndStatusQuery query);

    Task<Model.Aggregates.Payment?> Handle(GetPaymentByIdQuery query);
}