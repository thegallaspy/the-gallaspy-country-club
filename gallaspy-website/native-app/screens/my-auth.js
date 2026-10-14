(() => {
  "use strict";

  const CALLBACK_ORIGIN = "com.thegallaspy.app://auth";
  const CALLBACK_PATH = "/callback";

  const form = document.getElementById("myAuthForm");
  const emailInput = document.getElementById("myAuthEmail");
  const submitButton = document.getElementById("myAuthSubmit");
  const verifyForm = document.getElementById("myAuthVerifyForm");
  const codeInput = document.getElementById("myAuthCode");
  const verifyButton = document.getElementById("myAuthVerifySubmit");
  const resendButton = document.getElementById("myAuthResend");
  const signedInPanel = document.getElementById("myAuthSignedIn");
  const accountEmail = document.getElementById("myAuthAccountEmail");
  const signOutButton = document.getElementById("myAuthSignOut");
  const message = document.getElementById("myAuthMessage");

  if (!form || !window.gallaspyAuth) return;

  const emailMethod = document.getElementById("authMethodEmail");
  const phoneMethod = document.getElementById("authMethodPhone");
  const phoneNotice = document.getElementById("authPhoneNotice");

  function selectAuthMethod(method) {
    const isEmail = method === "email";

    emailMethod.setAttribute("aria-pressed", String(isEmail));
    phoneMethod.setAttribute("aria-pressed", String(!isEmail));

    form.hidden = !isEmail;
    phoneNotice.hidden = isEmail;
  }

  emailMethod?.addEventListener("click", () => {
    selectAuthMethod("email");
  });

  phoneMethod?.addEventListener("click", () => {
    selectAuthMethod("phone");
  });

  const auth = window.gallaspyAuth;
  const capacitorApp = window.Capacitor?.Plugins?.App;

  let processingCode = null;
  let pendingEmail = "";
  let busy = false;
  let lastSentAt = 0;
  const resendWaitMs = 60000;

  function setMessage(value) {
    message.textContent = value;
  }

  function setBusy(value) {
    busy = value;
    submitButton.disabled = value;
    verifyButton.disabled = value;
    resendButton.disabled = value;
    signOutButton.disabled = value;
  }

  async function refreshAccount() {
    const { data, error } = await auth.getUser();

    if (error || !data?.user) {
      form.hidden = Boolean(pendingEmail);
      verifyForm.hidden = !pendingEmail;
      signedInPanel.hidden = true;
      accountEmail.textContent = "";
      window.dispatchEvent(new CustomEvent(
        "gallaspy:auth-changed",
        { detail: { signedIn: false } }
      ));
      return;
    }

    form.hidden = true;
    verifyForm.hidden = true;
    signedInPanel.hidden = false;
    pendingEmail = "";
    codeInput.value = "";
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

  async function sendCode(email) {
    if (busy) return;

    const remaining = resendWaitMs - (Date.now() - lastSentAt);

    if (remaining > 0) {
      setMessage(
        "Please wait " + Math.ceil(remaining / 1000) +
        " seconds before requesting another code."
      );
      return;
    }

    setBusy(true);
    setMessage("Sending your verification code...");

    try {
      const { error } = await auth.signIn(email);
      if (error) throw error;

      pendingEmail = email;
      lastSentAt = Date.now();
      form.hidden = true;
      verifyForm.hidden = false;
      codeInput.value = "";

      setMessage("Enter the six-digit code sent to " + email);
      codeInput.focus();
    } catch (error) {
      setMessage(
        error?.message ||
        "Unable to send verification code. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    if (!email || !emailInput.checkValidity()) return;

    await sendCode(email);
  });

  verifyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (busy || !pendingEmail) return;

    const token = codeInput.value.trim();

    if (!/^[0-9]{6}$/.test(token)) {
      setMessage("Enter the complete six-digit code.");
      return;
    }

    setBusy(true);
    setMessage("Verifying your code...");

    try {
      const { error } = await auth.verifyEmailCode(
        pendingEmail,
        token
      );

      if (error) throw error;

      await refreshAccount();
    } catch {
      setMessage(
        "Code invalid or expired. Check your email or resend."
      );
    } finally {
      setBusy(false);
    }
  });

  resendButton.addEventListener("click", async () => {
    if (!pendingEmail) return;
    await sendCode(pendingEmail);
  });

  const headerSignOutButton =
    document.getElementById("gallaspyHeaderSignOut");

  async function handleSignOut() {
    if (busy) return;

    setBusy(true);
    if (headerSignOutButton) {
      headerSignOutButton.disabled = true;
    }

    try {
      const { error } = await auth.signOut();

      if (error) throw error;

      pendingEmail = "";
      emailInput.value = "";
      codeInput.value = "";

      await refreshAccount();
      setMessage("You have signed out.");
      window.gallaspyWelcome?.show();
    } catch {
      setMessage("Unable to sign out. Please try again.");
    } finally {
      setBusy(false);
      if (headerSignOutButton) {
        headerSignOutButton.disabled = false;
      }
    }
  }

  signOutButton.addEventListener("click", handleSignOut);
  headerSignOutButton?.addEventListener("click", handleSignOut);

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
      window.gallaspyWelcome?.show();
    }
  }

  initialize();
})();
