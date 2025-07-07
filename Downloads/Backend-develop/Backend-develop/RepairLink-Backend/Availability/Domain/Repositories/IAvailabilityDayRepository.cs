using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Availability.Domain.Repositories;

public interface IAvailabilityDayRepository : IBaseRepository<AvailabilityDays>
{
    Task<IEnumerable<AvailabilityDays>> FindBySlotIdAsync(int slotId);
    
    Task<AvailabilityDays?> FindBySlotIdAndDayOfWeekAsync(int slotId, string dayOfWeek);
    
}