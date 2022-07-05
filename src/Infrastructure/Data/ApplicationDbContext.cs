namespace CleanArchRepoTemplate.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Product> Products { get; set; } = default!;

    public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
    }
}
