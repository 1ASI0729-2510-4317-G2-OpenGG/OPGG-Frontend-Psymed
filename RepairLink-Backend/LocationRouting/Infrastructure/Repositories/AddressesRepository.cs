using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.LocationRouting.Domain.Repositories;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;

namespace RepairLink_Backend.LocationRouting.Infrastructure.Repositories;

public class AddressesRepository(AppDbContext context) 
    : BaseRepository<Addresses>(context), IAddressesRepository
{
    public async Task<IEnumerable<Addresses>> FindByCityAsync(string city)
    {
        return await Context.Set<Addresses>().Where(f => f.city == city).ToListAsync();
    }


    public async Task<Addresses?> FindByCityAndZipCodeAsync(string city, string zipCode)
    {
        return await Context.Set<Addresses>().FirstOrDefaultAsync(f =>f.city  == city && f.zipCode == zipCode);
    }
}