using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace CleanArchRepoTemplate.API.SwaggerSchemas;

public class ProductSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        schema.Example = new OpenApiObject()
        {
            ["name"] = new OpenApiString("Pen"),
            ["price"] = new OpenApiString("1.99")
        };
    }
}
