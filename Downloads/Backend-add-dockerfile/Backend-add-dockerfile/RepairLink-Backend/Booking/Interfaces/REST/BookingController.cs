using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.X509.Qualified;
using Org.BouncyCastle.Crypto.Encodings;
using RepairLink_Backend.Booking.Domain.Model.Queries;
using RepairLink_Backend.Booking.Domain.Services;
using RepairLink_Backend.Booking.Interfaces.REST.Resources;
using RepairLink_Backend.Booking.Interfaces.REST.Transform;
using Swashbuckle.AspNetCore.Annotations;

namespace RepairLink_Backend.Booking.Interfaces.REST;


[ApiController]
[Route("api/v1/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Tags("Bookings")]
public class BookingController(
    IBookingsQueryService bookingsQueryService,
    IBookingsCommandService bookingsCommandService
    ) : ControllerBase
{
    [HttpPost]
    [SwaggerOperation(
        Summary = "Creates a booking",
        Description = "Creates a booking",
        OperationId = "CreateBooking")]
    [SwaggerResponse(201, "Booking created successfully", typeof(BookingResource))]
    [SwaggerResponse(400, "Booking already exists.")]
    public async Task<ActionResult> CreateBooking([FromBody] CreateBookingResource resource)
    {
        var createBookingCommand =
            CreateBookingCommandFromResourceAssembler.ToCommandFromResource(resource);
        var result = await bookingsCommandService.Handle(createBookingCommand);
        if (result is null) return BadRequest();
        return CreatedAtAction(nameof(GetBookingId), new { id = result.Id }, 
            BookingResourceFromEntityAssembler.ToReourceFromEntity(result));
    }

    [HttpGet]
    [SwaggerOperation(
        Summary = "Get booking by Id",
        Description = "Get booking by Id",
        OperationId = "GetBookingId")]
    [SwaggerResponse(200, " The Booking was found", typeof(BookingResource))]
    public async Task<ActionResult> GetBookingId(int id)
    {
        var getBookingByIdQuery = new GetBookingsByIdQuery(id);
        var result = await bookingsQueryService.Handle(getBookingByIdQuery);
        if (result is null) return NotFound();
        var resource = BookingResourceFromEntityAssembler.ToReourceFromEntity(result);
        return Ok(resource);
    }
}