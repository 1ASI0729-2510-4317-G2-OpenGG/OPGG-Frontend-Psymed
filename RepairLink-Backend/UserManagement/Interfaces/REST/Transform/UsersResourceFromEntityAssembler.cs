using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;
using RepairLink_Backend.UserManagement.Interfaces.REST.Resources;

namespace RepairLink_Backend.UserManagement.Interfaces.REST.Transform;

public static class UsersResourceFromEntityAssembler
{
    public static UsersResource ToResourceFromEntity(Users entity)
    {
        return new UsersResource(entity.Id, entity.name, entity.email, entity.password_hash, entity.role, entity.address_id);
    }
    
}