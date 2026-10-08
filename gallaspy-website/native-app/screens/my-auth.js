(() => {
  "use strict";

  const CALLBACK_ORIGIN = "com.thegallaspy.app://auth";
  const CALLBACK_PATH = "/callback";

  const form = document.getElementById("myAuthForm");
  const emailInput = document.getElementById("myAuthEmail");
  const submitButton = document.getElementById("myAuthSubmit");
  const signedInPanel = document.getElementById("myAuthSignedIn");
  const accountEmail = document.getElementById("myAuthAccountEmail");
  const signOutButton = document.getElementById("myAuthSignOut");
  const message = document.getElementById("myAuthMessage");

  if (!form || !window.gallaspyAuth) return;

  const auth = window.gallaspyAuth;
  const capacitorApp = window.Capacitor?.Plugins?.App;

  let processingCode = null;

  function setMessage(value) {
    message.textContent = value;
  }

  function setBusy(busy) {
    submitButton.disabled = busy;
    signOutButton.disabled = busy;
  }

  async function refreshAccount() {
    const { data, error } = await auth.getUser();

    if (error || !data?.user) {
      form.hidden = false;
      signedInPanel.hidden = true;
      accountEmail.textContent = "";
      window.dispatchEvent(new CustomEvent(
        "gallaspy:auth-changed",
        { detail: { signedIn: false } }
      ));
      return;
    }

    form.hidden = true;
    signedInPanel.hidden = false;
    accountEmail.textContent = data.user.email || "SIGNED IN";
    window.dispatchEvent(new CustomEvent(
      "gallaspy:auth-changed",
      { detail: { signedIn: true } }
    ));

    setMessage("Your Gallaspy account is connected.");
  }

  async function handleCallback(rawUrl) {
    let url;

    try {
      url = new URL(rawUrl);
    } catch {
      return;
    }

    if (
      url.origin !== CALLBACK_ORIGIN ||
      url.pathname !== CALLBACK_PATH
    ) {
      return;
    }

    const authError = url.searchParams.get("error_description");

    if (authError) {
      setMessage("Sign-in link was not accepted. Please request a new link.");
      return;
    }

    const code = url.searchParams.get("code");

    if (!code || processingCode === code) return;

    processingCode = code;
    setBusy(true);
    setMessage("Completing secure sign-in...");

    try {
      const { error } = await auth.exchangeCode(code);

      if (error) throw error;

      await refreshAccount();
    } catch {
      setMessage(
        "Unable to complete sign-in. Request a new link on this iPhone."
      );
    } finally {
      processingCode = null;
      setBusy(false);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    if (!email || !emailInput.checkValidity()) return;

    setBusy(true);
    setMessage("Sending your sign-in link...");

    try {
      const { error } = await auth.signIn(email);

      if (error) throw error;

      setMessage(
        "Check your email on this iPhone and open the sign-in link."
      );
    } catch {
      setMessage("Unable to send the link. Please try again.");
    } finally {
      setBusy(false);
    }
  });

  signOutButton.addEventListener("click", async () => {
    setBusy(true);

    try {
      const { error } = await auth.signOut();

      if (error) throw error;

      await refreshAccount();
      setMessage("You have signed out.");
    } catch {
      setMessage("Unable to sign out. Please try again.");
    } finally {
      setBusy(false);
    }
  });

  async function initialize() {
    try {
      if (capacitorApp?.addListener) {
        await capacitorApp.addListener(
          "appUrlOpen",
          ({ url }) => handleCallback(url)
        );
      }

      if (capacitorApp?.getLaunchUrl) {
        const launch = await capacitorApp.getLaunchUrl();

        if (launch?.url) {
          await handleCallback(launch.url);
        }
      }

      await refreshAccount();
    } catch {
      setMessage("Account service is temporarily unavailable.");
    }
  }

  initialize();
})();
