namespace CleanArchRepoTemplate.Core.Interfaces;

public interface IRepository<TEntity> where TEntity : BaseEntity
{
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(Guid id);
    Task CreateAsync(TEntity entity);
    void Delete(TEntity entity);
#if (!configureUnitOfWork)
    Task SaveAsync();
#endif
}
