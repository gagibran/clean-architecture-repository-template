namespace CleanArchRepoTemplate.Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly ApplicationDbContext _applicationDbContext;

    public UserRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public void UpdateUser(User user)
    {
        _applicationDbContext.Users.Update(user);
    }
}
