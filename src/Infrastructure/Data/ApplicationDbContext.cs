namespace CleanArchRepoTemplate.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = default!;

    public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
    }
}
