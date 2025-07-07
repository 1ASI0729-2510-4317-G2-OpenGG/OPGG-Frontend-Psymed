using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.LocationRouting.Domain.Model.Commands;
using RepairLink_Backend.LocationRouting.Domain.Repositories;
using RepairLink_Backend.LocationRouting.Domain.Services;

namespace RepairLink_Backend.LocationRouting.Application.Internal.CommandServices;

public class AddressCommandService(IAddressesRepository addressesRepository) 
    : IAddressesCommandService
{

    public async Task<Addresses?> Handle(CreateAddressesCommand command)
    {
        var address=
            await addressesRepository.FindByCityAndZipCodeAsync(command.city, command.zipCode);
        if(address != null)
            throw new Exception("Address already exists");
        address = new Addresses(command);
        try
        {
            await addressesRepository.AddAsync(address);

        }
        catch (Exception e)
        {
            return null;
        }

        return address;
    }
    
}