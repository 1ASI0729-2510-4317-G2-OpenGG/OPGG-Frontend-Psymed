using RepairLink_Backend.ServiceCatalog.Domain.Model.Commands;

namespace RepairLink_Backend.ServiceCatalog.Domain.Services;

public interface IServicesCommandService
{

    Task<Model.Aggregates.Services> Handle(CreateServicesCommand command);

}