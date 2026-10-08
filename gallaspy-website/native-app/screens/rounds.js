(() => {
  "use strict";
  const home = document.getElementById("nativeHomeScreen");
  const rounds = document.getElementById("nativeRoundsScreen");
  const play = document.getElementById("nativePlayScreen");
  const my = document.getElementById("nativeMyGallaspyScreen");
  const list = document.getElementById("nativeRoundsList");
  const content = document.getElementById("nativeContent");
  const labels = {
    DETAILS_COMING_SOON: "Details Coming Soon",
    REGISTRATION_OPENING_SOON: "Registration Opening Soon",
    REGISTRATION_OPEN: "Registration Open",
    WAITLIST: "Waitlist",
    INVITATION_ONLY: "Invitation Only",
    SOLD_OUT: "Sold Out",
    COMPLETED: "Completed"
  };
  let loading = false;

  function show(screen) {
    home.hidden = screen !== "home";
    rounds.hidden = screen !== "rounds";
    if (play) play.hidden = screen !== "play";
    if (my) my.hidden = screen !== "my-gallaspy";
    document.querySelectorAll(".tab").forEach((tab) => {
      const active = screen === "home"
        ? tab.hasAttribute("data-home")
        : tab.dataset.route === "/" + screen;
      tab.classList.toggle("active", active);
      if (active) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });
    content.scrollTop = 0;
    if (screen === "rounds") loadRounds();
  }

  function message(text) {
    const p = document.createElement("p");
    p.className = "rounds-message";
    p.textContent = text;
    return p;
  }

  function cardFor(round) {
    const card = document.createElement("article");
    card.className = "round-card";
    const date = document.createElement("p");
    date.className = "round-card-date";
    date.textContent = round.dateLabel || round.date || "Date to be announced";
    const title = document.createElement("h3");
    title.textContent = round.name || "Gallaspy Round";
    const venue = document.createElement("p");
    venue.className = "round-card-venue";
    const place = round.venue || {};
    const location = [place.city, place.state].filter(Boolean).join(", ");
    venue.textContent = (place.name || "Course to be announced") + (location ? " · " + location : "");
    const status = document.createElement("span");
    status.className = "round-card-status";
    status.textContent = labels[round.status] || round.status || "";
    card.append(date, title, venue, status);
    if (["REGISTRATION_OPEN", "WAITLIST"].includes(round.status) &&
        typeof round.registrationHref === "string" &&
        round.registrationHref.startsWith("/") &&
        !round.registrationHref.startsWith("//")) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "round-register";
      button.textContent = round.status === "WAITLIST" ? "Join Waitlist" : "Register for Round";
      button.addEventListener("click", () => window.openClubRoute(round.registrationHref));
      card.append(button);
    }
    return card;
  }

  async function loadRounds() {
    if (loading) return;
    loading = true;
    list.replaceChildren(message("Loading club rounds..."));
    try {
      const response = await fetch("https://thegallaspy.com/api/mobile/rounds", { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const payload = await response.json();
      if (payload.success !== true || !Array.isArray(payload.rounds)) throw new Error("Invalid API response");
      list.replaceChildren();
      for (const [heading, items] of [
        ["Upcoming Rounds", payload.rounds.filter((r) => r.status !== "COMPLETED")],
        ["Completed Rounds", payload.rounds.filter((r) => r.status === "COMPLETED")]
      ]) {
        if (!items.length) continue;
        const h = document.createElement("h3");
        h.className = "rounds-section-title";
        h.textContent = heading;
        list.append(h);
        items.forEach((round) => list.append(cardFor(round)));
      }
      if (!payload.rounds.length) list.append(message("No club rounds are listed yet."));
    } catch (error) {
      console.error("Unable to load Gallaspy rounds:", error);
      const retry = document.createElement("button");
      retry.type = "button";
      retry.className = "round-register";
      retry.textContent = "Try Again";
      retry.addEventListener("click", loadRounds);
      list.replaceChildren(message("Unable to load the schedule. Check your connection and try again."), retry);
    } finally {
      loading = false;
    }
  }

  window.showNativeScreen = show;

  document.querySelectorAll("[data-route]").forEach((element) => {
    element.addEventListener("click", () => {
      const route = element.dataset.route;
      if (route === "/rounds") show("rounds");
      else if (route === "/play") show("play");
      else if (route === "/my-gallaspy") show("my-gallaspy");
      else window.openClubRoute(route);
    });
  });
  document.querySelector("[data-home]")?.addEventListener("click", () => show("home"));
})();
