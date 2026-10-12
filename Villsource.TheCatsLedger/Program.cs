using Hangfire;
using Hangfire.Storage.SQLite;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Scalar.AspNetCore;
using Villsource.TheCatsLedger.Data;
using Villsource.TheCatsLedger.Feature.v1.Bills;
using Villsource.TheCatsLedger.Feature.v1.Ledgers;
using Villsource.TheCatsLedger.Feature.v1.Payments;
using Villsource.TheCatsLedger.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUser, CurrentUser>();
builder.Services.AddHttpClient<ILineMessagingService, LineMessagingService>();
builder.Services.AddScoped<BillSummaryJob>();
builder.Services.AddScoped<ILiffLinkFactory, LiffLinkFactory>();

// Allow up to 10MB request body for slip images
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10 * 1024 * 1024; // 10MB
});

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        var scheme = new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.OAuth2,
            Flows = new OpenApiOAuthFlows
            {
                AuthorizationCode = new OpenApiOAuthFlow
                {
                    AuthorizationUrl = new Uri("https://access.line.me/oauth2/v2.1/authorize"),
                    TokenUrl = new Uri("https://api.line.me/oauth2/v2.1/token"),
                    Scopes = new Dictionary<string, string>
                    {
                        { "openid", "OpenID Connect" },
                        { "profile", "User Profile" }
                    }
                }
            }
        };
        
        var scheme2 = new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "นำ ID Token หรือ Access Token จาก LINE Mini App มาวางที่นี่"
        };

        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes ??= new Dictionary<string, Microsoft.OpenApi.IOpenApiSecurityScheme>();
        document.Components.SecuritySchemes.Add("LineOidc", scheme);
        document.Components.SecuritySchemes.Add("Bearer", scheme2);
        return Task.CompletedTask;
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// Configure Hangfire with SQLite
var dbPath = Path.Combine(builder.Environment.ContentRootPath, "db");
if (!Directory.Exists(dbPath))
{
    Directory.CreateDirectory(dbPath);
}
var hangfireDbPath = Path.Combine(dbPath, "hangfire.db");
Directory.CreateDirectory("db");
builder.Services.AddHangfire(config =>
{
    config.UseSimpleAssemblyNameTypeSerializer()
          .UseRecommendedSerializerSettings()
          .UseSQLiteStorage(hangfireDbPath);
});
builder.Services.AddHangfireServer();

var lineAuth = builder.Configuration.GetSection("LineOptions");
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.MetadataAddress = lineAuth["MetadataAddress"] ?? throw new ArgumentNullException($"config:LineOptions:MetadataAddress");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = lineAuth["ValidIssuer"],

            ValidateAudience = true,
            ValidAudience = lineAuth["ValidAudience"],

            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.MapGet("/", () => Results.Redirect("/scalar")).ExcludeFromApiReference().ExcludeFromDescription();
    
    // Dev endpoint to immediately test daily summary jobs
    app.MapPost("/summarize", async (BillSummaryJob job) =>
    {
        await job.SendMorningDebtorSummaryAsync();
        await job.SendEveningOwnerSummaryAsync();
        return Results.Ok(new { message = "Summary jobs executed successfully" });
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Hangfire Dashboard (available in Development)
if (app.Environment.IsDevelopment())
{
    app.UseHangfireDashboard("/hangfire");
}

// Register Recurring Jobs
using (var scope = app.Services.CreateScope())
{
    var recurringJobManager = scope.ServiceProvider.GetRequiredService<IRecurringJobManager>();
    
    // 08:00 daily reminder for debtors
    recurringJobManager.AddOrUpdate<BillSummaryJob>(
        "morning-debtor-summary",
        job => job.SendMorningDebtorSummaryAsync(),
        "0 8 * * *",
        new RecurringJobOptions { TimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time") }
    );

    // 20:00 daily summary for bill owners
    recurringJobManager.AddOrUpdate<BillSummaryJob>(
        "evening-owner-summary",
        job => job.SendEveningOwnerSummaryAsync(),
        "0 20 * * *",
        new RecurringJobOptions { TimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time") }
    );
}

app.MapLedgers();
app.MapBills();
app.MapPayment();

app.Run();