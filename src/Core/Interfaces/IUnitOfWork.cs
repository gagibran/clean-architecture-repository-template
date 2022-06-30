namespace CleanArchRepoTemplate.Core.Interfaces;

public interface IUnitOfWork
{
    IProductRepository Products { get; }

    Task SaveAsync();
}
