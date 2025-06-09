using RepairLink_Backend.Booking.Domain.Model.Commands;

namespace RepairLink_Backend.Booking.Domain.Services;

public interface IBookingsCommandService
{
    
    Task<Model.Aggregates.Booking?> Handle(CreateBookingsCommand command);
}