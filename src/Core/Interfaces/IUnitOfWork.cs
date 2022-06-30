namespace CleanArchRepoTemplate.Core.Interfaces;

public interface IUnitOfWork
{
    IUserRepository Users { get; }

    Task SaveAsync();
}
