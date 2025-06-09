namespace RepairLink_Backend.Availability.Domain.Model.Queries;

public record GetAvailabilityDayBySlotIdAndDayOfWeekQuery(int SlotId, string DayOfWeek);