(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const screen = $("nativeHomeScreen");
  if (!screen) return;

  const ROUND_KEY = "gallaspy-golf-rounds-v1";
  const ROUNDS_URL = "https://thegallaspy.com/api/mobile/rounds";
  let lastFetch = 0;
  let requestInFlight = false;
  const CACHE_MS = 2 * 60 * 1000;

  function updateWelcome() {
    const el = $("homePersonalWelcome");
    if (!el) return;
    // Only use the verified golfer name from the existing authenticated player API.
    const verified = typeof window.gallaspyVerifiedPlayerName === "string"
      ? window.gallaspyVerifiedPlayerName.trim() : "";
    const firstName = verified.split(/\s+/)[0]?.slice(0, 32) || "";
    el.textContent = firstName ? `WELCOME BACK, ${firstName.toLocaleUpperCase()}` : "WELCOME TO YOUR CLUBHOUSE";
  }

  function getLocalRounds() {
    let parsed;
    try { parsed = JSON.parse(localStorage.getItem(ROUND_KEY) || "[]"); }
    catch { return []; }
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(round => {
      if (!round || typeof round.course !== "string" || !round.course.trim()) return false;
      const holes = round.holeCount ?? round.scores?.length;
      return [9, 18].includes(holes) && Array.isArray(round.scores) &&
        round.scores.length === holes && round.scores.every(n => Number.isInteger(n) && n >= 1 && n <= 20);
    });
  }

  function updateSnapshot() {
    const rounds = getLocalRounds();
    const courses = new Set(rounds.map(r => r.course.trim().toLocaleLowerCase().replace(/\s+/g, " ")));
    const eighteen = rounds.filter(r => r.scores.length === 18);
    const sum = eighteen.reduce((total, round) => total + round.scores.reduce((a, b) => a + b, 0), 0);
    const mean = eighteen.length ? (sum / eighteen.length).toFixed(1) : "—";
    if ($("homeRoundsCount")) $("homeRoundsCount").textContent = String(rounds.length);
    if ($("homeCoursesCount")) $("homeCoursesCount").textContent = String(courses.size);
    if ($("homeAverage18")) $("homeAverage18").textContent = mean;
    if ($("homeRoundSummary")) {
      const nine = rounds.filter(r => r.scores.length === 9).length;
      $("homeRoundSummary").textContent = `${nine} nine-hole · ${eighteen.length} eighteen-hole rounds saved on this device. Not official handicap records.`;
    }
  }

  function setRound(name, details, status = "") {
    if ($("homeNextRoundName")) $("homeNextRoundName").textContent = name;
    if ($("homeNextRoundDetails")) $("homeNextRoundDetails").textContent = details;
    if ($("homeNextRoundStatus")) $("homeNextRoundStatus").textContent = status;
  }

  async function loadNextRound() {
    if (requestInFlight || Date.now() - lastFetch < CACHE_MS) return;
    if (!navigator.onLine) {
      setRound("Round schedule unavailable offline", "Reconnect to view upcoming club golf opportunities.");
      return;
    }
    requestInFlight = true;
    setRound("Checking the club schedule…", "Looking for upcoming Gallaspy Rounds.");
    try {
      const response = await fetch(ROUNDS_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("Schedule request failed");
      const data = await response.json();
      if (data.success !== true || !Array.isArray(data.rounds)) throw new Error("Invalid schedule");
      const today = new Date().toISOString().slice(0, 10);
      const upcoming = data.rounds.filter(round => {
        if (!round || ["COMPLETED", "CANCELLED"].includes(round.status)) return false;
        // Ignore definitely past ISO dates. Unknown/TBD dates remain eligible.
        return !(typeof round.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(round.date) && round.date < today);
      });
      upcoming.sort((a, b) => {
        const aDate = /^\d{4}-\d{2}-\d{2}$/.test(a.date || "") ? a.date : "9999-12-31";
        const bDate = /^\d{4}-\d{2}-\d{2}$/.test(b.date || "") ? b.date : "9999-12-31";
        return aDate.localeCompare(bDate);
      });
      const next = upcoming[0];
      if (!next) {
        setRound("No upcoming club rounds listed", "Check the golf calendar for new Gallaspy events.");
      } else {
        const place = next.venue || {};
        const venue = [place.name, place.city, place.state].filter(Boolean).join(" · ");
        setRound(next.name || "Upcoming Gallaspy Round",
          [next.dateLabel || next.date, venue].filter(Boolean).join(" · ") || "Course and date to be announced",
          next.status === "REGISTRATION_OPEN" ? "REGISTRATION OPEN" : next.status === "WAITLIST" ? "WAITLIST AVAILABLE" : "SEE EVENT DETAILS");
      }
      lastFetch = Date.now();
    } catch {
      setRound("Unable to load the club schedule", "Open Gallaspy Rounds to try again.");
    } finally {
      requestInFlight = false;
    }
  }

  function refreshHome() {
    updateWelcome();
    updateSnapshot();
    loadNextRound();
  }

  window.addEventListener("gallaspy:verified-player-updated", updateWelcome);
  window.addEventListener("gallaspy:auth-changed", updateWelcome);
  window.addEventListener("gallaspy:rounds-changed", updateSnapshot);
  window.addEventListener("online", loadNextRound);
  document.querySelector("[data-home]")?.addEventListener("click", refreshHome);
  refreshHome();
})();
