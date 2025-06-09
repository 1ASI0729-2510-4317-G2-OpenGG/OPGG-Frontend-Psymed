namespace RepairLink_Backend.Payment.Domain.Model.Commands;

public record CreatePaymentCommand(int BookingId, double Amount, string PaymentMethod, string Status);