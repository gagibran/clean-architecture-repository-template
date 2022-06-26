using Core.Entities;
using Core.Exceptions;

namespace Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly ApplicationDbContext _applicationDbContext;

    public UserRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task UpdateUserAsync(User user, Guid id)
    {
        User? foundUser = await _applicationDbContext.Users.FindAsync(id);
        if (foundUser is null)
        {
            throw new NotFoundException();
        }
        foundUser.FirstName = user.FirstName;
        foundUser.LastName = user.LastName;
        foundUser.Email = user.Email;
        foundUser.DateOfBirth = user.DateOfBirth;
        foundUser.Address1 = user.Address1;
        foundUser.Address2 = user.Address2;
        foundUser.State = user.State;
        foundUser.UpdatedAt = DateTime.UtcNow;
        _applicationDbContext.Users.Update(foundUser);
    }
}
