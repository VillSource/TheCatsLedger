using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Villsource.TheCatsLedger.Services;

public interface ILineMessagingService
{
    Task<bool> PushTextMessageAsync(string toUserId, string text);
    Task<bool> PushFlexMessageAsync(string toUserId, string altText, object flexContents);
}

public class LineMessagingService : ILineMessagingService
{
    private readonly HttpClient _httpClient;
    private readonly string? _channelAccessToken;
    private readonly ILogger<LineMessagingService> _logger;

    public LineMessagingService(HttpClient httpClient, IConfiguration configuration, ILogger<LineMessagingService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
        // Supports LineOptions:ChannelAccessToken or LineBotOptions:ChannelAccessToken
        _channelAccessToken = configuration["LineOptions:ChannelAccessToken"]
                              ?? configuration["LineBotOptions:ChannelAccessToken"];
    }

    public async Task<bool> PushTextMessageAsync(string toUserId, string text)
    {
        var message = new
        {
            to = toUserId,
            messages = new[]
            {
                new { type = "text", text }
            }
        };

        return await SendPushRequestAsync(message);
    }

    public async Task<bool> PushFlexMessageAsync(string toUserId, string altText, object flexContents)
    {
        var message = new
        {
            to = toUserId,
            messages = new[]
            {
                new
                {
                    type = "flex",
                    altText,
                    contents = flexContents
                }
            }
        };

        return await SendPushRequestAsync(message);
    }

    private async Task<bool> SendPushRequestAsync(object payload)
    {
        if (string.IsNullOrWhiteSpace(_channelAccessToken))
        {
            _logger.LogWarning("LINE Channel Access Token is not configured. Push message skipped.");
            return false;
        }

        try
        {
            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.line.me/v2/bot/message/push");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _channelAccessToken);
            request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                _logger.LogError("Failed to send LINE push message. Status: {StatusCode}, Response: {Body}", response.StatusCode, responseBody);
                return false;
            }

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception while sending LINE push message");
            return false;
        }
    }
}
