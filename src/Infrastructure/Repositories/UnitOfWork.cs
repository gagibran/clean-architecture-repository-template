namespace Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _applicationDbContext;

    public IUserRepository Users { get; }

    public UnitOfWork(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
        Users = new UserRepository(applicationDbContext);
    }

    public async Task SaveAsync()
    {
        await _applicationDbContext.SaveChangesAsync();
    }
}
