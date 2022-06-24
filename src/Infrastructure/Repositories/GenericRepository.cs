using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Core.Exceptions;

namespace Infrastructure.Repositories;

public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
{
#if (!configureUnitOfWork)
    private readonly ApplicationDbContext _applicationDbContext;
#endif
    private readonly DbSet<TEntity> _entities;

    public GenericRepository(ApplicationDbContext applicationDbContext)
    {
#if (!configureUnitOfWork)
        _applicationDbContext = applicationDbContext;
#endif
        _entities = applicationDbContext.Set<TEntity>();
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _entities.ToListAsync<TEntity>();
    }

    public async Task<TEntity> GetByIdAsync(Guid id)
    {
        TEntity? foundEntity = await _entities.FindAsync(id);
        if (foundEntity is null)
        {
            throw new NotFoundException();
        }
        return foundEntity;
    }

    public async Task CreateAsync(TEntity entity)
    {
        await _entities.AddAsync(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        TEntity? foundEntity = await _entities.FindAsync(id);
        if (foundEntity is null)
        {
            throw new NotFoundException();
        }
        _entities.Remove(foundEntity);
    }

#if (!configureUnitOfWork)
    public async Task SaveAsync()
    {
        await _applicationDbContext.SaveChangesAsync();
    }
#endif
}
