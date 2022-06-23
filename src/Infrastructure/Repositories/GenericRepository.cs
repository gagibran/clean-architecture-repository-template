using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Core.Exceptions;

namespace Infrastructure.Repositories;

public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
{
    private readonly DbSet<TEntity> _entities;

    public GenericRepository(ApplicationDbContext applicationDbContext)
    {
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

    public async Task Create(TEntity entity)
    {
        await _entities.AddAsync(entity);
    }

    public async Task Delete(Guid id)
    {
        TEntity? foundEntity = await _entities.FindAsync(id);
        if (foundEntity is null)
        {
            throw new NotFoundException();
        }
        _entities.Remove(foundEntity);
    }
}
