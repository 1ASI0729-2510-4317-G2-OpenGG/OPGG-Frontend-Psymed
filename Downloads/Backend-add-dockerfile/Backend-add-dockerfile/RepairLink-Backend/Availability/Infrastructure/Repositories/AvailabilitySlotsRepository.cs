using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Repositories;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;

namespace RepairLink_Backend.Availability.Infrastructure.Repositories;

public class AvailabilitySlotsRepository(AppDbContext context) 
    : BaseRepository<AvailabilitySlots>(context), IAvailabilitySlotRepository
{
    public async Task<IEnumerable<AvailabilitySlots>> FindByTechnicianId(int technicianId)
    {
        return await Context.Set<AvailabilitySlots>().Where(f => f.TechnicianId == technicianId).ToListAsync();
    }

    public async Task<AvailabilitySlots?> FindByTechnicianIdAndStartTimeAndEndTime(int technicianId, string startTime,
        string endTime)
    {
        return await Context.Set<AvailabilitySlots>().FirstOrDefaultAsync(f => f.TechnicianId == technicianId && f.StartTime == startTime && f.EndTime == endTime);
    }

}