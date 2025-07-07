namespace RepairLink_Backend.Booking.Domain.Model.Queries;

public record GetBookingsByCustomerIdTechnicianIdAndStatus(int CustomerId, int TechnicianId, string Status);