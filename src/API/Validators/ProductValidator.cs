namespace CleanArchRepoTemplate.API.Validators;

public class ProductValidator : BaseValidator<Product>
{
    public ProductValidator()
    {
        RuleFor(user => user.Name).NotEmpty();
        RuleFor(user => user.Price)
            .NotEmpty()
            .GreaterThan(0);
    }
}
