(() => {
  "use strict";

  const panel = document.getElementById("myRoundAdmin");
  const button = document.getElementById("myAdminVerify");
  const message = document.getElementById("myAdminMessage");

  if (!panel || !button || !message) return;

  let requestVersion = 0;

  function hidePanel() {
    panel.hidden = true;
    button.disabled = true;
    message.textContent = "";
  }

  async function checkAdminAccess() {
    const version = ++requestVersion;
    hidePanel();

    const auth = window.gallaspyAuth;

    if (!auth?.getUser || !auth?.getAdminAccess) return;

    try {
      const identity = await auth.getUser();
      if (version !== requestVersion) return;

      const user = identity?.data?.user;
      if (identity?.error || !user?.id) return;

      const access = await auth.getAdminAccess();
      if (version !== requestVersion) return;

      const current = await auth.getUser();
      if (version !== requestVersion) return;

      if (
        current?.error ||
        current?.data?.user?.id !== user.id
      ) return;

      if (
        access.success === true &&
        access.is_admin === true &&
        ["owner", "admin"].includes(access.role)
      ) {
        panel.hidden = false;
        button.disabled = false;
        message.textContent =
          "Administrator access confirmed. Verification is not yet enabled.";
      }
    } catch {
      if (version === requestVersion) {
        hidePanel();
      }
    }
  }

  function confirmRoundVerification(eventId, playerId, isHost) {
    const role = isHost ? "OFFICIAL HOST (200 points)" : "ATTENDEE (100 points)";

    return window.confirm(
      "VERIFY OFFICIAL GALLASPY ROUND\n\n" +
      "Round: " + eventId + "\n" +
      "Player: " + playerId + "\n" +
      "Role: " + role + "\n\n" +
      "Confirm that this player actually participated in the completed " +
      "official round. This action may award Club Points and cannot " +
      "be undone from this screen."
    );
  }

  async function submitRoundVerification() {
    if (panel.hidden || button.disabled) return;

    const eventId = document.getElementById("myAdminEventId")?.value.trim();
    const playerId = document.getElementById("myAdminPlayerId")?.value.trim();
    const role = document.getElementById("myAdminRole")?.value;

    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!eventId || !/^[a-zA-Z0-9_-]{1,120}$/.test(eventId) ||
        !playerId || !uuidPattern.test(playerId) ||
        !["attendee", "host"].includes(role)) {
      message.textContent = "Enter a valid round ID, player ID, and role.";
      return;
    }

    const isHost = role === "host";

    if (!confirmRoundVerification(eventId, playerId, isHost)) return;

    const version = requestVersion;
    button.disabled = true;
    message.textContent = "Verifying official round...";

    try {
      const auth = window.gallaspyAuth;
      if (!auth?.getAdminAccess || !auth?.verifyOfficialRound) {
        throw new Error("Verification service unavailable.");
      }

      if (!auth.getUser) {
        throw new Error("Authentication service unavailable.");
      }

      const initial = await auth.getUser();
      if (version !== requestVersion) return;

      const initialUserId = initial?.data?.user?.id;
      if (initial?.error || !initialUserId) {
        throw new Error("Please sign in again.");
      }

      const access = await auth.getAdminAccess();
      if (version !== requestVersion) return;

      const current = await auth.getUser();
      if (version !== requestVersion) return;

      if (
        current?.error ||
        current?.data?.user?.id !== initialUserId
      ) {
        throw new Error("Account changed. Please try again.");
      }

      if (access.is_admin !== true ||
          !["owner", "admin"].includes(access.role)) {
        throw new Error("Administrator access required.");
      }

      const result = await auth.verifyOfficialRound(
        eventId, playerId, isHost
      );

      if (version !== requestVersion) return;

      message.textContent =
        "Round verified. " +
        (result.rewards?.points_awarded ?? 0) +
        " Club Points awarded for this processing request.";
    } catch (error) {
      if (version !== requestVersion) return;
      message.textContent =
        error?.message || "Unable to verify this round.";
    } finally {
      if (version === requestVersion && !panel.hidden) {
        button.disabled = false;
      }
    }
  }

  button.addEventListener("click", submitRoundVerification);

  window.addEventListener("gallaspy:auth-changed", () => {
    ++requestVersion;
    hidePanel();
    checkAdminAccess();
  });

  document.querySelector('[data-route="/my-gallaspy"]')
    ?.addEventListener("click", checkAdminAccess);

  hidePanel();
  checkAdminAccess();
})();
