using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.LocationRouting.Domain.Model.Commands;

namespace RepairLink_Backend.LocationRouting.Domain.Services;

public interface IAddressesCommandService
{
    Task<Addresses?> Handle(CreateAddressesCommand command);
    
}