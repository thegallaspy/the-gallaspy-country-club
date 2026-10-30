(() => {
  "use strict";

  const panel = document.getElementById("myCloudProfile");
  const name = document.getElementById("myCloudPlayerName");
  const location = document.getElementById("myCloudPlayerLocation");
  const handicap = document.getElementById("myCloudPlayerHandicap");
  const message = document.getElementById("myCloudPlayerMessage");

  if (!panel || !window.gallaspyAuth) return;

  let requestVersion = 0;

  const identityName = document.getElementById("myIdentityName");
  const identityStatus = document.getElementById("myIdentityStatus");
  const identityGolfId = document.getElementById("myIdentityGolfId");
  const identityHandicap = document.getElementById("myIdentityHandicap");
  const identityInitials = document.getElementById("myIdentityInitials");

  function updateIdentity({
    name: playerName = "GALLASPY GOLFER",
    status = "APP ACCOUNT",
    golfId = "NOT ASSIGNED",
    handicap = "—"
  } = {}) {
    if (identityName) identityName.textContent = playerName;
    if (identityStatus) identityStatus.textContent = status;
    if (identityGolfId) identityGolfId.textContent = golfId;
    if (identityHandicap) identityHandicap.textContent = handicap;

    if (identityInitials) {
      const initials = playerName
        .trim()
        .split(/\\s+/)
        .slice(0, 2)
        .map(part => part.charAt(0))
        .join("")
        .toUpperCase();

      identityInitials.textContent = initials || "G";
    }
  }

  function localDisplayName() {
    try {
      const profile = JSON.parse(
        localStorage.getItem("gallaspy-player-profile-v1") || "{}"
      );
      return typeof profile.name === "string" && profile.name.trim()
        ? profile.name.trim()
        : "GALLASPY GOLFER";
    } catch {
      return "GALLASPY GOLFER";
    }
  }


  function clearProfile() {
    requestVersion++;
    window.gallaspyVerifiedPlayerName = null;
    window.dispatchEvent(new Event("gallaspy:verified-player-updated"));
    updateIdentity({
      name: localDisplayName(),
      status: "SIGN IN TO VERIFY YOUR PLAYER PROFILE"
    });
    const greeting = document.getElementById("myPlayerGreeting");
    if (greeting) greeting.textContent = "WELCOME, GOLFER.";
    panel.hidden = true;
    name.textContent = "PLAYER PROFILE.";
    location.textContent = "";
    handicap.textContent = "";
    message.textContent = "";
  }

  async function loadPlayer() {
    const version = ++requestVersion;

    panel.hidden = false;
    name.textContent = "LOADING PROFILE...";
    updateIdentity({
      name: localDisplayName(),
      status: "CHECKING PLAYER RECORD..."
    });
    location.textContent = "";
    handicap.textContent = "";
    message.textContent = "";

    try {
      const result = await window.gallaspyAuth.getPlayer();

      if (version !== requestVersion) return;

      if (!result.player_found || !result.player) {
        name.textContent = "PLAYER RECORD NOT FOUND.";
        updateIdentity({
          name: localDisplayName(),
          status: "APP ACCOUNT — PLAYER RECORD NOT LINKED"
        });
        message.textContent =
          "Your email is authenticated, but no Gallaspy player record is linked to it.";
        return;
      }

      const player = result.player;

      const fullName = [player.first_name, player.last_name]
        .filter(Boolean)
        .join(" ")
        .trim();

      const greeting = document.getElementById("myPlayerGreeting");

      window.gallaspyVerifiedPlayerName = fullName || null;
      window.dispatchEvent(new Event("gallaspy:verified-player-updated"));

      if (greeting && fullName) {
        greeting.textContent = `WELCOME, ${fullName.toUpperCase()}.`;
      }

      name.textContent =
        [player.first_name, player.last_name]
          .filter(Boolean)
          .join(" ") || "GALLASPY PLAYER";

      location.textContent =
        [player.city, player.state]
          .filter(Boolean)
          .join(", ");

      handicap.textContent =
        player.handicap_index != null
          ? "HANDICAP INDEX: " + player.handicap_index
          : "HANDICAP INDEX: NOT RECORDED";

      const golfId =
        player.golf_id_number != null
          ? "GGC-" + String(player.golf_id_number).padStart(6, "0")
          : null;

      updateIdentity({
        name: fullName || localDisplayName(),
        status: "VERIFIED GALLASPY PLAYER",
        golfId: golfId || "NOT ASSIGNED",
        handicap: player.handicap_index != null
          ? String(player.handicap_index)
          : "—"
      });

      message.textContent = golfId
        ? "GALLASPY GOLF ID: " + golfId
        : "Verified Gallaspy player record.";
    } catch {
      if (version !== requestVersion) return;

      name.textContent = "PROFILE UNAVAILABLE.";
      updateIdentity({
        name: localDisplayName(),
        status: "PLAYER PROFILE TEMPORARILY UNAVAILABLE"
      });
      message.textContent =
        "Unable to retrieve your player record. Please try again later.";
    }
  }

  window.addEventListener("gallaspy:profile-updated", () => {
    if (!window.gallaspyVerifiedPlayerName) {
      updateIdentity({
        name: localDisplayName(),
        status: identityStatus?.textContent ||
          "SIGN IN TO VERIFY YOUR PLAYER PROFILE"
      });
    }
  });

  window.addEventListener("gallaspy:auth-changed", (event) => {
    if (event.detail?.signedIn) {
      loadPlayer();
    } else {
      clearProfile();
    }
  });
})();
