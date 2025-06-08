namespace RepairLink_Backend.LocationRouting.Interfaces.REST.Resources;

public record AddressResource(int Id, string street, string city, string zipCode, int lat, int lng);