using RepairLink_Backend.Availability.Domain.Model.Commands;

namespace RepairLink_Backend.Availability.Domain.Model.Aggregates;

public partial class AvailabilityDays
{
    protected AvailabilityDays()
    {
        SlotId = 0;
        DayOfWeek = string.Empty; 
        
    }

    public AvailabilityDays(CreateAvailabilityDayCommand command)
    {
        SlotId = command.SlotId;
        DayOfWeek = command.DayOfWeek;

    }
    
    public int Id { get; }
    public int SlotId { get; private set;  }
    public string DayOfWeek { get; private set; }
    
    //Navigation Property
    public virtual AvailabilitySlots AvailabilitySlotsSlots { get; private set; } = null!;

}