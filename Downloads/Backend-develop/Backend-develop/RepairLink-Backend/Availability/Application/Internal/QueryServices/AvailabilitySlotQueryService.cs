using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Model.Queries;
using RepairLink_Backend.Availability.Domain.Repositories;
using RepairLink_Backend.Availability.Domain.Services;

namespace RepairLink_Backend.Availability.Application.Internal.QueryServices;

public class AvailabilitySlotQueryService(IAvailabilitySlotRepository availabilitySlotRepository) 
    : IAvailabilitySlotQueryService
{
    public async Task<IEnumerable<AvailabilitySlots>> Handle(GetAllAvailabilitySlotsByTechnicianIdQuery query)
    {
        return await availabilitySlotRepository.FindByTechnicianId(query.TechnicianId);
    }
    
    public async Task<AvailabilitySlots?> Handle(GetAvailabilitySlotByTechnicianIdAndStartTimeAndEndTime query)
    {
        return await availabilitySlotRepository.FindByTechnicianIdAndStartTimeAndEndTime(query.TechnicianId, query.StartTime, query.EndTime);
    }
    
    public async Task<AvailabilitySlots?> Handle(GetAvailabilitySlotByIdQuery query)
    {
        return await availabilitySlotRepository.FindByIdAsync(query.Id);
    }

   
}