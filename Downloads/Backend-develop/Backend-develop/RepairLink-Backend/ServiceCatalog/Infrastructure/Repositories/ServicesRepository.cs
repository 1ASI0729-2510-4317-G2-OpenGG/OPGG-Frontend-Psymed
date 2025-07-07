using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Aggregates;
using RepairLink_Backend.ServiceCatalog.Domain.Repositories;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;

namespace RepairLink_Backend.ServiceCatalog.Infrastructure.Repositories;

public class ServicesRepository(AppDbContext context) 
    : BaseRepository<Services>(context), IServicesRepository
{
    public async Task<IEnumerable<Services>> FindByNoParamAsync()
    {
        return await Context.Set<Services>().ToListAsync();
    }

    public async Task<Services?> FindByNameAsync(string name)
    {
        return await Context.Set<Services>().FirstOrDefaultAsync(f => f.name == name);
    }
}