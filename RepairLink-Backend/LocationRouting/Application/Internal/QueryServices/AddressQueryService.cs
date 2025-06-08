using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.LocationRouting.Domain.Model.Queries;
using RepairLink_Backend.LocationRouting.Domain.Repositories;
using RepairLink_Backend.LocationRouting.Domain.Services;

namespace RepairLink_Backend.LocationRouting.Application.Internal.QueryServices;

public class AddressQueryService(IAddressesRepository addressesRepository) 
    : IAddressesQueryService
{
    public async Task<IEnumerable<Addresses>> Handle(GetAllAddressesByCityQuery query)
    {
        return await addressesRepository.FindByCityAsync(query.city);
    }

    public async Task<Addresses?> Handle(GetAddressesByCityAndZipCodeQuery query)
    {
        return await addressesRepository.FindByCityAndZipCodeAsync(query.city, query.zipCode);
    }

    public async Task<Addresses?> Handle(GetAddressesByIdQuery query)
    {
        return await addressesRepository.FindByIdAsync(query.id);
    }

}