namespace RepairLink_Backend.Booking.Domain.Model.Commands;

public record CreateBookingsCommand(int CustomerId, int TechnicianId, int ServiceId, int AddressId, string ScheduledTime, string Status);