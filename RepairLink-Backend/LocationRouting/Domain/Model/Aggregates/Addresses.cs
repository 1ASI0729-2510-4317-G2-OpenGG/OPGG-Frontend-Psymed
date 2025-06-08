using System.IO.Compression;
using System.Runtime.Intrinsics.X86;
using Org.BouncyCastle.Tls;
using RepairLink_Backend.LocationRouting.Domain.Model.Commands;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

namespace RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;

public partial class Addresses
{
    protected Addresses()
    {
        street = string.Empty;
        city = string.Empty;
        zipCode = string.Empty;
        lat = 0;
        lng = 0;
    }

    public Addresses(CreateAddressesCommand command)
    {
        street = command.street;
        city = command.city;
        zipCode = command.zipCode;
        lat = command.lat;
        lng = command.lng;
    }
    
    public int id { get; }
    public string street { get; private set; }
    public string city { get; private set; }
    public string zipCode { get; private set; }
    public int lat { get; private set; }
    public int lng { get; private set; }
}