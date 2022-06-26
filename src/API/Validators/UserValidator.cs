using Core.Entities;
using FluentValidation;

namespace API.Validators;

public class UserValidator : BaseValidator<User>
{
    public UserValidator()
    {
        RuleFor(user => user.FirstName).NotEmpty();
        RuleFor(user => user.LastName).NotEmpty();
        RuleFor(user => user.Email)
            .NotEmpty()
            .EmailAddress();
        RuleFor(user => user.DateOfBirth).NotEmpty();
        RuleFor(user => user.Address1).NotEmpty();
        RuleFor(user => user.ZipCode)
            .NotEmpty()
            .Matches(@"^\d{5}(-\d{4})?$");
        RuleFor(user => user.State).NotEmpty();
    }
}
