namespace RepairLink_Backend.Availability.Domain.Model.Commands;

public record CreateAvailabilityDayCommand(int SlotId, string DayOfWeek);