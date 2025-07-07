using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Model.Queries;

namespace RepairLink_Backend.Availability.Domain.Services;

public interface IAvailabilitySlotQueryService
{
    Task<IEnumerable<AvailabilitySlots>> Handle(GetAllAvailabilitySlotsByTechnicianIdQuery query);
    
    Task<AvailabilitySlots?> Handle(GetAvailabilitySlotByTechnicianIdAndStartTimeAndEndTime query);
    
    Task<AvailabilitySlots?> Handle(GetAvailabilitySlotByIdQuery query);
}