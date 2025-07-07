using RepairLink_Backend.UserManagement.Domain.Model.Commands;
using RepairLink_Backend.UserManagement.Interfaces.REST.Resources;

namespace RepairLink_Backend.UserManagement.Interfaces.REST.Transform;

public static class CreateUsersCommandFromResourceAssembler
{
    public static CreateUsersCommand ToCommandFromResource(CreateUsersResource resource)
    {
        return new CreateUsersCommand(resource.Name, resource.Email, resource.PasswordHash, resource.Role, resource.AddressId);
    }
}