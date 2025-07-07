using Microsoft.EntityFrameworkCore;
using RepairLink_Backend.Notification.Domain.Repositories;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Configuration;
using RepairLink_Backend.Shared.Infrastructure.Persistence.EFC.Repositories;

namespace RepairLink_Backend.Notification.Infrastructure.Repositories;

public class NotificationRepository(AppDbContext context) 
    : BaseRepository<Domain.Model.Aggregates.Notification>(context), INotificationRepository
{
    public async Task<IEnumerable<Domain.Model.Aggregates.Notification>> FindByRecipientIdAsync(int recipientId)
    {
        return await Context.Set<Domain.Model.Aggregates.Notification>().Where(f => f.recipient_id == recipientId)
            .ToListAsync();
    }
    
    public async Task<Domain.Model.Aggregates.Notification?> FindByAllParams(int recipientId, string message, string type, string status)
    {
        return await Context.Set<Domain.Model.Aggregates.Notification>()
            .FirstOrDefaultAsync(f => f.recipient_id == recipientId && f.message == message && f.type == type && f.status == status);
    }
}