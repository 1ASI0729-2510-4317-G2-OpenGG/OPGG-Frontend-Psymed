using RepairLink_Backend.Payment.Domain.Model.Commands;
using RepairLink_Backend.Payment.Domain.Repositories;
using RepairLink_Backend.Payment.Domain.Services;
using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Payment.Application.Internal.CommandServices;

public class PaymentCommandService(IPaymentRepository paymentRepository, IUnitOfWork unitOfWork) 
    :IPaymentCommandService
{
    public async Task<Domain.Model.Aggregates.Payment?> Handle(CreatePaymentCommand command)
    {
        var payment =
            await paymentRepository.FindByBookingIdPaymentMethodAndStatus(command.BookingId,command.PaymentMethod, command.Status);
        if(payment != null)
            throw new Exception("Payment already exists");
        payment = new Domain.Model.Aggregates.Payment(command);
        try
        {
            await paymentRepository.AddAsync(payment);
            await unitOfWork.CompleteAsync();

        }
        catch (Exception e)
        {
            return null;
        }

        return payment;
    }

}