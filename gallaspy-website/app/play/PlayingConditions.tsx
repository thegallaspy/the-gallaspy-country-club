"use client";

import { useEffect, useState } from "react";

const locations = [
  ["Atlanta, GA", "33.7490,-84.3880"],
  ["Athens, GA", "33.9519,-83.3576"],
  ["Augusta, GA", "33.4735,-82.0105"],
  ["Savannah, GA", "32.0809,-81.0912"],
  ["Charlotte, NC", "35.2271,-80.8431"],
  ["Orlando, FL", "28.5383,-81.3792"],
];
type Hour = { time: string; temperature: number; temperatureUnit: string; windSpeed: string; windDirection: string; conditions: string; rainProbability: number | null };
type Forecast = { hourly: Hour[] };

function localTime(value: string) {
  const hour = Number(value.match(/T(\d{2}):/)?.[1]);
  return Number.isInteger(hour) && hour >= 0 && hour < 24 ? `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}` : "—";
}

export default function PlayingConditions() {
  const [location, setLocation] = useState(locations[0][1]);
  const [refresh, setRefresh] = useState(0);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [status, setStatus] = useState("Choose a location for a regional forecast.");

  useEffect(() => {
    if (!refresh) return;
    const controller = new AbortController();
    const [lat, lon] = location.split(",");
    const params = new URLSearchParams({ lat, lon });
    fetch(`/api/mobile/weather?${params}`, { signal: controller.signal })
      .then(async res => {
        if (!res.ok) throw new Error("Forecast unavailable");
        const data = await res.json();
        if (!data.success || !Array.isArray(data.hourly) || !data.hourly.length) throw new Error("Forecast unavailable");
        if (!controller.signal.aborted) { setForecast(data); setStatus("Forecast updated."); }
      })
      .catch(() => { if (!controller.signal.aborted) setStatus("Forecast unavailable. Please try again."); });
    return () => controller.abort();
  }, [location, refresh]);

  const current = forecast?.hourly[0];
  function load(nextLocation = location) {
    setForecast(null);
    setStatus("Updating playing conditions…");
    setLocation(nextLocation);
    setRefresh(value => value + 1);
  }

  return <section id="playing-conditions" className="scroll-mt-28 border-y border-[#10263F]/10 bg-[#f5f8f6] px-5 py-14 sm:px-10" aria-labelledby="conditions-heading">
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
      <div><p className="g-home-kicker">YOUR GAME / PLAYING CONDITIONS</p><h2 id="conditions-heading" className="mt-3 text-4xl font-black uppercase tracking-tight">Know before you go.</h2><p className="mt-4 max-w-md leading-7">Check a regional hourly forecast, wind and rain probability before your next round. Forecasts are not course-specific.</p></div>
      <div className="rounded-lg border border-[#10263F]/15 bg-white p-5 sm:p-7">
        <label htmlFor="forecast-location" className="text-xs font-bold uppercase tracking-widest">Forecast location</label>
        <div className="mt-2 flex flex-wrap gap-3"><select id="forecast-location" value={location} onChange={event => load(event.target.value)} className="min-h-12 flex-1 rounded-md border border-[#10263F]/20 px-3">{locations.map(([name, coordinates]) => <option key={coordinates} value={coordinates}>{name}</option>)}</select><button type="button" onClick={() => load()} className="min-h-12 rounded-md bg-[#164B3A] px-5 font-bold !text-white">Get forecast</button></div>
        <p role="status" className="mt-4 text-sm text-[#47596A]">{status}</p>
        {current ? <div className="mt-5"><p className="text-xs font-bold uppercase tracking-widest">Next hourly forecast</p><p className="mt-2 text-5xl font-black">{current.temperature}°{current.temperatureUnit}</p><p className="mt-2 font-semibold">{current.conditions}</p><p className="mt-2 text-sm">Wind: {current.windSpeed} {current.windDirection} · Rain: {current.rainProbability == null ? "Unavailable" : `${current.rainProbability}%`}</p><ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{forecast.hourly.slice(0,4).map(hour => <li key={hour.time} className="rounded-md bg-[#edf2ef] p-3 text-center"><span className="block text-xs">{localTime(hour.time)}</span><strong>{hour.temperature}°{hour.temperatureUnit}</strong></li>)}</ul><p className="mt-2 text-xs">Times are local to the forecast region.</p></div> : null}
        <p className="mt-5 text-xs leading-5 text-[#47596A]">Forecasts provided by the National Weather Service. Follow official alerts and golf course safety instructions.</p>
      </div>
    </div>
  </section>;
}
