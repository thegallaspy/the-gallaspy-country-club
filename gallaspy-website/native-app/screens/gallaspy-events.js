(() => {
  "use strict";

  // Extend the existing native navigation.
  // No new registration or payment backend is created.
  const home = document.getElementById("nativeHomeScreen");
  const grid = home?.querySelector(".course-home-grid");

  if (!home || !grid ||
      typeof window.showNativeScreen !== "function") return;

  const entry = document.createElement("section");
  entry.className = "gallaspy-event-entry";
  entry.setAttribute("aria-label", "The Gallaspy signature events");

  entry.innerHTML = `
    <p class="gallaspy-event-kicker">SIGNATURE EVENTS</p>

    <button type="button"
      class="gallaspy-event-feature"
      data-gallaspy-hub-view="overview"
      aria-label="Explore The Gallaspy Championship and Summer Festival">
      <span class="gallaspy-signature-number">SIGNATURE EVENT 01</span>
      <img class="gallaspy-signature-event-logo"
        src="./assets/gallaspy-events/the-gallaspy-championship.png"
        alt="Official The Gallaspy Championship logo"
        loading="lazy" />
      <span class="gallaspy-signature-event-title">THE GALLASPY</span>
      <span class="gallaspy-signature-event-subtitle">
        CHAMPIONSHIP &amp; SUMMER FESTIVAL
      </span>
      <span class="gallaspy-signature-event-detail">
        JUNE 21, 2027 · METRO ATLANTA
      </span>
      <span class="gallaspy-signature-event-action">
        EXPLORE THE EVENT <span aria-hidden="true">↗</span>
      </span>
    </button>

    <button type="button"
      class="gallaspy-cup-feature"
      data-gallaspy-hub-view="cup"
      aria-label="Explore The Gallaspy Cup team match play competition">
      <span class="gallaspy-signature-number">SIGNATURE EVENT 02</span>
      <img class="gallaspy-signature-cup-logo"
        src="./assets/gallaspy-events/the-gallaspy-cup.png"
        alt="Official The Gallaspy Cup logo"
        loading="lazy" />
      <span class="gallaspy-signature-cup-heading">THE GALLASPY CUP</span>
      <span class="gallaspy-signature-cup-tagline">
        TWO TEAMS. ONE CUP.
      </span>
      <span class="gallaspy-signature-teams">
        <span class="gallaspy-signature-team">
          <img src="./assets/gallaspy-events/falcon-G.png"
            alt="" loading="lazy" />
          <strong>TEAM FALCON</strong>
        </span>
        <span class="gallaspy-signature-versus">VS</span>
        <span class="gallaspy-signature-team">
          <img src="./assets/gallaspy-events/crest.png"
            alt="" loading="lazy" />
          <strong>TEAM CREST</strong>
        </span>
      </span>
      <span class="gallaspy-signature-event-detail">
        TEAM MATCH PLAY
      </span>
      <span class="gallaspy-signature-event-action">
        EXPLORE THE CUP <span aria-hidden="true">↗</span>
      </span>
    </button>
  `;

  grid.insertAdjacentElement("afterend", entry);

  const screen = document.createElement("div");
  screen.className = "native-screen gallaspy-event-screen";
  screen.id = "nativeEventScreen";
  screen.hidden = true;

  screen.innerHTML = `
    <div class="gallaspy-hub-inner">
      <button type="button"
        class="gallaspy-hub-back"
        id="gallaspyHubBack">
        ← BACK TO CLUBHOUSE
      </button>

      <header class="gallaspy-hub-hero">
        <div class="gallaspy-hub-hero-top">
          <span class="gallaspy-hub-overline">
            OFFICIAL GALLASPY EVENTS
          </span>
          <img
            src="./assets/gallaspy-events/falcon-G.png"
            alt="The Gallaspy Falcon G"
            width="66"
            height="66"
          />
        </div>

        <h1 id="gallaspyHubTitle" tabindex="-1">
          THE GALLASPY
        </h1>

        <p id="gallaspyHubSubtitle">
          CHAMPIONSHIP & SUMMER FESTIVAL
        </p>

        <p id="gallaspyHubDate">
          JUNE 21, 2027 · METRO ATLANTA
        </p>
      </header>

      <nav class="gallaspy-hub-tabs"
        aria-label="Event Hub sections">
        <button type="button"
          data-gallaspy-hub-view="overview">EVENT</button>
        <button type="button"
          data-gallaspy-hub-view="championship">CHAMPIONSHIP</button>
        <button type="button"
          data-gallaspy-hub-view="festival">FESTIVAL</button>
        <button type="button"
          data-gallaspy-hub-view="sponsors">SPONSORS</button>
        <button type="button"
          data-gallaspy-hub-view="vendors">VENDORS</button>
        <button type="button"
          data-gallaspy-hub-view="visitors">VISITORS</button>
        <button type="button"
          data-gallaspy-hub-view="cup">THE CUP</button>
      </nav>

      <section class="gallaspy-hub-panel"
        data-gallaspy-hub-panel="overview">
        <p class="gallaspy-hub-eyebrow">MORE THAN A ROUND</p>
        <h2>THE GOLF EVENT FOR EVERYONE.</h2>
        <p>
          The Gallaspy brings championship competition,
          golf culture, businesses, and the community
          together in one summer event.
          Follow confirmed announcements as the
          inaugural event takes shape.
        </p>

        <div class="gallaspy-hub-card-grid">
          <button type="button" class="gallaspy-hub-card"
            data-gallaspy-hub-view="championship">
            <strong>THE CHAMPIONSHIP</strong>
            <img
              class="gallaspy-hub-card-logo"
              src="./assets/gallaspy-events/the-gallaspy-championship.png"
              alt=""
              loading="lazy"
            />
            <span>Players, entry, rules & The Golden Falcon</span>
            <b aria-hidden="true">→</b>
          </button>

          <button type="button" class="gallaspy-hub-card"
            data-gallaspy-hub-view="festival">
            <strong>FESTIVAL EXPERIENCE</strong>
            <span>Golf, culture & community</span>
            <b aria-hidden="true">→</b>
          </button>

          <button type="button" class="gallaspy-hub-card"
            data-gallaspy-hub-view="sponsors">
            <strong>PARTNER WITH US</strong>
            <span>Sponsorship inquiries</span>
            <b aria-hidden="true">→</b>
          </button>

          <button type="button" class="gallaspy-hub-card"
            data-gallaspy-hub-view="vendors">
            <strong>BECOME A VENDOR</strong>
            <span>Business participation updates</span>
            <b aria-hidden="true">→</b>
          </button>

          <button type="button" class="gallaspy-hub-card"
            data-gallaspy-hub-view="visitors">
            <strong>PLAN YOUR VISIT</strong>
            <span>Spectator information and announcements</span>
            <b aria-hidden="true">→</b>
          </button>

          <button type="button" class="gallaspy-hub-card"
            data-gallaspy-hub-view="cup">
            <strong>THE GALLASPY CUP</strong>
            <span>Team Crest vs. Team Falcon</span>
            <b aria-hidden="true">→</b>
          </button>
        </div>
      </section>

      <section class="gallaspy-hub-panel"
        data-gallaspy-hub-panel="championship" hidden>
        <p class="gallaspy-hub-eyebrow">OFFICIAL COMPETITION</p>
        <h2>THE GALLASPY CHAMPIONSHIP.</h2>

        <img
          class="gallaspy-hub-championship-mark"
          src="./assets/gallaspy-events/the-gallaspy-championship.png"
          alt="Official The Gallaspy Championship logo"
          loading="lazy"
        />

        <p>
          Compete for championship honors and
          the Golden Falcon. Explore the established
          competition rules and registration process
          before entering.
        </p>

        <div class="gallaspy-hub-actions">
          <button type="button"
            data-gallaspy-web-route="/invitational/register">
            PLAYER REGISTRATION →
          </button>

          <button type="button"
            data-gallaspy-web-route="/invitational/rules">
            COMPETITION RULES →
          </button>

          <button type="button"
            data-gallaspy-web-route="/invitational/schedule">
            CHAMPIONSHIP SCHEDULE →
          </button>

          <button type="button"
            data-gallaspy-web-route="/invitational/faq">
            CHAMPIONSHIP FAQ →
          </button>
        </div>

        <p class="gallaspy-hub-note">
          Individual player dashboards, official pairings,
          and live scoring will appear here once the
          connected championship systems are verified.
        </p>
      </section>

      <section class="gallaspy-hub-panel"
        data-gallaspy-hub-panel="festival" hidden>
        <p class="gallaspy-hub-eyebrow">BEYOND THE FAIRWAYS</p>
        <h2>SUMMER AT THE GALLASPY.</h2>

        <p>
          The event is being developed for golfers
          and non-golfers, with space for community
          connection, businesses, and festival experiences.
        </p>

        <p class="gallaspy-hub-note">
          Activities, entertainment, vendors, and
          amenities will be published when confirmed.
        </p>
      </section>

      <section class="gallaspy-hub-panel"
        data-gallaspy-hub-panel="sponsors" hidden>
        <p class="gallaspy-hub-eyebrow">BUSINESS PARTNERSHIPS</p>
        <h2>PARTNER WITH THE GALLASPY.</h2>

        <p>
          Explore sponsorship opportunities for the
          inaugural Championship and Summer Festival.
          All placements and benefits depend on
          an approved agreement.
        </p>

        <div class="gallaspy-hub-actions">
          <button type="button"
            data-gallaspy-web-route="/invitational/sponsors">
            SPONSOR INQUIRY →
          </button>
        </div>

        <p class="gallaspy-hub-note">
          Only confirmed sponsors will appear
          in an official sponsor directory.
        </p>
      </section>

      <section class="gallaspy-hub-panel"
        data-gallaspy-hub-panel="vendors" hidden>
        <p class="gallaspy-hub-eyebrow">FESTIVAL MARKETPLACE</p>
        <h2>BE PART OF THE EXPERIENCE.</h2>

        <p>
          Food and beverage, golf, apparel,
          wellness, lifestyle, and community businesses
          may be considered for the festival marketplace.
        </p>

        <p class="gallaspy-hub-note">
          The vendor application process is being developed.
          Availability, assigned spaces, and fees
          are not yet confirmed.
        </p>

        <div class="gallaspy-hub-actions">
          <button type="button"
            data-gallaspy-web-route="/contact">
            ASK ABOUT VENDOR OPPORTUNITIES →
          </button>
        </div>
      </section>

      <section class="gallaspy-hub-panel"
        data-gallaspy-hub-panel="visitors" hidden>
        <p class="gallaspy-hub-eyebrow">EVERYONE IS WELCOME</p>
        <h2>EXPERIENCE THE GALLASPY.</h2>

        <p>
          Join the community around golf, competition,
          and summer celebration.
          The inaugural event is planned for
          June 21, 2027 in metro Atlanta.
        </p>

        <p class="gallaspy-hub-note">
          Spectator admission, parking, exact location,
          activities, and championship viewing information
          will be shared when confirmed.
          Spectator ticketing is not active here.
        </p>
      </section>

      <section class="gallaspy-hub-panel"
        data-gallaspy-hub-panel="cup" hidden>
        <p class="gallaspy-hub-eyebrow">SIGNATURE TEAM MATCH</p>
        <h2>THE GALLASPY CUP.</h2>
        <img
          class="gallaspy-hub-championship-mark"
          src="./assets/gallaspy-events/the-gallaspy-cup.png"
          alt="Official The Gallaspy Cup logo"
          loading="lazy"
        />

        <p>
          A rivalry within the club: Team Crest versus
          Team Falcon. Sixteen players compete in eight
          head-to-head singles matches over eighteen holes
          of match play. The established format is unchanged.
        </p>

        <div class="gallaspy-cup-metrics">
          <span><strong>16</strong>PLAYERS</span>
          <span><strong>8</strong>MATCHES</span>
          <span><strong>18</strong>HOLES</span>
          <span><strong>4½</strong>POINTS TO WIN</span>
        </div>

        <p class="gallaspy-hub-note">
          Team rosters, pairings, standings, and results
          will be connected to the existing competition
          system after verification.
        </p>
      </section>

      <p class="gallaspy-hub-feedback"
        id="gallaspyHubFeedback"
        role="status"
        aria-live="polite"></p>
    </div>
  `;

  home.insertAdjacentElement("afterend", screen);

  const views = new Set([
    "overview", "championship", "festival",
    "sponsors", "vendors", "visitors", "cup"
  ]);

  const allowedRoutes = new Set([
    "/invitational/register",
    "/invitational/rules",
    "/invitational/schedule",
    "/invitational/faq",
    "/invitational/sponsors",
    "/contact"
  ]);

  const heading = screen.querySelector("#gallaspyHubTitle");
  const subtitle = screen.querySelector("#gallaspyHubSubtitle");
  const date = screen.querySelector("#gallaspyHubDate");
  const feedback = screen.querySelector("#gallaspyHubFeedback");

  function showView(target) {
    const view = views.has(target) ? target : "overview";
    const cup = view === "cup";

    heading.textContent = cup
      ? "THE GALLASPY CUP"
      : "THE GALLASPY";

    subtitle.textContent = cup
      ? "TEAM MATCH COMPETITION"
      : "CHAMPIONSHIP & SUMMER FESTIVAL";

    date.hidden = cup;

    screen.querySelectorAll(
      "[data-gallaspy-hub-panel]"
    ).forEach(panel => {
      panel.hidden =
        panel.dataset.gallaspyHubPanel !== view;
    });

    screen.querySelectorAll(
      ".gallaspy-hub-tabs [data-gallaspy-hub-view]"
    ).forEach(button => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.gallaspyHubView === view)
      );
    });

    feedback.textContent = "";
  }

  function openHub(target) {
    showView(target);
    window.showNativeScreen("events");
    heading.focus({ preventScroll: true });
  }

  [entry, screen].forEach(container => {
    container.querySelectorAll(
      "[data-gallaspy-hub-view]"
    ).forEach(button => {
      button.addEventListener("click", () => {
        openHub(button.dataset.gallaspyHubView);
      });
    });
  });

  screen.querySelector("#gallaspyHubBack")
    .addEventListener("click", () => {
      window.showNativeScreen("home");
    });

  screen.querySelectorAll(
    "[data-gallaspy-web-route]"
  ).forEach(button => {
    button.addEventListener("click", () => {
      const route = button.dataset.gallaspyWebRoute;

      if (!allowedRoutes.has(route)) return;

      if (!navigator.onLine) {
        feedback.textContent =
          "Connect to the internet to open this page.";
        return;
      }

      feedback.textContent = "";
      window.openClubRoute?.(route);
    });
  });

  showView("overview");
  window.openGallaspyEventHub = openHub;
})();
