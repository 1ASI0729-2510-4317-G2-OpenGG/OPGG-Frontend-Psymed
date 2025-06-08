using EntityFrameworkCore.CreatedUpdatedDate.Extensions;
using Microsoft.EntityFrameworkCore;
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
        
        //Relationships
        builder.Entity<Users>()
            .HasOne(u => u.Addresses)
            .WithMany(a => a.Users)
            .HasForeignKey(u => u.address_id)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.UseSnakeCaseNamingConvention();
    }
}