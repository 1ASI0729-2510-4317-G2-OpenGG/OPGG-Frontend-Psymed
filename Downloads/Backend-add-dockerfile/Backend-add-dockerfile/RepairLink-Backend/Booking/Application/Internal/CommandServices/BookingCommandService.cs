using RepairLink_Backend.Booking.Domain.Model.Commands;
using RepairLink_Backend.Booking.Domain.Repositories;
using RepairLink_Backend.Booking.Domain.Services;
using RepairLink_Backend.Payment.Domain.Model.Commands;
using RepairLink_Backend.Payment.Domain.Repositories;
using RepairLink_Backend.Payment.Domain.Services;
using RepairLink_Backend.Shared.Domain.Repositories;

namespace RepairLink_Backend.Booking.Application.Internal.CommandServices;

public class BookingCommandService(IBookingRepository bookingRepository, IUnitOfWork unitOfWork) 
    : IBookingsCommandService
{
    public async Task<Domain.Model.Aggregates.Booking?> Handle(CreateBookingsCommand command)
    {
        var payment =
            await bookingRepository.FindByCustomerIdTechnicianIdAndStatusAsync(command.CustomerId, command.TechnicianId,
                command.Status);
        if (payment != null)
            throw new Exception("Booking already exists");
        payment = new Domain.Model.Aggregates.Booking(command);
        try
        {
            await bookingRepository.AddAsync(payment);
            await unitOfWork.CompleteAsync();
        }
        catch (Exception e)
        {
            return null;
        }

        return payment;
    }
    
}