using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.Availability.Domain.Model.Commands;
using RepairLink_Backend.Availability.Domain.Repositories;
using RepairLink_Backend.Availability.Domain.Services;
using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Availability.Application.Internal.CommandServices;

public class AvailabilitySlotCommandService(IAvailabilitySlotRepository availabilitySlotRepository, IUnitOfWork unitOfWork) 
    : IAvailabilitySlotCommandService
{
    public async Task<AvailabilitySlots?> Handle(CreateAvailabilitySlotCommand command)
    {
        var availabilitySlot =
            await availabilitySlotRepository.FindByTechnicianIdAndStartTimeAndEndTime(command.TechnicianId, command.StartTime, command.EndTime);
        if(availabilitySlot != null)
            throw new Exception("Availability slot already exists");
        availabilitySlot = new AvailabilitySlots(command);
        try
        {
            await availabilitySlotRepository.AddAsync(availabilitySlot);
            await unitOfWork.CompleteAsync();
            
        }
        catch (Exception e)
        {
            return null;
        }
        
        return availabilitySlot;
    }
}