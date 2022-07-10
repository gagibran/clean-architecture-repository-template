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
        okObjectResult.StatusCode.Should().Be(200);
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
        okObjectResult.StatusCode.Should().Be(200);
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
        okObjectResult.Value.Should().BeEquivalentTo(products);
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
        (okObjectResult.Value as List<Product>).Should().BeEmpty();
    }

    [Fact]
    public async Task GetProductByIdAsync_WithoutExistingProduct_Returns404()
    {
        _productRepositoryStub
            .Setup(productRepository => productRepository.GetByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync((Product?)null);
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var notFoundResult = (NotFoundResult)await productControllerSut.GetProductByIdAsync(Guid.NewGuid());
        notFoundResult.StatusCode.Should().Be(404);
    }

    [Fact]
    public async Task GetProductByIdAsync_WithExistingProduct_Returns200()
    {
        Product product = ProductTestsFixtures.CreateProduct();
        _productRepositoryStub
            .Setup(productRepository => productRepository.GetByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(product);
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var okObjectResult = (OkObjectResult)await productControllerSut.GetProductByIdAsync(Guid.NewGuid());
        okObjectResult.StatusCode.Should().Be(200);
    }

    [Fact]
    public async Task GetProductByIdAsync_WithExistingProduct_ReturnObjectHasExistingProduct()
    {
        Product product = ProductTestsFixtures.CreateProduct();
        _productRepositoryStub
            .Setup(productRepository => productRepository.GetByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(product);
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var okObjectResult = (OkObjectResult)await productControllerSut.GetProductByIdAsync(Guid.NewGuid());
        okObjectResult.Value.Should().BeEquivalentTo(product);
    }

    [Fact]
    public async Task CreateProductAsync_WithValidProduct_Returns201()
    {
        Product product = ProductTestsFixtures.CreateProduct();
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var createdAtActionResult = (CreatedAtActionResult)await productControllerSut.CreateProductAsync(product);
        createdAtActionResult.StatusCode.Should().Be(201);
    }

    [Fact]
    public async Task CreateProductAsync_WithValidProduct_ReturnObjectHasCreatedProduct()
    {
        Product product = ProductTestsFixtures.CreateProduct();
        var productControllerSut = new ProductController(_loggerStub.Object, _productRepositoryStub.Object);
        var createdAtActionResult = (CreatedAtActionResult)await productControllerSut.CreateProductAsync(product);
        createdAtActionResult.Value.Should().BeEquivalentTo(product);
    }
}
