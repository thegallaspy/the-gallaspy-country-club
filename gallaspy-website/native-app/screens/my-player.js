(() => {
  "use strict";

  const panel = document.getElementById("myCloudProfile");
  const name = document.getElementById("myCloudPlayerName");
  const location = document.getElementById("myCloudPlayerLocation");
  const handicap = document.getElementById("myCloudPlayerHandicap");
  const message = document.getElementById("myCloudPlayerMessage");

  if (!panel || !window.gallaspyAuth) return;

  let requestVersion = 0;

  function clearProfile() {
    requestVersion++;
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
    location.textContent = "";
    handicap.textContent = "";
    message.textContent = "";

    try {
      const result = await window.gallaspyAuth.getPlayer();

      if (version !== requestVersion) return;

      if (!result.player_found || !result.player) {
        name.textContent = "PLAYER RECORD NOT FOUND.";
        message.textContent =
          "Your email is authenticated, but no Gallaspy player record is linked to it.";
        return;
      }

      const player = result.player;

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

      message.textContent = "Verified Gallaspy player record.";
    } catch {
      if (version !== requestVersion) return;

      name.textContent = "PROFILE UNAVAILABLE.";
      message.textContent =
        "Unable to retrieve your player record. Please try again later.";
    }
  }

  window.addEventListener("gallaspy:auth-changed", (event) => {
    if (event.detail?.signedIn) {
      loadPlayer();
    } else {
      clearProfile();
    }
  });
})();
