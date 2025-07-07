namespace RepairLink_Backend.UserManagement.Interfaces.REST.Resources;

public record CreateUsersResource(string Name, string Email, string PasswordHash, string Role, int AddressId);
