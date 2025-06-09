using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Model.Commands;

namespace RepairLink_Backend.Availability.Domain.Services;

public interface IAvailabilityDayCommandService
{
    Task<AvailabilityDays?> Handle(CreateAvailabilityDayCommand command);
    
}