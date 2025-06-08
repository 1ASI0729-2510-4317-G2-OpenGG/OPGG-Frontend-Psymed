using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace RepairLink_Backend.ServiceCatalog.Interfaces.REST;

[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Services")]
public class ServicesController()
{
    
}