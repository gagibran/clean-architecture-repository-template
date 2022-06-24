using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
var developmentCorsPolicy = "DevelopmentCorsPolicy";

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ApplicationDbContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("ApplicationDatabase"));
});
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
if (builder.Environment.IsDevelopment())
{
#if (enableSwagger)
    builder.Services.AddSwaggerGen();
#endif
    builder.WebHost.UseUrls("http://+:5000"); // HTTPS doesn't work very well with Docker.
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(developmentCorsPolicy, policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    });
}

WebApplication app = builder.Build();
ILogger logger = app.Services.GetRequiredService<ILogger<Program>>();
using IServiceScope scope = app.Services.CreateScope();
IServiceProvider services = scope.ServiceProvider;

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors(developmentCorsPolicy);
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
if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}
app.UseAuthorization();
app.MapControllers();
app.Run();
