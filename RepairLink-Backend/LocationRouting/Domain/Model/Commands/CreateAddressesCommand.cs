namespace RepairLink_Backend.LocationRouting.Domain.Model.Commands;

public record CreateAddressesCommand(string street, string city, string zipCode, int lat, int lng);