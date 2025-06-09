namespace RepairLink_Backend.Availability.Domain.Model.Queries;

public record GetAvailabilityDayBySlotIdAndDayOfWeek(int SlotId, string DayOfWeek);