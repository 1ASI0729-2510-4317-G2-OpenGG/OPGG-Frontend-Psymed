using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;
using RepairLink_Backend.UserManagement.Domain.Model.Queries;
using RepairLink_Backend.UserManagement.Domain.Repositories;
using RepairLink_Backend.UserManagement.Domain.Services;

namespace RepairLink_Backend.UserManagement.Application.Internal.QueryServices;

public class UsersQueryService(IUsersRepository usersRepository) 
    :IUsersQueryService
{
    public async Task<IEnumerable<Users>> Handle(GetAllUsersByRoleQuery query)
    {
        return await usersRepository.FindByRoleAsync(query.role);
    }

    public async Task<Users?> Handle(GetUsersByEmailAndRoleQuery query)
    {
        return await usersRepository.FindByEmailAndRoleAsync(query.Email, query.Role);
    }

    public async Task<Users?> Handle(GetUsersByIdQuery query)
    {
        return await usersRepository.FindByIdAsync(query.Id);
    }

}