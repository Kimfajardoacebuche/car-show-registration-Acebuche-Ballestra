namespace Infrastructure.Persistence;

using Application.Abstractions.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

public sealed class AppDbContext : DbContext, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Registration> Registrations => Set<Registration>();

    // Implement each DbSet<TEntity> declared in IAppDbContext, e.g.
    // public DbSet<Student> Students => Set<Student>();
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return base.SaveChangesAsync(cancellationToken);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure keys, required fields, lengths, and relationships per entity
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Registration>(entity =>
        {
            entity.HasKey(r => r.Id);

            entity.Property(r => r.RegistrationNumber).IsRequired().HasMaxLength(20);
            entity.Property(r => r.RegistrationDate).IsRequired();
            entity.Property(r => r.ParticipantName).IsRequired().HasMaxLength(150);
            entity.Property(r => r.ContactNumber).IsRequired().HasMaxLength(11);
            entity.Property(r => r.Email).IsRequired().HasMaxLength(200);
            entity.Property(r => r.Address).IsRequired().HasMaxLength(300);
            entity.Property(r => r.CarMakeModel).IsRequired().HasMaxLength(100);
            entity.Property(r => r.PlateNumber).IsRequired().HasMaxLength(15);

            entity.Property(r => r.RegistrationFee).HasColumnType("decimal(18,2)");
            entity.Property(r => r.AmountPaid).HasColumnType("decimal(18,2)");

            entity.HasIndex(r => r.RegistrationNumber).IsUnique();
            entity.HasIndex(r => r.PlateNumber).IsUnique();
        });
    }
}
