(() => {
  "use strict";

  const welcome = document.getElementById("gallaspyWelcome");
  const signInButton = document.getElementById("gallaspyWelcomeSignIn");
  const createButton = document.getElementById("gallaspyWelcomeCreate");

  if (!welcome || !signInButton || !createButton) return;

  const app = document.querySelector(".app");

  function showWelcome() {
    if (authScreen) authScreen.hidden = true;
    if (app) app.hidden = true;
    welcome.hidden = false;
  }

  function hideWelcome() {
    welcome.hidden = true;
  }

  function enterClub() {
    hideWelcome();
    if (authScreen) authScreen.hidden = true;
    if (app) app.hidden = false;

    if (typeof window.showNativeScreen === "function") {
      window.showNativeScreen("home");
    }
  }

  const authScreen = document.getElementById("gallaspyAuthScreen");
  const backButton = document.getElementById("gallaspyAuthBack");

  function openAuthentication(mode) {
    window.gallaspyAuthMode = mode;

    hideWelcome();
    if (app) app.hidden = true;

    if (authScreen) {
      authScreen.hidden = false;
    }

    const heading = authScreen?.querySelector(".my-auth-panel h3");

    if (heading) {
      heading.textContent =
        mode === "signup" ? "CREATE YOUR ACCOUNT." : "PLAYER SIGN IN.";
    }

    document.getElementById("myAuthEmail")?.focus();
  }

  function returnToWelcome() {
    if (authScreen) authScreen.hidden = true;
    showWelcome();
  }

  backButton?.addEventListener("click", returnToWelcome);

  signInButton.addEventListener("click", () => {
    openAuthentication("signin");
  });

  createButton.addEventListener("click", () => {
    openAuthentication("signup");
  });

  window.addEventListener("gallaspy:auth-changed", (event) => {
    if (event.detail?.signedIn) {
      enterClub();
    } else if (authScreen?.hidden) {
      showWelcome();
    }
  });

  window.gallaspyWelcome = {
    show: showWelcome,
    hide: hideWelcome,
    enterClub,
    openAuthentication,
    returnToWelcome
  };
})();
