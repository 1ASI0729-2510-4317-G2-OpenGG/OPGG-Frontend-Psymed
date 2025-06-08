using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;
using RepairLink_Backend.UserManagement.Domain.Model.Queries;

namespace RepairLink_Backend.UserManagement.Domain.Services;

public interface IUsersQueryService
{
    Task<IEnumerable<Users>> Handle(GetAllUsersByRoleQuery query);
    Task<Users?> Handle(GetUsersByEmailAndRoleQuery query);
    Task<Users?> Handle(GetUsersByIdQuery query);
}