using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;
using RepairLink_Backend.UserManagement.Domain.Model.Commands;

namespace RepairLink_Backend.UserManagement.Domain.Services;

public interface IUsersCommandService
{
    Task<Users?> Handle(CreateUsersCommand command);

}