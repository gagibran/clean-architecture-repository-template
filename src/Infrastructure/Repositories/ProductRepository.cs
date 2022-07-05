namespace CleanArchRepoTemplate.Infrastructure.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    private readonly ApplicationDbContext _applicationDbContext;

    public ProductRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public void UpdateProduct(Product product)
    {
        _applicationDbContext.Products.Update(product);
    }
}
