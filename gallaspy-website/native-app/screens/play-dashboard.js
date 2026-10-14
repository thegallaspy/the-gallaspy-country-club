(() => {
  "use strict";

  const play = document.getElementById("nativePlayScreen");
  const nav = play?.querySelector(".play-dashboard-nav");

  if (!play || !nav) return;

  const panels = {
    playClubRounds: [
      document.getElementById("playClubRounds")
    ],
    playFoursomes: [
      document.getElementById("playFoursomes")
    ],
    playGolfCalendar: [
      document.getElementById("playGolfCalendar")
    ],
    playGolfRules: [
      document.getElementById("playGolfRules")
    ],
    playShotTracer: [
      document.getElementById("playShotTracer")
    ],
    playScorecardLaunch: [
      document.getElementById("playScorecardLaunch"),
      document.getElementById("playScorecard")
    ],
    playProgressSection: [
      ...play.querySelectorAll('[data-play-panel="progress"]')
    ]
  };

  const buttons = [...nav.querySelectorAll("[data-play-target]")];
  const heading = play.querySelector(".play-heading");
  const weather = document.getElementById("playWeather");

  const featureNames = {
    playClubRounds: "GALLASPY ROUNDS",
    playFoursomes: "GOLF PARTNERS",
    playGolfCalendar: "GOLF CALENDAR",
    playGolfRules: "GOLF RULES",
    playShotTracer: "SHOT TRACER",
    playScorecardLaunch: "SCORECARD",
    playProgressSection: "MY PROGRESS"
  };

  const featureHeader = document.createElement("header");
  featureHeader.className = "gallaspy-play-page-header";
  featureHeader.hidden = true;

  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "gallaspy-play-back";
  backButton.textContent = "← BACK TO PLAY";

  const pageTitle = document.createElement("h2");
  pageTitle.className = "gallaspy-play-page-title";

  featureHeader.append(backButton, pageTitle);
  nav.before(featureHeader);

  let active = null;

  function render() {
    const insideFeature = active !== null;

    nav.hidden = insideFeature;
    featureHeader.hidden = !insideFeature;
    if (heading) heading.hidden = insideFeature;
    if (weather) weather.hidden = insideFeature;

    pageTitle.textContent = insideFeature
      ? featureNames[active] || "PLAY"
      : "";

    for (const button of buttons) {
      const selected = button.dataset.playTarget === active;
      button.setAttribute("aria-expanded", String(selected));
    }

    for (const [key, sections] of Object.entries(panels)) {
      for (const section of sections) {
        if (!section) continue;

        // The scorecard form has its own draft/start logic.
        if (section.id === "playScorecard") {
          // Preserve the scorecard's own visibility state.
          // Only hide it when another dashboard feature is selected.
          if (active !== "playScorecardLaunch") {
            section.hidden = true;
          }
          continue;
        }

        section.hidden = key !== active;
      }
    }
  }

  function scrollWithinContent(element) {
    const content = document.getElementById("nativeContent");
    if (!content || !element) return;

    const top = element.getBoundingClientRect().top
      - content.getBoundingClientRect().top
      + content.scrollTop - 16;

    content.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth"
    });
  }

  // Open a specific PLAY feature from anywhere in the native app.
  window.openGallaspyPlayFeature = function (target) {
    if (!Object.prototype.hasOwnProperty.call(panels, target)) {
      return false;
    }

    if (typeof window.showNativeScreen !== "function") {
      return false;
    }

    window.showNativeScreen("play");

    active = target;
    render();

    const first = panels[target].find(Boolean);
    if (first) {
      requestAnimationFrame(() => {
        scrollWithinContent(first);
      });
    }

    return true;
  };

  backButton.addEventListener("click", () => {
    active = null;
    render();

    const content = document.getElementById("nativeContent");
    if (content) content.scrollTop = 0;
  });

  nav.addEventListener("click", event => {
    const button = event.target.closest("[data-play-target]");
    if (!button || !nav.contains(button)) return;

    const target = button.dataset.playTarget;
    if (!panels[target]) return;

    active = active === target ? null : target;
    render();

    if (active) {
      const first = panels[active][0];
      if (first) scrollWithinContent(first);
    }
  });

  render();
})();
