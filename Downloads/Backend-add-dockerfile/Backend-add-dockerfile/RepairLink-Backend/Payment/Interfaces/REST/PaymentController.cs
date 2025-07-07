using System.ComponentModel;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using RepairLink_Backend.Payment.Domain.Model.Queries;
using RepairLink_Backend.Payment.Domain.Services;
using RepairLink_Backend.Payment.Interfaces.REST.Resources;
using RepairLink_Backend.Payment.Interfaces.REST.Transform;
using Swashbuckle.AspNetCore.Annotations;

namespace RepairLink_Backend.Payment.Interfaces.REST;

[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Payments")]
public class PaymentController(
    IPaymentQueryService paymentQueryService,
    IPaymentCommandService paymentCommandService
    ) : ControllerBase
{
    [HttpPost]
    [SwaggerOperation(
        Summary = "Creates a payment",
        Description = "Creates a payment",
        OperationId = "CreatePayment")]
    [SwaggerResponse(201, "The payment was created", typeof(PaymentResource))]
    [SwaggerResponse(400, "The payment was invalid - not created")]
    public async Task<ActionResult> CreatePayment([FromBody] CreatePaymentResource resource)
    {
        var createPaymentCommand =
            CreatePaymentCommandFromResourceAssembler.ToCommandFromResource(resource);
        var result = await paymentCommandService.Handle(createPaymentCommand);
        if(result is null) return BadRequest();
        return CreatedAtAction(nameof(GetPaymentId), new { Id = result.Id },
            PaymentResourceFromEntityAssembler.ToResourceFromEntity(result));

    }

    [HttpGet]
    [SwaggerOperation(
        Summary = "Gets a payment by Id",
        Description = "Gets a payment by Id",
        OperationId = "GetPaymentId")]
    [SwaggerResponse(200, "The payment was found", typeof(PaymentResource))]
    public async Task<IActionResult> GetPaymentId(int id)
    {
        var getPaymentByIdQuery = new GetPaymentByIdQuery(id);
        var result = await paymentQueryService.Handle(getPaymentByIdQuery);
        if(result is null) return NotFound();
        var resource = PaymentResourceFromEntityAssembler.ToResourceFromEntity(result);
        return Ok(resource);
    }
    
}