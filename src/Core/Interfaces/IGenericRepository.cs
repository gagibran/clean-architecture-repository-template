using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<TEntity> where TEntity : BaseEntity
{
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity> GetByIdAsync(Guid id);
    Task CreateAsync(TEntity entity);
    Task DeleteAsync(Guid id);
#if (!configureUnitOfWork)
    Task SaveAsync();
#endif
}
