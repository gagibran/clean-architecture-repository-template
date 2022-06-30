namespace CleanArchRepoTemplate.Core.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    void UpdateProduct(Product product);
}
