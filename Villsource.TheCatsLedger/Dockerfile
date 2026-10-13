FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Villsource.TheCatsLedger/Villsource.TheCatsLedger.csproj", "Villsource.TheCatsLedger/"]
RUN dotnet restore "Villsource.TheCatsLedger/Villsource.TheCatsLedger.csproj"
COPY . .
WORKDIR "/src/Villsource.TheCatsLedger"
RUN dotnet build "./Villsource.TheCatsLedger.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
ARG VITE_LIFF_ID
ARG VITE_API_URL

ENV VITE_LIFF_ID=$VITE_LIFF_ID
ENV VITE_API_URL=$VITE_API_URL
COPY ./web /src/web 
RUN dotnet publish "./Villsource.TheCatsLedger.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Villsource.TheCatsLedger.dll"]
