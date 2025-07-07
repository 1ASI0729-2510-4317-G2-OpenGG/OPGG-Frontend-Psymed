using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.LocationRouting.Domain.Model.Queries;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

namespace RepairLink_Backend.LocationRouting.Domain.Services;

public interface IAddressesQueryService
{
    Task<IEnumerable<Addresses>> Handle(GetAllAddressesByCityQuery query);
    
    Task<Addresses?> Handle(GetAddressesByCityAndZipCodeQuery query);
    
    Task<Addresses?> Handle(GetAddressesByIdQuery query);
}