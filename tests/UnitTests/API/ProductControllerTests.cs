using CleanArchRepoTemplate.Fixtures;

namespace CleanArchRepoTemplate.UnitTests.API;

public class ProductControllerTests
{
    private readonly Mock<ILogger<ProductController>> _loggerStub;
    private readonly Mock<IProductRepository> _productRepositoryStub;

    public ProductControllerTests()
    {
        _loggerStub = new Mock<ILogger<ProductController>>();
        _productRepositoryStub = new Mock<IProductRepository>();
    }

    [Fact]
    public async Task GetProductsAsync_WithoutExistingProducts_Returns200()
    {
        _productRepositoryStub
            .Setup(productRepository => productRepository.GetAllAsync())
            .ReturnsAsync(new List<Product>());
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var okObjectResult = (OkObjectResult)await productControllerSut.GetProductsAsync();
        Assert.Equal(200, okObjectResult.StatusCode);
    }

    [Fact]
    public async Task GetProductsAsync_WithAtLeastOneExistingProduct_Returns200()
    {
        Product product = ProductTestsFixtures.CreateProduct();
        _productRepositoryStub
            .Setup(productRepository => productRepository.GetAllAsync())
            .ReturnsAsync(new List<Product>{ product });
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var okObjectResult = (OkObjectResult)await productControllerSut.GetProductsAsync();
        Assert.Equal(200, okObjectResult.StatusCode);
    }

    [Fact]
    public async Task GetProductsAsync_WithAlLeastOneExistingProduct_ReturnObjectHasListWithProduct()
    {
        Product product = ProductTestsFixtures.CreateProduct();
        var products = new List<Product>{ product };
        _productRepositoryStub
            .Setup(productRepository => productRepository.GetAllAsync())
            .ReturnsAsync(products);
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var okObjectResult = (OkObjectResult)await productControllerSut.GetProductsAsync();
        Assert.Equal(products, okObjectResult.Value as List<Product>);
    }

    [Fact]
    public async Task GetProductsAsync_WithoutExistingProducts_ReturnObjectHasListWithoutProducts()
    {
        _productRepositoryStub
            .Setup(productRepository => productRepository.GetAllAsync())
            .ReturnsAsync(new List<Product>());
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var okObjectResult = (OkObjectResult)await productControllerSut.GetProductsAsync();
        Assert.Empty(okObjectResult.Value as List<Product>);
    }
}
