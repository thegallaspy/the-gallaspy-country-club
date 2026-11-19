(() => {
  "use strict";

  const $ = id => document.getElementById(id);

  const refresh = $("weatherRefresh");
  if (!refresh) return;

  const API =
    "https://thegallaspy.com/api/mobile/weather";

  const region = $("weatherRegion");
  let requestVersion = 0;

  function formatTime(value) {
    // ISO forecast periods include an offset in the forecast location's time zone.
    const hour = Number(String(value).match(/T(\d{2}):/)?.[1]);
    return Number.isInteger(hour) && hour >= 0 && hour < 24 ? `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}` : "—";
  }

  async function loadWeather() {
    const version = ++requestVersion;
    const [lat, lon] = (region?.value || "33.7490,-84.3880").split(",");
    const params = new URLSearchParams({lat, lon});
    const status = $("weatherStatus");
    status.textContent = "Updating playing conditions...";
    refresh.disabled = true;
    $("weatherLocation").textContent = region?.selectedOptions[0]?.textContent || "Atlanta, GA";
    $("weatherTemperature").textContent = "—";
    $("weatherConditions").textContent = "Loading forecast…";
    $("weatherWind").textContent = "—";
    $("weatherRain").textContent = "—";
    $("weatherHourly").replaceChildren();

    try {
      const response = await fetch(`${API}?${params}`, {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Weather service unavailable.");
      }

      const data = await response.json();
      if (version !== requestVersion) return;

      if (!data.success || !data.hourly?.length) {
        throw new Error("Forecast unavailable.");
      }

      const current = data.hourly[0];

      $("weatherLocation").textContent =
        [data.location?.city, data.location?.state]
          .filter(Boolean).join(", ") || "Course forecast";

      $("weatherTemperature").textContent =
        `${current.temperature}°${current.temperatureUnit || "F"}`;

      $("weatherConditions").textContent =
        current.conditions || "Conditions unavailable";

      $("weatherWind").textContent =
        `${current.windSpeed || "N/A"} ${current.windDirection || ""}`.trim();

      $("weatherRain").textContent =
        current.rainProbability == null
          ? "N/A"
          : `${current.rainProbability}%`;

      const hourly = $("weatherHourly");
      hourly.replaceChildren();

      data.hourly.slice(0, 4).forEach(hour => {
        const card = document.createElement("div");
        const time = document.createElement("span");
        const temp = document.createElement("strong");

        time.textContent = formatTime(hour.time);
        temp.textContent = `${hour.temperature}°`;

        card.append(time, temp);
        hourly.append(card);
      });

      status.textContent = "Forecast updated.";

    } catch (error) {
      if (version !== requestVersion) return;
      $("weatherConditions").textContent = "Forecast unavailable";
      status.textContent =
        "Unable to load weather. Please try again.";
    } finally {
      if (version === requestVersion) refresh.disabled = false;
    }
  }

  refresh.addEventListener("click", loadWeather);
  region?.addEventListener("change", loadWeather);
  loadWeather();
})();
