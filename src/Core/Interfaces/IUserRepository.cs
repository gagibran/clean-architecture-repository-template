using Core.Entities;

namespace Core.Interfaces;

public interface IUserRepository : IRepository<User>
{
    void UpdateUser(User user);
}
