using Microsoft.AspNetCore.Identity;
using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Model.Queries;
using RepairLink_Backend.Availability.Domain.Repositories;
using RepairLink_Backend.Availability.Domain.Services;

namespace RepairLink_Backend.Availability.Application.Internal.QueryServices;

public class AvailabilityDayQueryService(IAvailabilityDayRepository availabilityDayRepository) 
    : IAvailabilityDayQueryService
{
    public async Task<IEnumerable<AvailabilityDays>> Handle(GetAllAvailabilityDaysBySlotIdQuery query)
    {
        return await availabilityDayRepository.FindBySlotIdAsync(query.SlotId);
    }

    public async Task<AvailabilityDays?> Handle(GetAvailabilityDayBySlotIdAndDayOfWeekQuery query)
    {
        return await availabilityDayRepository.FindBySlotIdAndDayOfWeekAsync(query.SlotId, query.DayOfWeek);
    }

    public async Task<AvailabilityDays?> Handle(GetAvailabilityDayByIdQueryQuery queryQuery)
    {
        return await availabilityDayRepository.FindByIdAsync(queryQuery.Id);
    }
}