namespace CleanArchRepoTemplate.Core.Interfaces;

public interface IUserRepository : IRepository<User>
{
    void UpdateUser(User user);
}
