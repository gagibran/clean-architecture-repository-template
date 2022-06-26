using Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class InfrastructureServicesExtension
{
    public static IServiceCollection AddDbContextServices(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("ApplicationDatabase"));
        });
        return serviceCollection;
    }

    public static IServiceCollection AddDependencyInjectionServices(this IServiceCollection serviceCollection)
    {
#if (configureUnitOfWork)
        serviceCollection.AddScoped<IUnitOfWork, UnitOfWork>();
#else
        serviceCollection.AddScoped<IUserRepository, UserRepository>();
#endif
        return serviceCollection;
    }
}
