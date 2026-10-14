(() => {
  "use strict";

  const $ = id => document.getElementById(id);

  const refresh = $("weatherRefresh");
  if (!refresh) return;

  const API =
    "https://thegallaspy.com/api/mobile/weather";

  const params = new URLSearchParams({
    lat: "33.7490",
    lon: "-84.3880"
  });

  function formatTime(value) {
    return new Date(value).toLocaleTimeString("en-US", {
      hour: "numeric",
      timeZone: "America/New_York"
    });
  }

  async function loadWeather() {
    const status = $("weatherStatus");
    status.textContent = "Updating playing conditions...";
    refresh.disabled = true;

    try {
      const response = await fetch(`${API}?${params}`, {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Weather service unavailable.");
      }

      const data = await response.json();

      if (!data.success || !data.hourly?.length) {
        throw new Error("Forecast unavailable.");
      }

      const current = data.hourly[0];

      $("weatherLocation").textContent =
        [data.location?.city, data.location?.state]
          .filter(Boolean).join(", ") || "Course forecast";

      $("weatherTemperature").textContent =
        `${current.temperature}°`;

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
      status.textContent =
        "Unable to load weather. Please try again.";
    } finally {
      refresh.disabled = false;
    }
  }

  refresh.addEventListener("click", loadWeather);
  loadWeather();
})();
