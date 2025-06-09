namespace RepairLink_Backend.Availability.Interfaces.REST.Resources;

public record CreateAvailabilitySlotResource(int TechnicianId, string StartTime, string EndTime, bool IsRecurring);