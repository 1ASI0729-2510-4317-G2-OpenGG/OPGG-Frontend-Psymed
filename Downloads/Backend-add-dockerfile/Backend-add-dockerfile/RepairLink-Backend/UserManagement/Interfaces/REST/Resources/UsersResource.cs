namespace RepairLink_Backend.UserManagement.Interfaces.REST.Resources;

public record UsersResource(int Id, string Name, string Email, string PasswordHash, string Role, int AddressId);