(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const available = $("myAvailablePoints");
  const lifetime = $("myLifetimePoints");
  const message = $("myPointsMessage");
  const activity = $("myPointsActivity");
  if (!available || !lifetime || !message || !activity) return;

  let requestVersion = 0;
  const numberFormat = new Intl.NumberFormat("en-US");

  function reset(status) {
    available.textContent = "—";
    lifetime.textContent = "—";
    activity.replaceChildren();
    const empty = document.createElement("p");
    empty.className = "my-empty";
    empty.textContent = "No points activity to display.";
    activity.append(empty);
    message.textContent = status;
  }

  function displayNumber(value) {
    const n = Number(value);
    return Number.isSafeInteger(n) && n >= 0
      ? numberFormat.format(n)
      : "—";
  }

  function renderHistory(transactions) {
    activity.replaceChildren();
    if (!Array.isArray(transactions) || !transactions.length) {
      const empty = document.createElement("p");
      empty.className = "my-empty";
      empty.textContent = "No points activity yet.";
      activity.append(empty);
      return;
    }

    transactions.forEach(transaction => {
      const row = document.createElement("div");
      row.className = "my-points-activity-row";
      const details = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = transaction.description || "Club Points activity";
      const date = document.createElement("span");
      const parsed = new Date(transaction.created_at);
      date.textContent = Number.isNaN(parsed.getTime())
        ? "Date unavailable"
        : parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      details.append(title, date);
      const points = document.createElement("strong");
      const n = Number(transaction.points);
      points.textContent = Number.isSafeInteger(n)
        ? `${n > 0 ? "+" : ""}${numberFormat.format(n)} pts`
        : "—";
      row.append(details, points);
      activity.append(row);
    });
  }

  async function refreshPoints() {
    const version = ++requestVersion;
    reset("Checking your Club Points account…");
    const auth = window.gallaspyAuth;
    if (!auth?.getUser || !auth?.getClubPoints) {
      reset("Club Points are unavailable right now.");
      return;
    }

    try {
      const result = await auth.getUser();
      if (version !== requestVersion) return;
      // The existing auth helper may return either a user or a Supabase-style result.
      const user = result?.data?.user ?? result?.user ?? result;
      if (!user?.id) {
        reset("Sign in to view your Club Points.");
        return;
      }
      message.textContent = "Loading your Club Points…";
      const data = await auth.getClubPoints();
      if (version !== requestVersion) return;
      const current = await auth.getUser();
      if (version !== requestVersion) return;
      if (current?.error || current?.data?.user?.id !== user.id) {
        reset("Account changed. Refresh Club Points to continue.");
        return;
      }
      available.textContent = displayNumber(data.available_points);
      lifetime.textContent = displayNumber(data.lifetime_earned);
      renderHistory(data.transactions);
      message.textContent = "Your current Club Points balance.";
    } catch (error) {
      if (version !== requestVersion) return;
      reset(error?.message || "Unable to load Club Points. Please try again.");
    }
  }

  window.addEventListener("gallaspy:auth-changed", event => {
    ++requestVersion;
    if (event?.detail?.signedIn === false) {
      reset("Sign in to view your Club Points.");
    } else {
      refreshPoints();
    }
  });

  document.querySelector('[data-route="/my-gallaspy"]')
    ?.addEventListener("click", refreshPoints);

  reset("Sign in to view your Club Points.");
  refreshPoints();
})();
