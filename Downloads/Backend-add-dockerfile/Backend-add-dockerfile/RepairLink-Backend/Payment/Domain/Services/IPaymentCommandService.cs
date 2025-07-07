using RepairLink_Backend.Payment.Domain.Model.Commands;

namespace RepairLink_Backend.Payment.Domain.Services;

public interface IPaymentCommandService
{
    Task<Model.Aggregates.Payment?> Handle(CreatePaymentCommand command);
}