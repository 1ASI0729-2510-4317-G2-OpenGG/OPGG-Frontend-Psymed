using System.Runtime.Intrinsics.X86;
using RepairLink_Backend.Booking.Domain.Model.Commands;
using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Aggregates;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

namespace RepairLink_Backend.Booking.Domain.Model.Aggregates;

public partial class Booking
{
    protected Booking()
    {
        CustomerId = 0;
        TechnicianId = 0;
        ServiceId = 0;
        AddressId = 0;
        ScheduledTime = string.Empty;
        Status = string.Empty;
    }

    public Booking(CreateBookingsCommand command)
    {
        CustomerId = command.CustomerId;
        TechnicianId = command.TechnicianId;
        ServiceId = command.ServiceId;
        AddressId = command.AddressId;
        ScheduledTime = command.ScheduledTime;
        Status = command.Status;
    }
    
    public int Id { get; }
    public int CustomerId { get; private set; }
    public int TechnicianId { get; private set; }
    public int ServiceId { get; private set; }
    public int AddressId { get; private set; }
    public string Status { get; private set; }
    public string ScheduledTime { get; private set; }
    
    //Navigation Property
    public virtual Users Customer { get; private set; } = null!;
    public virtual Users Technician { get; private set; } = null!;
    public virtual ServiceCatalog.Domain.Model.Aggregates.Services Service { get; private set; } = null!;
    public virtual Addresses Address { get; private set; } = null!;
    public virtual Payment.Domain.Model.Aggregates.Payment Payment { get; private set; } = null!;
    
}