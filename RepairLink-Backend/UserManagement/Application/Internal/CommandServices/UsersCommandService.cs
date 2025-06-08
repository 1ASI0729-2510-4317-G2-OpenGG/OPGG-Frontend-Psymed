using RepairLink_Backend.Shared.Domain.Repositories;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;
using RepairLink_Backend.UserManagement.Domain.Model.Commands;
using RepairLink_Backend.UserManagement.Domain.Repositories;
using RepairLink_Backend.UserManagement.Domain.Services;

namespace RepairLink_Backend.UserManagement.Application.Internal.CommandServices;

public class UsersCommandService(IUsersRepository usersRepository, IUnitOfWork unitOfWork) 
    : IUsersCommandService
{
    public async Task<Users?> Handle(CreateUsersCommand command)
    {
        var users =
            await usersRepository.FindByEmailAndRoleAsync(command.email, command.role);
        if (users != null)
            throw new Exception("User already exists");
        users = new Users(command);
        try
        {
            await usersRepository.AddAsync(users);
            await unitOfWork.CompleteAsync();
        }
        catch (Exception e)
        {
            return null;
        }

        return users;
    }
    
}