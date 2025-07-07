using RepairLink_Backend.Payment.Domain.Model.Commands;

namespace RepairLink_Backend.Payment.Domain.Model.Aggregates;

public partial class Payment
{
    protected Payment()
    {
        BookingId = 0;
        Amount = 0;
        PaymentMethod = string.Empty;
        Status = string.Empty;
    }

    public Payment(CreatePaymentCommand command)
    {
        BookingId = command.BookingId;
        Amount = command.Amount;
        PaymentMethod = command.PaymentMethod;
        Status = command.Status;

    }

    public int Id { get; }
    public int BookingId { get; private set; }
    public double Amount { get; private set; }
    public string PaymentMethod { get; private set; }
    public string Status { get; private set; }
    
    //Navigation Parameter
    public virtual Booking.Domain.Model.Aggregates.Booking Booking { get; private set; } = null!;
}