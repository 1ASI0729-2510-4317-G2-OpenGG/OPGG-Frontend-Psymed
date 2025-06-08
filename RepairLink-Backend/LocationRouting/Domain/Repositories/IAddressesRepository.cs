using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.Shared.Domain.Repositories;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

namespace RepairLink_Backend.LocationRouting.Domain.Repositories;

public interface IAddressesRepository : IBaseRepository<Addresses>
{
    Task<IEnumerable<Addresses>> FindByCityAsync(string city);
    
    Task<Addresses?> FindByCityAndZipCodeAsync(string city, string zipCode);
    
}