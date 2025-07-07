namespace RepairLink_Backend.Payment.Interfaces.REST.Resources;

public record PaymentResource(int Id, int BookingId, double Amount, string PaymentMethod, string Status);