namespace RepairLink_Backend.Availability.Interfaces.REST.Resources;

public record AvailabilitySlotResource(int Id, int TechnicianId, string StartTime, string EndTime, bool IsRecurring);