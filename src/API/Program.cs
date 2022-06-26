using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Infrastructure.Extensions;
using API.Extensions;

const string DEVELOPMENT_CORS_POLICY = "DevelopmentCorsPolicy";

// Add services to the container.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddFluentValidationServices();
builder.Services.AddDbContextServices(builder.Configuration);
builder.Services.AddDependencyInjectionServices();
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCorsDevelopmentServices(DEVELOPMENT_CORS_POLICY);
#if (enableSwagger)
    builder.Services.AddSwaggerServices();
#endif
    builder.WebHost.UseUrls("http://+:5000"); // HTTPS doesn't work very well with Docker.
}

// Configure the HTTP request pipeline.
WebApplication app = builder.Build();
ILogger logger = app.Services.GetRequiredService<ILogger<Program>>();
using IServiceScope scope = app.Services.CreateScope();
IServiceProvider services = scope.ServiceProvider;
if (app.Environment.IsDevelopment())
{
    app.UseCors(DEVELOPMENT_CORS_POLICY);
#if (enableSwagger)
    app.UseSwagger();
    app.UseSwaggerUI();
#endif
    ApplicationDbContext appDbContext = services.GetRequiredService<ApplicationDbContext>();
    try
    {
        await appDbContext.Database.MigrateAsync();
    }
    catch (Exception exception)
    {
        logger.LogError($"An error ocurred during migration: {exception}.");
    }
}
else if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}
app.UseAuthorization();
app.MapControllers();
app.Run();
