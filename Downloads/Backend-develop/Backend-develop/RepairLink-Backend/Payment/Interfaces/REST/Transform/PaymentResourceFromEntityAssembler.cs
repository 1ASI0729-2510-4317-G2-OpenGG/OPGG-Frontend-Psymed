using RepairLink_Backend.Payment.Interfaces.REST.Resources;

namespace RepairLink_Backend.Payment.Interfaces.REST.Transform;

public class PaymentResourceFromEntityAssembler
{
    public static PaymentResource ToResourceFromEntity(Domain.Model.Aggregates.Payment entity)
    {
        return new PaymentResource(entity.Id, entity.BookingId, entity.Amount, entity.PaymentMethod, entity.Status);
    }
}