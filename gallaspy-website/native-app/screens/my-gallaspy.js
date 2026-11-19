(() => {
  "use strict";

  const PROFILE_KEY = "gallaspy-player-profile-v1";
  const ROUNDS_KEY = "gallaspy-golf-rounds-v1";
  const $ = id => document.getElementById(id);

  const nameInput = $("myPlayerName");
  const greeting = $("myPlayerGreeting");
  const recent = $("myRecentRounds");
  const year = $("myGolfYear");
  const seasonStats = $("mySeasonStats");

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
    const verifiedName = window.gallaspyVerifiedPlayerName;

    greeting.textContent = verifiedName
      ? `WELCOME, ${verifiedName.toUpperCase()}.`
      : name
        ? `WELCOME, ${name.toUpperCase()}.`
        : "WELCOME, GOLFER.";
  }

  function getRounds() {
    const data = readJSON(ROUNDS_KEY, []);

    if (!Array.isArray(data)) return [];

    return data.filter(round =>
      round &&
      typeof round.course === "string" &&
      round.course.trim() &&
      Array.isArray(round.scores) &&
      [9, 18].includes(round.holeCount ?? round.scores.length) &&
      round.scores.length === (round.holeCount ?? round.scores.length) &&
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
    const totals = rounds
      .filter(round => round.scores.length === 18)
      .map(round => round.total);

    $("myRoundsPlayed").textContent = rounds.length;

    $("myBestScore").textContent = totals.length
      ? Math.min(...totals)
      : "—";

    $("myAverageScore").textContent = totals.length
      ? (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1)
      : "—";

    const validYear = round => /^\d{4}-\d{2}-\d{2}$/.test(round.date || "") ? round.date.slice(0,4) : "";
    if (year) {
      const selected = year.value;
      const years = [...new Set(rounds.map(validYear).filter(Boolean))].sort().reverse();
      year.replaceChildren(new Option("All time", "all"), ...years.map(value => new Option(value, value)));
      year.value = years.includes(selected) ? selected : "all";
    }
    const filtered = rounds.filter(round => !year || year.value === "all" || validYear(round) === year.value);
    if (seasonStats) {
      seasonStats.replaceChildren();
      const nine = filtered.filter(round => round.scores.length === 9).map(round => round.total);
      const eighteen = filtered.filter(round => round.scores.length === 18).map(round => round.total);
      const courses = new Set(filtered.map(round => round.course.trim().toLowerCase().replace(/\s+/g, " ")));
      for (const [label, value] of [["Rounds", filtered.length], ["Courses", courses.size], ["Best 9", nine.length ? Math.min(...nine) : "—"], ["Best 18", eighteen.length ? Math.min(...eighteen) : "—"], ["Avg 9", nine.length ? (nine.reduce((a,b)=>a+b,0)/nine.length).toFixed(1) : "—"], ["Avg 18", eighteen.length ? (eighteen.reduce((a,b)=>a+b,0)/eighteen.length).toFixed(1) : "—"]]) {
        const item = document.createElement("div");
        const title = document.createElement("span"); title.textContent = label;
        const metric = document.createElement("strong"); metric.textContent = value;
        item.append(title, metric); seasonStats.append(item);
      }
    }
    recent.replaceChildren();

    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "my-empty";
      empty.textContent =
        "No saved scorecards for this period. Start recording your golf history.";
      recent.append(empty);
      return;
    }

    filtered.slice().sort((a,b) => String(b.date || "").localeCompare(String(a.date || ""))).forEach(round => {
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
      score.textContent = `${round.total} (${round.scores.length} holes)`;

      item.append(details, score);
      recent.append(item);
    });
  }

  const settingsPanel = $("mySettingsPanel");
  const dashboardContent = document.querySelector(".my-dashboard-content");
  const cloudProfile = $("myCloudProfile");
  let cloudProfileWasVisible = false;

  function setSettingsOpen(open) {
    if (!settingsPanel || !dashboardContent) return;

    if (open && cloudProfile) {
      cloudProfileWasVisible = !cloudProfile.hidden;
    }

    settingsPanel.hidden = !open;
    dashboardContent.hidden = open;

    if (cloudProfile) {
      cloudProfile.hidden = open ? true : !cloudProfileWasVisible;
    }

    if (open) {
      loadProfile();
      settingsPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      $("nativeMyGallaspyScreen")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  $("myOpenSettings")?.addEventListener("click", () => {
    setSettingsOpen(true);
  });

  $("myCloseSettings")?.addEventListener("click", () => {
    setSettingsOpen(false);
  });

  $("mySaveProfile")?.addEventListener("click", () => {
    const name = nameInput.value.trim();

    if (!name) {
      $("myProfileMessage").textContent = "Enter your display name.";
      return;
    }

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ name }));
      loadProfile();

      window.dispatchEvent(
        new CustomEvent("gallaspy:profile-updated", {
          detail: { name }
        })
      );
      $("myProfileMessage").textContent = "Profile saved on this device.";
    } catch {
      $("myProfileMessage").textContent = "Unable to save profile.";
    }
  });

  $("myGoToPlay")?.addEventListener("click", () => {
    if (!window.openGallaspyPlayFeature?.("playScorecardLaunch")) window.showNativeScreen?.("play");
  });

  function openNativeMembership() {
    window.showNativeScreen?.("my-gallaspy");
    window.gallaspyMyDashboard?.showView("membership");
  }

  $("myFalconSociety")?.addEventListener("click", () => {
    openNativeMembership();
  });

  document.querySelector('[data-route="/my-gallaspy"]')
    ?.addEventListener("click", () => {
      loadProfile();
      refresh();
    });

  window.addEventListener("gallaspy:rounds-changed", refresh);
  year?.addEventListener("change", refresh);
  loadProfile();
  refresh();
})();
