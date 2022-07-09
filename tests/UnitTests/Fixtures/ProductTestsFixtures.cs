namespace CleanArchRepoTemplate.Fixtures;

public static class ProductTestsFixtures
{
    public static Product CreateProduct()
    {
        var random = new Random();
        return new Product
        {
            Id = Guid.NewGuid(),
            Name = Guid.NewGuid().ToString(),
            Price = (decimal)random.Next(),
            CreatedAt = DateTime.UtcNow
        };
    }
}
