using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Repositories;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;

namespace RepairLink_Backend.Availability.Infrastructure.Repositories;

public class AvailabilityRepository(AppDbContext context) 
    :BaseRepository<AvailabilityDays>(context), IAvailabilityDayRepository
{
    public async Task<IEnumerable<AvailabilityDays>> FindBySlotIdAsync(int slotId)
    {
        return await Context.Set<AvailabilityDays>().Where(f => f.SlotId == slotId).ToListAsync();
    }


    public async Task<AvailabilityDays?> FindBySlotIdAndDayOfWeekAsync(int slotId, string dayOfWeek)
    {
        return await Context.Set<AvailabilityDays>().FirstOrDefaultAsync(f => f.SlotId == slotId && f.DayOfWeek == dayOfWeek);
    }

}