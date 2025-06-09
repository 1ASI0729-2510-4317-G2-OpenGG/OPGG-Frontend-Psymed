using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Model.Queries;

namespace RepairLink_Backend.Availability.Domain.Services;

public interface IAvailabilityDayQueryService
{
    Task<IEnumerable<AvailabilityDays>> Handle(GetAllAvailabilityDaysBySlotIdQuery query);

    Task<AvailabilityDays?> Handle(GetAvailabilityDayBySlotIdAndDayOfWeekQuery query);
    
    Task<AvailabilityDays?> Handle(GetAvailabilityDayByIdQueryQuery queryQuery);

}