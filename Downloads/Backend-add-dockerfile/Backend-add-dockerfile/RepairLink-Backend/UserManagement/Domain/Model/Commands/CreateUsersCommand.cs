namespace RepairLink_Backend.UserManagement.Domain.Model.Commands;

public record CreateUsersCommand(string name, string email, string password_hash, string role, int address_id);