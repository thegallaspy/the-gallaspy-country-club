/* Gallaspy Standard Membership — authenticated, confirmed cancellation controls. */
(() => {
  "use strict";

  const root = document.getElementById("myMembershipSection");
  if (!root) return;

  const API = "https://thegallaspy.com/api/mobile/membership/cancel";
  const el = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };

  const card = el("section", "gallaspy-cancel-card");
  card.hidden = true;
  card.setAttribute("aria-label", "Standard Membership billing management");
  const heading = el("h4", "gallaspy-cancel-title", "MANAGE YOUR MEMBERSHIP");
  const summary = el("p", "gallaspy-cancel-summary");
  const note = el("p", "gallaspy-cancel-note");
  const feedback = el("p", "gallaspy-cancel-feedback");
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  const requestButton = el("button", "gallaspy-cancel-link", "Cancel future renewals");
  requestButton.type = "button";
  requestButton.hidden = true;
  const confirm = el("div", "gallaspy-cancel-confirm");
  confirm.hidden = true;
  const question = el("p", "gallaspy-cancel-question",
    "Cancel your $100/month Standard Membership? This requests that Square stop future recurring payments. It does not issue a refund. Verified, unrefunded paid-period benefits continue until their eligible period ends.");
  const actions = el("div", "gallaspy-cancel-actions");
  const keepButton = el("button", "gallaspy-cancel-keep", "Keep membership");
  keepButton.type = "button";
  const confirmButton = el("button", "gallaspy-cancel-confirm-button", "Confirm cancellation");
  confirmButton.type = "button";
  actions.append(keepButton, confirmButton);
  confirm.append(question, actions);
  card.append(heading, summary, note, feedback, requestButton, confirm);
  root.insertBefore(card, document.getElementById("myMembership") || null);

  let generation = 0;
  let pending = false;
  let eligible = false;

  function formatDate(date) {
    if (typeof date !== "string" || !date) return null;
    const parsed = new Date(date);
    if (!Number.isFinite(parsed.getTime())) return null;
    return new Intl.DateTimeFormat("en-US", {
      month: "long", day: "numeric", year: "numeric"
    }).format(parsed);
  }

  function stateReset() {
    generation++;
    pending = false;
    eligible = false;
    card.hidden = true;
    requestButton.hidden = true;
    confirm.hidden = true;
    requestButton.disabled = false;
    confirmButton.disabled = false;
    keepButton.disabled = false;
    summary.textContent = "";
    note.textContent = "";
    feedback.textContent = "";
  }

  async function api(method) {
    const token = await window.gallaspyAuth?.getCheckoutAccessToken?.();
    if (!token || typeof token !== "string") {
      throw new Error("Sign in to manage your membership.");
    }
    const response = await fetch(API, {
      method,
      headers: { Authorization: "Bearer " + token },
      cache: "no-store"
    });
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Unable to read the membership service response.");
    }
    if (!response.ok || data?.success !== true) {
      throw new Error(data?.error || "Unable to confirm membership billing status.");
    }
    return data;
  }

  function render(data) {
    if (!data.has_subscription) {
      stateReset();
      return;
    }
    card.hidden = false;
    confirm.hidden = true;
    feedback.textContent = "";
    const endDate = formatDate(data.current_period_end);
    note.textContent = endDate
      ? `Current billing period ends ${endDate}. Eligibility still requires a verified, unrefunded payment.`
      : "Your eligible paid-through date is being verified. Contact the club if you need help.";

    const scheduled = data.cancellation_scheduled === true;
    eligible = !scheduled && data.can_request_cancellation === true;
    requestButton.hidden = !eligible;
    requestButton.disabled = false;
    if (scheduled) {
      summary.textContent = "Cancellation scheduled. Future $100 monthly renewals have been requested to stop.";
    } else if (eligible) {
      summary.textContent = "Standard Membership · $100/month recurring. You can stop future renewals here.";
    } else {
      summary.textContent = "This subscription needs assistance to manage billing. Contact the club to request cancellation.";
    }
  }

  async function refresh() {
    if (pending) return;
    const version = ++generation;
    eligible = false;
    requestButton.hidden = true;
    confirm.hidden = true;
    card.hidden = true;
    try {
      const data = await api("GET");
      if (generation !== version) return;
      render(data);
    } catch (error) {
      if (generation !== version) return;
      card.hidden = false;
      summary.textContent = "Unable to load membership billing controls.";
      note.textContent = "If you need to cancel, contact the club through the website.";
      feedback.textContent = error?.message || "Please try again later.";
    }
  }

  requestButton.addEventListener("click", () => {
    if (!eligible || pending) return;
    requestButton.hidden = true;
    confirm.hidden = false;
    feedback.textContent = "";
    confirmButton.focus();
  });

  keepButton.addEventListener("click", () => {
    if (pending) return;
    confirm.hidden = true;
    requestButton.hidden = !eligible;
    requestButton.focus();
  });

  confirmButton.addEventListener("click", async () => {
    if (pending || !eligible || confirm.hidden) return;
    pending = true;
    eligible = false;
    const version = ++generation;
    confirmButton.disabled = true;
    keepButton.disabled = true;
    feedback.textContent = "Submitting your cancellation request to Square...";
    try {
      const data = await api("POST");
      if (version !== generation) return;
      if (data.cancellation_scheduled !== true) {
        throw new Error("Square has not confirmed the cancellation schedule.");
      }
      confirm.hidden = true;
      requestButton.hidden = true;
      summary.textContent = "Cancellation confirmed with Square. Future monthly renewals have been scheduled to stop.";
      const until = formatDate(data.current_period_end);
      note.textContent = until
        ? `Current billing period ends ${until}. Eligible benefits depend on a verified, unrefunded payment.`
        : "Check your membership status above for verified access and paid-through eligibility.";
      feedback.textContent = "Your cancellation request was confirmed. Save this screen for your records.";
      window.gallaspyMembership?.refresh?.();
    } catch (error) {
      if (version !== generation) return;
      confirm.hidden = true;
      requestButton.hidden = true; // don't retry blindly: Square may have accepted the first request
      summary.textContent = "Cancellation status needs verification.";
      note.textContent = "Do not start a new subscription. Contact club support or reopen Membership to check again.";
      feedback.textContent = error?.message || "Unable to verify cancellation.";
    } finally {
      if (version === generation) {
        pending = false;
        confirmButton.disabled = false;
        keepButton.disabled = false;
      }
    }
  });

  window.addEventListener("gallaspy:auth-changed", event => {
    if (event.detail?.signedIn) refresh();
    else stateReset();
  });

  window.gallaspyMembershipCancellation = { refresh };
})();
