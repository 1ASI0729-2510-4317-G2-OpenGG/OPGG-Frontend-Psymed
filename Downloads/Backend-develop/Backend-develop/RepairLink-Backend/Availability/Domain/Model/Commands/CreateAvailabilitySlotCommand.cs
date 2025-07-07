namespace RepairLink_Backend.Availability.Domain.Model.Commands;

public record CreateAvailabilitySlotCommand(int TechnicianId, string StartTime, string EndTime, bool IsRecurring);