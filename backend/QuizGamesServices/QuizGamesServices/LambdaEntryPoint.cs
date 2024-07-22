using Amazon.Lambda.AspNetCoreServer;

namespace QuizGamesServices
{
    public class LambdaEntryPoint : APIGatewayProxyFunction
    {
        protected override void Init(IWebHostBuilder builder)
        {
            builder.UseStartup<Program>();
        }
    }
}
