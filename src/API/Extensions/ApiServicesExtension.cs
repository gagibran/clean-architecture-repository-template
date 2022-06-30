using FluentValidation.AspNetCore;
#if (enableSwagger)
using CleanArchRepoTemplate.API.SwaggerSchemas;
#endif

namespace CleanArchRepoTemplate.API.Extensions;

public static class ApiServicesExtension
{
    public static IServiceCollection AddFluentValidationServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddFluentValidation(configuration =>
        {
            configuration.RegisterValidatorsFromAssembly(typeof(ApiServicesExtension).Assembly);
        });
        return serviceCollection;
    }

    public static IServiceCollection AddCorsDevelopmentServices(this IServiceCollection serviceCollection, string developmentCorsPolicy)
    {
        serviceCollection.AddCors(options =>
        {
            options.AddPolicy(developmentCorsPolicy, policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
        return serviceCollection;
    }
#if (enableSwagger)

    public static IServiceCollection AddSwaggerServices(this IServiceCollection serviceCollection)
    {
        var xmlFilename = $"{typeof(ApiServicesExtension).Assembly.GetName().Name}.xml";
        string xmlFilePath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
        serviceCollection.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "CleanArchRepoTemplate API",
                Description = "A .NET 6 API for the CleanArchRepoTemplate solution"
            });
            options.IncludeXmlComments(xmlFilePath);
            options.SchemaFilter<UserSchemaFilter>();
        });
        return serviceCollection;
    }
#endif
}
