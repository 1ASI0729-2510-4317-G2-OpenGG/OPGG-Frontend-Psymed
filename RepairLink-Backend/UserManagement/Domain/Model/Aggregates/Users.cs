using RepairLink_Backend.UserManagement.Domain.Model.Commands;

namespace RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

public partial class Users
{
    protected Users()
    {
        name = string.Empty;
        email = string.Empty;
        password_hash = string.Empty;
        role = string.Empty;
        address_id = 0 ;
    }

    public Users(CreateUsersCommand command)
    {
        name = command.name;
        email = command.email;
        password_hash = command.password_hash;
        role = command.role;
        address_id = command.address_id;
    }
    
    public int Id { get; }
    public string name { get; private set; }
    public string email { get; private set; }
    public string password_hash { get; private set; }
    public string role { get; private set; }
    public int address_id { get; private set; }
}