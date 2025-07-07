using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Availability.Domain.Repositories;

public interface IAvailabilitySlotRepository : IBaseRepository<AvailabilitySlots>
{
    Task<IEnumerable<AvailabilitySlots>> FindByTechnicianId(int slotId);
    
    Task<AvailabilitySlots?> FindByTechnicianIdAndStartTimeAndEndTime(int slotId, string startTime, string endTime);
    
}