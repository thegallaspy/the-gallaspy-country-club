(() => {
  "use strict";

  const PROFILE_KEY = "gallaspy-player-profile-v1";
  const ROUNDS_KEY = "gallaspy-golf-rounds-v1";
  const $ = id => document.getElementById(id);

  const nameInput = $("myPlayerName");
  const greeting = $("myPlayerGreeting");
  const recent = $("myRecentRounds");

  if (!nameInput || !greeting || !recent) return;

  function readJSON(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function loadProfile() {
    const profile = readJSON(PROFILE_KEY, {});
    const name = typeof profile.name === "string"
      ? profile.name.trim()
      : "";

    nameInput.value = name;
    greeting.textContent = name
      ? `WELCOME, ${name.toUpperCase()}.`
      : "WELCOME, GOLFER.";
  }

  function getRounds() {
    const data = readJSON(ROUNDS_KEY, []);

    if (!Array.isArray(data)) return [];

    return data.filter(round =>
      round &&
      typeof round.course === "string" &&
      Array.isArray(round.scores) &&
      round.scores.length === 18 &&
      round.scores.every(n =>
        Number.isInteger(n) && n >= 1 && n <= 20
      )
    ).map(round => ({
      ...round,
      total: round.scores.reduce((a, b) => a + b, 0)
    }));
  }

  function refresh() {
    const rounds = getRounds();
    const totals = rounds.map(round => round.total);

    $("myRoundsPlayed").textContent = rounds.length;

    $("myBestScore").textContent = totals.length
      ? Math.min(...totals)
      : "—";

    $("myAverageScore").textContent = totals.length
      ? (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1)
      : "—";

    recent.replaceChildren();

    if (!rounds.length) {
      const empty = document.createElement("p");
      empty.className = "my-empty";
      empty.textContent =
        "No completed rounds yet. Start recording your golf history.";
      recent.append(empty);
      return;
    }

    rounds.slice(-5).reverse().forEach(round => {
      const item = document.createElement("div");
      item.className = "my-round";

      const details = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = round.course;

      const date = document.createElement("span");
      date.textContent = round.date || "Date not recorded";

      details.append(title, date);

      const score = document.createElement("strong");
      score.className = "my-round-score";
      score.textContent = round.total;

      item.append(details, score);
      recent.append(item);
    });
  }

  $("mySaveProfile")?.addEventListener("click", () => {
    const name = nameInput.value.trim();

    if (!name) {
      $("myProfileMessage").textContent = "Enter your display name.";
      return;
    }

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ name }));
      loadProfile();
      $("myProfileMessage").textContent = "Profile saved on this device.";
    } catch {
      $("myProfileMessage").textContent = "Unable to save profile.";
    }
  });

  $("myGoToPlay")?.addEventListener("click", () => {
    window.showNativeScreen?.("play");
  });

  $("myFalconSociety")?.addEventListener("click", () => {
    window.openClubRoute?.("/falcon-society/members");
  });

  $("myMembership")?.addEventListener("click", () => {
    window.openClubRoute?.("/membership");
  });

  document.querySelector('[data-route="/my-gallaspy"]')
    ?.addEventListener("click", () => {
      loadProfile();
      refresh();
    });

  loadProfile();
  refresh();
})();
