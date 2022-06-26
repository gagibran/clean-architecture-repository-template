using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace API.SwaggerSchemas;

public class UserSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        schema.Example = new OpenApiObject()
        {
            ["firstName"] = new OpenApiString("John"),
            ["lastName"] = new OpenApiString("Doe"),
            ["email"] = new OpenApiString("johndoe@example.com"),
            ["dateOfBirth"] = new OpenApiString("2022-06-26T15:06:55.759Z"),
            ["address1"] = new OpenApiString("123 Copperas Cove"),
            ["address2"] = new OpenApiString("Building 2"),
            ["zipCode"] = new OpenApiString("76522"),
            ["state"] = new OpenApiString("Texas")
        };
    }
}
