using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Commands;

namespace RepairLink_Backend.ServiceCatalog.Domain.Model.Aggregates;

public partial class Services
{
    protected Services()
    {
        name =string.Empty;
        description = string.Empty;
        baseprice = 0;
    }

    public Services(CreateServicesCommand command)
    {
        name = command.name;
        description = command.description;
        baseprice = command.baseprice;
    }
    
    public int Id { get; }
    public string name { get; private set; }
    public string description { get; private set; }
    public double baseprice { get; private set; }
    
}