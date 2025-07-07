using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Model.Commands;
using RepairLink_Backend.Availability.Domain.Repositories;
using RepairLink_Backend.Availability.Domain.Services;
using RepairLink_Backend.Availability.Interfaces.REST.Resources;
using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Availability.Application.Internal.CommandServices;

public class AvailabilityDayCommandService(IAvailabilityDayRepository availabilityDayRepository, IUnitOfWork unitOfWork) 
    : IAvailabilityDayCommandService
{
    public async Task<AvailabilityDays?> Handle(CreateAvailabilityDayCommand command)
    {
        var availabilityDay =
            await availabilityDayRepository.FindBySlotIdAndDayOfWeekAsync(command.SlotId, command.DayOfWeek);
        if (availabilityDay != null)
            throw new Exception("Day already exists");
        availabilityDay = new AvailabilityDays(command);
        try
        {
            await availabilityDayRepository.AddAsync(availabilityDay);
            await unitOfWork.CompleteAsync();

        }
        catch (Exception e)
        {
            return null;
        }

        return availabilityDay;
    }
}