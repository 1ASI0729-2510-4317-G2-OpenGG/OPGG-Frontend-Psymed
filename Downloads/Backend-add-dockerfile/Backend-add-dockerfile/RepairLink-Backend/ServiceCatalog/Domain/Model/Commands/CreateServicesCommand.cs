namespace RepairLink_Backend.ServiceCatalog.Domain.Model.Commands;

public record CreateServicesCommand(string name, string description, double baseprice);