namespace CleanArchRepoTemplate.API.Validators;

public class BaseValidator<TEntity> : AbstractValidator<TEntity> where TEntity : BaseEntity
{
    public BaseValidator()
    {
        RuleFor(entity => entity.UpdatedAt).Empty();
    }
}
