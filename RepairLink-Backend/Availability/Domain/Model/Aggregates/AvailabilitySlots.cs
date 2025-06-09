using RepairLink_Backend.Availability.Domain.Model.Commands;

namespace RepairLink_Backend.Availability.Domain.Model.Aggregates;

public partial class AvailabilitySlots
{
    protected AvailabilitySlots()
    {
        TechnicianId = 0;
        StartTime = string.Empty;
        EndTime = string.Empty;
        IsRecurring = false;
    }

    public AvailabilitySlots(CreateAvailabilitySlotCommand command)
    {
        TechnicianId = command.TechnicianId;
        StartTime = command.StartTime;
        EndTime = command.EndTime;
        IsRecurring = command.IsRecurring;
    }
    
    public int Id { get; }
    public int TechnicianId { get; private set; }
    public string StartTime { get; private set; }
    public string EndTime { get; private set; }
    public bool IsRecurring { get; private set; }
    
    //Navigation Property
    public virtual ICollection<AvailabilityDays> AvailabilityDaysCollection { get; private set; } = new List<AvailabilityDays>();
    
}