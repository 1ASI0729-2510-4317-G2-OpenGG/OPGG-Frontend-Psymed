using EntityFrameworkCore.CreatedUpdatedDate.Extensions;
using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration.Extensions;
using RepairLink_Backend.UserManagement.Domain.Model.Aggregates;

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

        /*builder.Entity<FavoriteSource>().HasKey(f => f.Id);
        builder.Entity<FavoriteSource>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<FavoriteSource>().Property(f => f.SourceId).IsRequired();
        builder.Entity<FavoriteSource>().Property(f => f.NewsApiKey).IsRequired();*/
        
        builder.Entity<Users>().HasKey(f => f.Id);
        builder.Entity<Users>().Property(f => f.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Users>().Property(f => f.name).IsRequired();
        builder.Entity<Users>().Property(f => f.email).IsRequired();
        builder.Entity<Users>().Property(f => f.password_hash).IsRequired();
        builder.Entity<Users>().Property(f => f.role).IsRequired();
        builder.Entity<Users>().Property(f => f.address_id).IsRequired();

        builder.UseSnakeCaseNamingConvention();
    }
}