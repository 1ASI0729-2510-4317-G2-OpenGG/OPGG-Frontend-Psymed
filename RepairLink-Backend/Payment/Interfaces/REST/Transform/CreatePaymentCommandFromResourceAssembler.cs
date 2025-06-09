using RepairLink_Backend.Payment.Domain.Model.Commands;
using RepairLink_Backend.Payment.Interfaces.REST.Resources;

namespace RepairLink_Backend.Payment.Interfaces.REST.Transform;

public static class CreatePaymentCommandFromResourceAssembler
{
    public static CreatePaymentCommand ToCommandFromResource(CreatePaymentResource resource)
    {
        return new CreatePaymentCommand(resource.BookingId, resource.Amount, resource.PaymentMethod, resource.Status);
    }
}