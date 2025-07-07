using System.Collections;
using RepairLink_Backend.Shared.Domain.Repositories;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

namespace RepairLink_Backend.UserManagement.Domain.Repositories;

public interface IUsersRepository : IBaseRepository<Users>
{
    Task<IEnumerable<Users>> FindByRoleAsync(string role);

    Task<Users?> FindByEmailAndRoleAsync(string email, string role);
}