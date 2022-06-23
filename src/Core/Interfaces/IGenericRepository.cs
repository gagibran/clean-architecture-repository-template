using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<TEntity> where TEntity : BaseEntity
{
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity> GetByIdAsync(Guid id);
    Task Create(TEntity entity);
    Task Delete(Guid id);
}
