(() => {
  "use strict";

  const screen = document.getElementById("nativeMyGallaspyScreen");
  const navigation = document.getElementById("myDashboardNavigation");
  const dashboard = screen?.querySelector(".my-dashboard-content");

  if (!screen || !navigation || !dashboard) return;

  const selectors = {
    points: "#myClubPoints",
    passport: "#myGolfPassport",
    membership: "#myMembershipSection",
    golf: "#myRecentRounds"
  };

  const buttons = [...navigation.querySelectorAll("[data-my-view]")];

  const sections = {
    points: screen.querySelector(selectors.points),
    passport: screen.querySelector(selectors.passport),
    membership: screen.querySelector(selectors.membership),
    golf: screen.querySelector(selectors.golf)?.closest(".my-panel")
  };

  const contentSections = [...dashboard.children];

  const overviewElements = [
    document.getElementById("myPlayerGreeting"),
    document.getElementById("myGolfPerformance")
  ].filter(Boolean);

  const membershipElements = [
    sections.membership,
    document.getElementById("myFalconSociety")?.closest(".my-panel")
  ].filter(Boolean);

  const membershipPanel = sections.membership;
  const falconPanel =
    document.getElementById("myFalconSociety")?.closest(".my-panel");

  if (membershipPanel && falconPanel) {
    falconPanel.before(membershipPanel);
  }

  const adminPanel = document.getElementById("myRoundAdmin");

  function showView(view) {
    if (!["overview", "golf", "points", "passport", "membership"].includes(view)) {
      return;
    }

    const selected = sections[view];

    if (view !== "overview" && !selected) return;

    contentSections.forEach(element => {
      if (element === adminPanel) {
        element.hidden = true;
        return;
      }

      if (view === "overview") {
        element.hidden = !overviewElements.includes(element);
      } else if (view === "membership") {
        element.hidden = !membershipElements.includes(element);
      } else {
        element.hidden = element !== selected;
      }
    });

    buttons.forEach(button => {
      const active = button.dataset.myView === view;

      button.classList.toggle("my-v2-nav-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    navigation.classList.toggle("my-v3-detail-open", view !== "overview");

    if (view === "membership") {
      window.gallaspyMembership?.refresh();
      window.gallaspyMembershipCancellation?.refresh();
    }

    const performance = document.getElementById("myGolfPerformance");
    if (performance) {
      performance.hidden = view !== "overview";
    }

    const identity = document.getElementById("myPlayerIdentity");
    if (identity) {
      identity.hidden = view !== "overview";
    }

    const heading = screen.querySelector(".my-heading");
    if (heading) {
      heading.classList.toggle("my-v3-detail-heading", view !== "overview");
    }

    screen.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      showView(button.dataset.myView);
    });
  });

  window.gallaspyMyDashboard = { showView };

  showView("overview");
})();
