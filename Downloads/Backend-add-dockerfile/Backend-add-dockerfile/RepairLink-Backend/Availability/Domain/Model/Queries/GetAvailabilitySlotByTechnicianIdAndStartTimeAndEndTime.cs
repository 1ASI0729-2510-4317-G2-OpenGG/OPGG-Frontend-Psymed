namespace RepairLink_Backend.Availability.Domain.Model.Queries;

public record GetAvailabilitySlotByTechnicianIdAndStartTimeAndEndTime(int TechnicianId, string StartTime, string EndTime);