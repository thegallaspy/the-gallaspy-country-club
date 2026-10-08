import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const headers = {
  "Access-Control-Allow-Origin": "capacitor://localhost",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Cache-Control": "no-store",
  Vary: "Origin",
};

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));

  if (
    !params.has("lat") ||
    !params.has("lon") ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 || lat > 90 ||
    lon < -180 || lon > 180
  ) {
    return respond({
      success: false,
      error: "Valid course coordinates are required.",
    }, 400);
  }

  try {
    const base = "https://api.weather.gov";

    const options = {
      headers: {
        "User-Agent": "(thegallaspy.com, support@thegallaspy.com)",
        Accept: "application/geo+json",
      },
      next: { revalidate: 900 },
    };

    const pointResponse = await fetch(
      `${base}/points/${lat.toFixed(4)},${lon.toFixed(4)}`,
      options
    );

    if (!pointResponse.ok) {
      return respond({
        success: false,
        error: "Forecast unavailable for this location.",
      }, 502);
    }

    const point = await pointResponse.json();
    const hourlyUrl = point.properties?.forecastHourly;

    if (
      typeof hourlyUrl !== "string" ||
      !hourlyUrl.startsWith("https://api.weather.gov/")
    ) {
      return respond({
        success: false,
        error: "Hourly forecast unavailable.",
      }, 502);
    }

    const forecastResponse = await fetch(hourlyUrl, options);

    if (!forecastResponse.ok) {
      return respond({
        success: false,
        error: "Unable to retrieve forecast.",
      }, 502);
    }

    const forecast = await forecastResponse.json();
    const periods = forecast.properties?.periods;

    if (!Array.isArray(periods) || periods.length === 0) {
      return respond({
        success: false,
        error: "No forecast data available.",
      }, 502);
    }

    return respond({
      success: true,
      location: {
        city: point.properties?.relativeLocation?.properties?.city ?? null,
        state: point.properties?.relativeLocation?.properties?.state ?? null,
      },
      updated: forecast.properties?.updateTime ?? null,
      hourly: periods.slice(0, 24).map((period) => ({
        time: period.startTime,
        temperature: period.temperature,
        temperatureUnit: period.temperatureUnit,
        windSpeed: period.windSpeed,
        windDirection: period.windDirection,
        conditions: period.shortForecast,
        rainProbability:
          period.probabilityOfPrecipitation?.value ?? null,
      })),
    });
  } catch {
    return respond({
      success: false,
      error: "Weather service temporarily unavailable.",
    }, 503);
  }
}
