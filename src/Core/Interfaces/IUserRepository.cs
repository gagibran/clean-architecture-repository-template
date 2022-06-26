using Core.Entities;

namespace Core.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task UpdateUserAsync(User user, Guid id);
}
