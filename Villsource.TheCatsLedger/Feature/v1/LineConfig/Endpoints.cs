namespace Villsource.TheCatsLedger.Feature.v1.LineConfig;

/// <summary>LINE LIFF configuration exposed to the web client.</summary>
public sealed record LineConfigResponse(string LiffId);

public static class Endpoints
{
    public static void MapLineConfig(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/line-config", (IConfiguration configuration) =>
                TypedResults.Ok(new LineConfigResponse(configuration["LineOptions:LIFFID"] ?? string.Empty)))
            .WithName("GetLineConfig")
            .WithSummary("Get LINE LIFF configuration")
            .WithDescription("Returns the LIFF ID used by the web client.")
            .Produces<LineConfigResponse>();
    }
}
