namespace RepairLink_Backend.Payment.Domain.Model.Queries;

public record GetPaymentByBookingIdPaymentMethodAndStatusQuery(int BookingId, string PaymentMethod, string Status);