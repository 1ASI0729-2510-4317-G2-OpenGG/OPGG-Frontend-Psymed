namespace RepairLink_Backend.Booking.Interfaces.REST.Resources;

public record CreateBookingResource(int CustomerId, int TechnicianId, int ServiceId, int AddressId, string ScheduledTime, string Status);