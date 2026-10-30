(() => {
  "use strict";

  const $ = id => document.getElementById(id);

  const message = $("myMembershipMessage");
  const status = $("myMembershipStatus");
  const number = $("myMembershipNumber");
  const type = $("myMembershipType");
  const founder = $("myMembershipFounder");
  const benefitsMessage = $("myMembershipBenefitsMessage");

  if (!message || !status || !number || !type || !founder) return;

  let requestVersion = 0;

  function display({
    text,
    membershipStatus = "NOT VERIFIED",
    membershipNumber = "—",
    membershipType = "—",
    founderNumber = "—",
    benefitsText = "Sign in to check your membership benefits."
  }) {
    message.textContent = text;
    status.textContent = membershipStatus;
    number.textContent = membershipNumber;
    type.textContent = membershipType;
    founder.textContent = founderNumber;
    if (benefitsMessage) benefitsMessage.textContent = benefitsText;
  }

  function signedOut() {
    requestVersion++;

    display({
      text: "Sign in to check your official club membership."
    });
  }

  async function refresh() {
    const version = ++requestVersion;
    const auth = window.gallaspyAuth;

    if (!auth?.getUser || !auth?.getMembership) {
      display({
        text: "Membership verification is not available yet.",
        membershipStatus: "UNAVAILABLE"
      });
      return;
    }

    display({
      text: "Checking your official membership record...",
      membershipStatus: "CHECKING"
    });

    try {
      const { data, error } = await auth.getUser();

      if (version !== requestVersion) return;

      if (error || !data?.user) {
        signedOut();
        return;
      }

      const result = await auth.getMembership();

      if (version !== requestVersion) return;

      if (!result.membership_found || !result.membership) {
        display({
          text: "You have a free Gallaspy app account. Standard Club Membership is $100 per month. Paid enrollment is being prepared.",
          membershipStatus: "FREE ACCOUNT",
          benefitsText: "Discover what it means to belong to The Gallaspy."
        });
        return;
      }

      const membership = result.membership;

      const approved = membership.is_official_member === true;
      const falcon = membership.is_falcon_society_member === true;
      const accessStatus = membership.access_status;

      const membershipLabel = approved
        ? falcon ? "FALCON SOCIETY" : "ACTIVE STANDARD MEMBER"
        : accessStatus === "suspended" ? "SUSPENDED" : "INACTIVE";

      const membershipMessage = approved
        ? falcon
          ? "Welcome to the Founding 100. Your place in Gallaspy history."
          : "Welcome to The Gallaspy Golf Club. Your place is here."
        : accessStatus === "suspended"
          ? "Your membership requires attention. Contact the club for assistance."
          : "Your membership is not currently active.";

      display({
        text: membershipMessage,
        membershipStatus: membershipLabel,
        benefitsText: approved ? (falcon ? "Falcon Society membership verified. Founder privileges apply." : "Standard Membership verified. Eligible benefits are available.") : "No active membership verified. Benefits are unavailable.",
        membershipNumber: approved
          ? membership.membership_number || "—"
          : "—",
        membershipType: approved
          ? falcon ? "FALCON SOCIETY" : "STANDARD"
          : "—",
        founderNumber: approved && falcon &&
          Number.isInteger(membership.founder_number)
          ? String(membership.founder_number).padStart(3, "0") + " / 100"
          : "—"
      });
    } catch {
      if (version !== requestVersion) return;

      display({
        text: "Unable to verify membership right now. Please try again later.",
        membershipStatus: "UNAVAILABLE"
      });
    }
  }

  $("myMembership")?.addEventListener("click", () => {
    // Live enrollment is disabled on the website. Never activate membership client-side.
    window.openClubRoute?.("/membership");
  });

  window.addEventListener("gallaspy:auth-changed", event => {
    if (event.detail?.signedIn) refresh();
    else signedOut();
  });

  window.gallaspyMembership = { refresh };

  signedOut();
})();
