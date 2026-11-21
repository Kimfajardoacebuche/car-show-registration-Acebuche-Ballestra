namespace Application.Abstractions.Data;

using Microsoft.EntityFrameworkCore;

public interface IAppDbContext
{
    DbSet<Domain.Entities.Registration> Registrations { get; }
    // Add a DbSet<TEntity> property for each entity in Domain/Entities
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
