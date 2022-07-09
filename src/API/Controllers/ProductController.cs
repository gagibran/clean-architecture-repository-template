using System.Text.Json;
using CleanArchRepoTemplate.Core.Interfaces;

namespace CleanArchRepoTemplate.API.Controllers;

public class ProductController : BaseController
{
    private readonly ILogger<ProductController> _logger;
#if (configureUnitOfWork)
    private readonly IUnitOfWork _unitOfWork;

    public ProductController(ILogger<ProductController> logger, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _unitOfWork = unitOfWork;
    }
#else
    private readonly IProductRepository _products;

    public ProductController(ILogger<ProductController> logger, IProductRepository products)
    {
        _logger = logger;
        _products = products;
    }
#endif

    /// <summary>
    /// Gets all products.
    /// </summary>
    /// <returns>All existing products, if any.</returns>
    /// <response code="200">Returns all existing products, if any.</response>
    [HttpGet]
    public async Task<IActionResult> GetProductsAsync()
    {
#if (configureUnitOfWork)
        IEnumerable<Product> existingProducts = await _unitOfWork.Products.GetAllAsync();
#else
        IEnumerable<Product> existingProducts = await _products.GetAllAsync();
#endif
        _logger.LogInformation(
            $"Existing products found: {JsonSerializer.Serialize(existingProducts)}."
        );
        return Ok(existingProducts);
    }

    /// <summary>
    /// Gets an product by ID.
    /// </summary>
    /// <param name="id">The existing product's ID.</param>
    /// <returns>The product, if it exists.</returns>
    /// <response code="200">Returns the existing product.</response>
    /// <response code="404">If the product does not exist.</response>
    [HttpGet("{id}")]
    [ActionName(nameof(GetProductByIdAsync))]
    public async Task<IActionResult> GetProductByIdAsync(Guid id)
    {
#if (configureUnitOfWork)
        Product? existingProduct = await _unitOfWork.Products.GetByIdAsync(id);
#else
        Product? existingProduct = await _products.GetByIdAsync(id);
#endif
        if (existingProduct is null)
        {
            _logger.LogError($"A product with the ID {id} does not exist.");
            return NotFound();
        }
        _logger.LogInformation(
            $"Existing product found: {JsonSerializer.Serialize(existingProduct)}."
        );
        return Ok(existingProduct);
    }

    /// <summary>
    /// Creates a new product.
    /// </summary>
    /// <param name="product">The product data from the body.</param>
    /// <returns>A newly created product</returns>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /Product
    ///     {
    ///        "name": "Pen",
    ///        "price": "1.99"
    ///     }
    ///
    /// </remarks>
    /// <response code="201">Returns the newly created product</response>
    /// <response code="400">If one or more fields are incorrect.</response>
    [HttpPost]
    public async Task<IActionResult> CreateProductAsync(Product product)
    {
        product.Id =  Guid.NewGuid();
        product.CreatedAt =  DateTime.UtcNow;
#if (configureUnitOfWork)
        await _unitOfWork.Products.CreateAsync(product);
        await _unitOfWork.SaveAsync();
#else
        await _products.CreateAsync(product);
        await _products.SaveAsync();
#endif
        _logger.LogInformation(
            $"The product {JsonSerializer.Serialize(product)} was successfully created."
        );
        return CreatedAtAction(nameof(GetProductByIdAsync), new { id = product.Id }, product);
    }

    /// <summary>
    /// Updates an existing product.
    /// </summary>
    /// <param name="product">The product data from the body.</param>
    /// <param name="id">The existing product's ID.</param>
    /// <remarks>
    /// Sample request:
    ///
    ///     PUT /Product
    ///     {
    ///        "name": "Pen",
    ///        "price": "0.99"
    ///     }
    ///
    /// </remarks>
    /// <response code="204">If the product is correctly updated.</response>
    /// <response code="400">If one or more fields are incorrect.</response>
    /// <response code="404">If the product does not exist.</response>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProductAsync(Product product, Guid id)
    {
#if (configureUnitOfWork)
        Product? existingProduct = await _unitOfWork.Products.GetByIdAsync(id);
        if (existingProduct is null)
        {
            _logger.LogError($"A product with the ID {id} does not exist.");
            return NotFound();
        }
        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.UpdatedAt = DateTime.UtcNow;
        _unitOfWork.Products.UpdateProduct(existingProduct);
        await _unitOfWork.SaveAsync();
#else
        Product? existingProduct = await _products.GetByIdAsync(id);
        if (existingProduct is null)
        {
            _logger.LogError($"A product with the ID {id} does not exist.");
            return NotFound();
        }
        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.UpdatedAt = DateTime.UtcNow;
        _products.UpdateProduct(existingProduct);
        await _products.SaveAsync();
#endif
        _logger.LogInformation(
            $"The product with the ID {id} was successfully updated to {JsonSerializer.Serialize(product)}."
        );
        return NoContent();
    }

    /// <summary>
    /// Deletes an product by ID.
    /// </summary>
    /// <param name="id">The existing product's ID.</param>
    /// <response code="204">If the product is successfully deleted.</response>
    /// <response code="404">If the product does not exist.</response>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductAsync(Guid id)
    {
#if (configureUnitOfWork)
        Product? existingProduct = await _unitOfWork.Products.GetByIdAsync(id);
        if (existingProduct is null)
        {
            _logger.LogInformation($"A product with the ID {id} does not exist.");
            return NotFound();
        }
        _unitOfWork.Products.Delete(existingProduct);
        await _unitOfWork.SaveAsync();
#else
        Product? existingProduct = await _products.GetByIdAsync(id);
        if (existingProduct is null)
        {
            _logger.LogInformation($"A product with the ID {id} does not exist.");
            return NotFound();
        }
        _products.Delete(existingProduct);
        await _products.SaveAsync();
#endif
        _logger.LogInformation($"The product with the ID {id} was successfully deleted.");
        return NoContent();
    }
}
