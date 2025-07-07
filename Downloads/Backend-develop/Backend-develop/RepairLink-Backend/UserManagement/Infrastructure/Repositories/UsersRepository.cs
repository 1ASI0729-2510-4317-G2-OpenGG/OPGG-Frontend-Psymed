using System.Collections;
using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;
using RepairLink_Backend.UserManagement.Domain.Repositories;
using RepairLink_Backend.UserManagement.Domain.Services;

namespace RepairLink_Backend.UserManagement.Infrastructure.Repositories;

public class UsersRepository(AppDbContext context) 
    : BaseRepository<Users>(context), IUsersRepository
{
    public async Task<IEnumerable<Users>> FindByRoleAsync(string role)
    {
        return await Context.Set<Users>().Where(f => f.role == role).ToListAsync();
    }

    public async Task<Users?> FindByEmailAndRoleAsync(string email, string role)
    {
        return await Context.Set<Users>().FirstOrDefaultAsync(f => f.email == email && f.role == role);
    }
}