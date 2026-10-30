(() => {
  "use strict";
  const URL = "https://thegallaspy.com/api/mobile/community/avatar";
  const identity = document.querySelector("#nativeMyGallaspyScreen .my-identity-avatar");
  const settings = document.getElementById("mySettingsPanel");
  if (!identity || !settings) return;

  const image = document.createElement("img");
  image.className = "gallaspy-my-avatar-image";
  image.alt = "";
  image.hidden = true;
  identity.append(image);

  const panel = document.createElement("section");
  panel.className = "gallaspy-avatar-editor";
  panel.setAttribute("aria-label", "Profile picture");

  const title = document.createElement("h4");
  title.textContent = "PROFILE PICTURE";
  const description = document.createElement("p");
  description.textContent = "Choose a photo for your golfer profile and Community posts.";
  const chooser = document.createElement("input");
  chooser.type = "file";
  chooser.accept = "image/*";
  chooser.id = "gallaspyAvatarChooser";
  chooser.className = "gallaspy-avatar-file";
  chooser.setAttribute("aria-label", "Select a profile picture");
  const preview = document.createElement("img");
  preview.className = "gallaspy-avatar-preview";
  preview.alt = "Selected profile photo preview";
  preview.hidden = true;
  const actions = document.createElement("div");
  actions.className = "gallaspy-avatar-actions";
  const upload = document.createElement("button");
  upload.type = "button";
  upload.textContent = "SAVE PHOTO";
  upload.disabled = true;
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "gallaspy-avatar-remove";
  remove.textContent = "REMOVE PHOTO";
  const message = document.createElement("p");
  message.setAttribute("role", "status");
  message.setAttribute("aria-live", "polite");
  message.className = "gallaspy-avatar-status";
  actions.append(upload, remove);
  panel.append(title, description, chooser, preview, actions, message);
  const existingLabel = settings.querySelector('label[for="myPlayerName"]');
  settings.insertBefore(panel, existingLabel || settings.firstChild);

  let busy = false;
  let stagedBlob = null;
  let generation = 0;
  let signedIn = false;
  let sessionUserId = null;
  let previewUrl = null;

  async function currentSession() {
    const auth = window.gallaspyAuth;
    if (!auth) throw new Error("Sign in to manage your profile photo.");
    const [{ data, error }, token] = await Promise.all([
      auth.getUser(), auth.getCheckoutAccessToken(),
    ]);
    if (error || !data?.user || !token) {
      throw new Error("Sign in to manage your profile photo.");
    }
    return { token, userId: data.user.id };
  }

  async function call(method, blob) {
    const { token, userId } = await currentSession();
    if (!signedIn || userId !== sessionUserId) {
      throw new Error("Account changed. Sign in again before saving.");
    }
    const payload = blob ? new FormData() : undefined;
    if (blob) payload.append("photo", blob, "gallaspy-profile.jpg");
    const response = await fetch(URL, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      ...(payload ? { body: payload } : {}),
      cache: "no-store",
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) {
      throw new Error(result.error || "Unable to update profile picture.");
    }
    return result;
  }

  function setBusy(value) {
    busy = value;
    chooser.disabled = value || !signedIn;
    upload.disabled = value || !signedIn || !stagedBlob;
    remove.disabled = value || !signedIn;
  }

  function showAvatar(url) {
    const valid = typeof url === "string" && url.startsWith("https://");
    image.hidden = !valid;
    if (valid) image.src = url;
    else image.removeAttribute("src");
    identity.classList.toggle("gallaspy-has-avatar", valid);
    image.onerror = () => showAvatar(null);
    window.dispatchEvent(new CustomEvent("gallaspy:avatar-updated", {
      detail: { hasAvatar: valid },
    }));
  }

  function clearPreview() {
    chooser.value = "";
    preview.hidden = true;
    preview.removeAttribute("src");
    if (previewUrl) URLConstructor.revokeObjectURL(previewUrl);
    previewUrl = null;
    stagedBlob = null;
    setBusy(false);
  }

  async function load() {
    const current = ++generation;
    showAvatar(null);
    clearPreview();
    try {
      const { userId } = await currentSession();
      if (current !== generation) return;
      signedIn = true;
      sessionUserId = userId;
      setBusy(false);
      const result = await call("GET");
      if (current !== generation) return;
      showAvatar(result.avatar_url);
      message.textContent = result.avatar_url ? "Your profile photo is saved." : "Add a profile photo to personalize your account.";
    } catch {
      if (current !== generation) return;
      signedIn = false;
      sessionUserId = null;
      setBusy(false);
      message.textContent = "Sign in to add a profile photo.";
    }
  }

  async function makeSquareJpeg(file) {
    if (!file || file.size > 12 * 1024 * 1024) {
      throw new Error("Choose an image under 12 MB.");
    }
    const objectUrl = URLConstructor.createObjectURL(file);
    try {
      const src = new Image();
      await new Promise((resolve, reject) => {
        src.onload = resolve;
        src.onerror = reject;
        src.src = objectUrl;
      });
      if (!src.naturalWidth || !src.naturalHeight ||
          src.naturalWidth * src.naturalHeight > 50000000) {
        throw new Error("Image is too large to process.");
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Photo editor is unavailable.");
      const side = Math.min(src.naturalWidth, src.naturalHeight);
      const x = (src.naturalWidth - side) / 2;
      const y = (src.naturalHeight - side) / 2;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 512);
      ctx.drawImage(src, x, y, side, side, 0, 0, 512, 512);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", 0.82));
      if (!blob || blob.size > 1024 * 1024) throw new Error("Cannot optimize this photo.");
      return blob;
    } finally {
      URLConstructor.revokeObjectURL(objectUrl);
    }
  }

  const URLConstructor = window.URL;

  chooser.addEventListener("change", async () => {
    if (busy || !signedIn) return;
    setBusy(true);
    message.textContent = "Preparing your photo...";
    try {
      const file = chooser.files?.[0];
      if (!file) {
        stagedBlob = null;
        message.textContent = "Choose a photo to continue.";
        return;
      }
      stagedBlob = await makeSquareJpeg(file);
      if (previewUrl) URLConstructor.revokeObjectURL(previewUrl);
      previewUrl = URLConstructor.createObjectURL(stagedBlob);
      preview.src = previewUrl;
      preview.hidden = false;
      message.textContent = "Preview ready. Save to use this photo across Gallaspy.";
    } catch (error) {
      stagedBlob = null;
      message.textContent = error?.message || "Cannot prepare that photo.";
    } finally {
      setBusy(false);
    }
  });

  upload.addEventListener("click", async () => {
    if (busy || !stagedBlob || !signedIn) return;
    const started = generation;
    setBusy(true);
    message.textContent = "Saving profile photo...";
    try {
      const result = await call("POST", stagedBlob);
      if (generation !== started) return;
      showAvatar(result.avatar_url);
      clearPreview();
      message.textContent = "Profile photo saved. Refresh Community to see the update.";
    } catch (error) {
      if (generation === started) message.textContent = error?.message || "Photo could not be saved.";
    } finally {
      setBusy(false);
    }
  });

  remove.addEventListener("click", async () => {
    if (busy || !signedIn) return;
    const started = generation;
    setBusy(true);
    message.textContent = "Removing profile photo...";
    try {
      await call("DELETE");
      if (generation !== started) return;
      showAvatar(null);
      clearPreview();
      message.textContent = "Photo removed.";
    } catch (error) {
      if (generation === started) message.textContent = error?.message || "Photo could not be removed.";
    } finally {
      setBusy(false);
    }
  });

  window.addEventListener("gallaspy:auth-changed", event => {
    generation++;
    signedIn = false;
    sessionUserId = null;
    clearPreview();
    showAvatar(null);
    if (event.detail?.signedIn) load();
    else message.textContent = "Sign in to add a photo.";
  });
  load();
})();
