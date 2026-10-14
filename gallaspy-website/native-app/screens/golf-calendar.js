(() => {
  "use strict";

  const list = document.getElementById("golfCalendarList");
  const status = document.getElementById("golfCalendarStatus");
  const refresh = document.getElementById("golfCalendarRefresh");

  if (!list || !refresh) return;

  let loading = false;

  function make(tag, value, className) {
    const node = document.createElement(tag);
    if (value !== undefined) node.textContent = value;
    if (className) node.className = className;
    return node;
  }

  function dateLabel(value) {
    const parts = String(value || "").split("-");
    if (parts.length !== 3) return value || "Date TBA";

    const date = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function timeLabel(value) {
    const parts = String(value || "").split(":");
    const hour = Number(parts[0]);
    const minute = Number(parts[1]);

    if (!Number.isInteger(hour) || hour < 0 || hour > 23 ||
        !Number.isInteger(minute) || minute < 0 || minute > 59) {
      return value || "Time TBA";
    }

    return new Date(2026, 0, 1, hour, minute)
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
      });
  }

  function renderRound(item) {
    const card = make("article", undefined, "golf-calendar-card");
    const date = make("p", dateLabel(item.round.round_date), "golf-calendar-date");
    const course = make("h5", item.round.course_name || "Golf Round");
    const time = make("p", "TEE TIME · " + timeLabel(item.round.tee_time));
    const state = make("span", item.label, "golf-calendar-state");

    const openLabel = make(
      "span",
      "VIEW IN GOLF PARTNERS →",
      "golf-calendar-open-label"
    );

    card.append(date, course, time, state, openLabel);

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute(
      "aria-label",
      "View " + (item.round.course_name || "golf round") +
      " in Golf Partners"
    );

    function openRound() {
      const opened = window.openGallaspyPlayFeature?.("playFoursomes");
      if (!opened) return;

      document.getElementById("foursomeMine")?.click();
    }

    card.addEventListener("click", openRound);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openRound();
      }
    });

    return card;
  }

  async function loadCalendar() {
    if (loading) return;

    loading = true;
    refresh.disabled = true;
    list.replaceChildren(make("p", "Loading your golf schedule..."));
    if (status) status.textContent = "";

    try {
      if (!window.gallaspyAuth?.foursomeRequest) {
        throw new Error("Sign-in service is not ready.");
      }

      const result = await window.gallaspyAuth.foursomeRequest("/mine");

      const items = [];

      for (const round of (Array.isArray(result.hosting) ? result.hosting : [])) {
        if (round.status === "open" || round.status === "full") {
          items.push({ round, label: "HOSTING" });
        }
      }

      for (const request of (Array.isArray(result.joined) ? result.joined : [])) {
        if (!request.round) continue;

        if (request.status === "approved") {
          items.push({
            round: request.round,
            label: "CONFIRMED"
          });
        } else if (request.status === "pending") {
          items.push({
            round: request.round,
            label: "REQUEST PENDING"
          });
        }
      }

      items.sort((a, b) => {
        const first = a.round.round_date + "T" + a.round.tee_time;
        const second = b.round.round_date + "T" + b.round.tee_time;
        return first.localeCompare(second);
      });

      list.replaceChildren();

      if (!items.length) {
        list.append(make("p", "No upcoming golf rounds yet. Find golfers or host a round to get started."));
      } else {
        for (const item of items) {
          list.append(renderRound(item));
        }
      }



    } catch (error) {
      list.replaceChildren(
        make("p", error.message || "Unable to load your golf schedule.")
      );
    } finally {
      loading = false;
      refresh.disabled = false;
    }
  }

  refresh.addEventListener("click", loadCalendar);

  window.loadGallaspyGolfCalendar = loadCalendar;
})();
