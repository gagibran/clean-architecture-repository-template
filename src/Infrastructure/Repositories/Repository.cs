namespace CleanArchRepoTemplate.Infrastructure.Repositories;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
{
    private readonly ApplicationDbContext _applicationDbContext;

    public Repository(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _applicationDbContext.Set<TEntity>().ToListAsync<TEntity>();
    }

    public async Task<TEntity?> GetByIdAsync(Guid id)
    {
        return await _applicationDbContext.Set<TEntity>().FindAsync(id);
    }

    public async Task CreateAsync(TEntity entity)
    {
        await _applicationDbContext.Set<TEntity>().AddAsync(entity);
    }

    public void Delete(TEntity entity)
    {
        _applicationDbContext.Set<TEntity>().Remove(entity);
    }

#if (!configureUnitOfWork)
    public async Task SaveAsync()
    {
        await _applicationDbContext.SaveChangesAsync();
    }
#endif
}
