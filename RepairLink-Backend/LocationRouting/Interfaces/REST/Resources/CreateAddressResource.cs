namespace RepairLink_Backend.LocationRouting.Interfaces.REST.Resources;

public record CreateAddressResource(string street, string city, string zipCode, int lat, int lng);