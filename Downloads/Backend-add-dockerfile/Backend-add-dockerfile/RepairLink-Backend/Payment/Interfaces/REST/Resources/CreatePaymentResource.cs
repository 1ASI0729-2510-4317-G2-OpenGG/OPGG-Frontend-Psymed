namespace RepairLink_Backend.Payment.Interfaces.REST.Resources;

public record CreatePaymentResource(int BookingId, double Amount, string PaymentMethod, string Status);