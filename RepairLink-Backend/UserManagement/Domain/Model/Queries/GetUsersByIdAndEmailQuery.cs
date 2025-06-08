namespace RepairLink_Backend.UserManagement.Domain.Model.Queries;

public record GetUsersByEmailAndRoleQuery(string Email, string Role);