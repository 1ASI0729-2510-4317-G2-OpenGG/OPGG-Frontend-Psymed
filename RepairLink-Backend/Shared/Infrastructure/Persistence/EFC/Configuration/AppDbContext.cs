using EntityFrameworkCore.CreatedUpdatedDate.Extensions;
using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.Availability.Domain.Model.Aggregates;
using RepairLink_Backend.LocationRouting.Domain.Model.Aggregates;
using RepairLink_Backend.ServiceCatalog.Domain.Model.Aggregates;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration.Extensions;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;
using RepairLink_Backend.Notification.Domain.Model.Aggregates;

namespace RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;

/// <summary>
///     Application database context
/// </summary>
public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        // Add the created and updated interceptor
        builder.AddCreatedUpdatedInterceptor();
        base.OnConfiguring(builder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        
        //Config for Users
        builder.Entity<Users>().HasKey(f => f.Id);
        builder.Entity<Users>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Users>().Property(f => f.name).IsRequired();
        builder.Entity<Users>().Property(f => f.email).IsRequired();
        builder.Entity<Users>().Property(f => f.password_hash).IsRequired();
        builder.Entity<Users>().Property(f => f.role).IsRequired();
        builder.Entity<Users>().Property(f => f.address_id).IsRequired();

        
        //Config for Addresses
        builder.Entity<Addresses>().HasKey(f => f.id);
        builder.Entity<Addresses>().Property(f => f.id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Addresses>().Property(f =>f.street).IsRequired();
        builder.Entity<Addresses>().Property(f => f.city).IsRequired();
        builder.Entity<Addresses>().Property(f =>f.zipCode).IsRequired();
        builder.Entity<Addresses>().Property(f => f.lat).IsRequired();
        builder.Entity<Addresses>().Property(f =>f.lng).IsRequired();
        
        //Config for Services
        builder.Entity<Services>().HasKey(f => f.Id);
        builder.Entity<Services>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Services>().Property(f => f.name).IsRequired();
        builder.Entity<Services>().Property(f => f.description).IsRequired();
        
        //Config for Notifications
        builder.Entity<Notification.Domain.Model.Aggregates.Notification>().HasKey(f => f.Id);
        builder.Entity<Notification.Domain.Model.Aggregates.Notification>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Notification.Domain.Model.Aggregates.Notification>().Property(f => f.recipient_id).IsRequired();
        builder.Entity<Notification.Domain.Model.Aggregates.Notification>().Property(f =>f.message).IsRequired();
        builder.Entity<Notification.Domain.Model.Aggregates.Notification>().Property(f =>f.type).IsRequired();
        builder.Entity<Notification.Domain.Model.Aggregates.Notification>().Property(f => f.status).IsRequired();
        
        //Config for Availability
        builder.Entity<AvailabilityDays>().HasKey(f => f.Id);
        builder.Entity<AvailabilityDays>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<AvailabilityDays>().Property(f => f.SlotId).IsRequired();
        builder.Entity<AvailabilityDays>().Property(f => f.DayOfWeek).IsRequired();
        builder.Entity<AvailabilitySlots>().HasKey(f => f.Id);
        builder.Entity<AvailabilitySlots>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<AvailabilitySlots>().Property(f => f.TechnicianId).IsRequired();
        builder.Entity<AvailabilitySlots>().Property(f => f.StartTime).IsRequired();
        builder.Entity<AvailabilitySlots>().Property(f => f.EndTime).IsRequired();
        builder.Entity<AvailabilitySlots>().Property(f => f.IsRecurring).IsRequired();
       
        //Config for Payment
        builder.Entity<Payment.Domain.Model.Aggregates.Payment>().HasKey(f => f.Id);
        builder.Entity<Payment.Domain.Model.Aggregates.Payment>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Payment.Domain.Model.Aggregates.Payment>().Property( f =>f.BookingId).IsRequired();
        builder.Entity<Payment.Domain.Model.Aggregates.Payment>().Property(f => f.Amount).IsRequired();
        builder.Entity<Payment.Domain.Model.Aggregates.Payment>().Property(f => f.PaymentMethod).IsRequired();
        builder.Entity<Payment.Domain.Model.Aggregates.Payment>().Property(f => f.Status).IsRequired();
        
        //Config for Booking
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>().HasKey(f => f.Id);
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>().Property(f => f.CustomerId).IsRequired();
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>().Property(f => f.TechnicianId).IsRequired();
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>().Property(f => f.ServiceId).IsRequired();
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>().Property(f => f.AddressId).IsRequired();
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>().Property(f => f.Status).IsRequired();
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>().Property(f => f.ScheduledTime).IsRequired();





        
        //Relationships
        builder.Entity<Users>()
            .HasOne(u => u.Addresses)
            .WithMany(a => a.Users)
            .HasForeignKey(u => u.address_id)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Notification.Domain.Model.Aggregates.Notification>()
            .HasOne(u => u.Users)
            .WithMany(a => a.Notification)
            .HasForeignKey(u => u.recipient_id)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<AvailabilityDays>()
            .HasOne(u => u.AvailabilitySlotsSlots)
            .WithMany(a => a.AvailabilityDaysCollection)
            .HasForeignKey(u => u.SlotId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<AvailabilitySlots>()
            .HasOne(u => u.User)
            .WithMany(a => a.AvailabilitySlots)
            .HasForeignKey(u => u.TechnicianId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Payment.Domain.Model.Aggregates.Payment>()
            .HasOne(u => u.Booking)
            .WithOne(a => a.Payment)
            .HasForeignKey<Payment.Domain.Model.Aggregates.Payment>(u => u.BookingId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Booking.Domain.Model.Aggregates.Booking>()
            .HasOne(u => u.Customer)
            .WithMany(a => a.Bookings)
            .HasForeignKey(u => u.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.Entity<Booking.Domain.Model.Aggregates.Booking>()
            .HasOne(u => u.Technician)
            .WithMany(a => a.Bookings)
            .HasForeignKey(u => u.TechnicianId)
            .OnDelete(DeleteBehavior.Restrict);
        
        
        builder.UseSnakeCaseNamingConvention();
    }
}