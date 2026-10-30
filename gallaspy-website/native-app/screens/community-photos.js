(() => {
  "use strict";

  const API = "https://thegallaspy.com/api/mobile/community/photo-post";
  const input = document.getElementById("communityPhotoFiles");
  const preview = document.getElementById("communityPhotoPreview");
  const info = document.getElementById("communityPhotoInfo");
  const remove = document.getElementById("communityRemovePhotos");
  if (!input || !preview || !info || !remove) return;

  const MAX_PHOTOS = 4;
  const MAX_IMAGE_SIZE = 12 * 1024 * 1024;
  let photos = [];
  let urls = [];
  let processing = false;
  let selectionId = 0;

  function releasePreviews() {
    urls.forEach((url) => URL.revokeObjectURL(url));
    urls = [];
    preview.replaceChildren();
  }

  async function optimize(file) {
    if (!file || !file.type.startsWith("image/") || file.size > MAX_IMAGE_SIZE) {
      throw new Error("Choose a photo under 12 MB.");
    }
    const source = URL.createObjectURL(file);
    try {
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error("This photo could not be opened."));
        image.src = source;
      });
      if (!image.naturalWidth || !image.naturalHeight ||
          image.naturalWidth * image.naturalHeight > 50_000_000) {
        throw new Error("Photo resolution is too large.");
      }
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Photo editor unavailable.");
      for (const maxSide of [1600, 1280, 960]) {
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.80));
        if (blob && blob.size >= 100 && blob.size <= 1_800_000) return blob;
      }
      throw new Error("Unable to compress this photo. Choose a smaller image.");
    } finally {
      URL.revokeObjectURL(source);
    }
  }

  function clear() {
    selectionId++;
    processing = false;
    photos = [];
    input.value = "";
    releasePreviews();
    info.textContent = "Add up to four course or golf photos.";
    remove.hidden = true;
  }

  remove.addEventListener("click", clear);

  input.addEventListener("change", async () => {
    const generation = ++selectionId;
    const files = Array.from(input.files || []);
    photos = [];
    releasePreviews();
    remove.hidden = true;
    if (!files.length) {
      info.textContent = "Add up to four course or golf photos.";
      return;
    }
    if (files.length > MAX_PHOTOS) {
      info.textContent = "Choose no more than four photos.";
      input.value = "";
      return;
    }
    processing = true;
    info.textContent = "Preparing your photos…";
    try {
      const optimized = [];
      for (const file of files) {
        optimized.push(await optimize(file));
        if (generation !== selectionId) return;
      }
      if (generation !== selectionId) return;
      photos = optimized;
      photos.forEach((photo, index) => {
        const url = URL.createObjectURL(photo);
        urls.push(url);
        const img = document.createElement("img");
        img.src = url;
        img.alt = `Photo ${index + 1} ready to post`;
        img.className = "gallaspy-community-photo-preview";
        preview.append(img);
      });
      info.textContent = `${photos.length} photo${photos.length === 1 ? "" : "s"} ready. Photos are visible to signed-in Community golfers after publishing.`;
      remove.hidden = false;
    } catch (error) {
      photos = [];
      input.value = "";
      releasePreviews();
      info.textContent = error.message || "Unable to prepare photos.";
    } finally {
      if (generation === selectionId) processing = false;
    }
  });

  window.gallaspyCommunityPhotos = {
    hasPhotos: () => photos.length > 0,
    isPreparing: () => processing,
    clear,
    async publish(caption) {
      if (processing) throw new Error("Wait for your photos to finish preparing.");
      if (photos.length < 1 || photos.length > MAX_PHOTOS) {
        throw new Error("Choose one to four photos.");
      }
      const accessToken = await window.gallaspyAuth?.getCheckoutAccessToken?.();
      if (!accessToken) throw new Error("Sign in to share Community photos.");
      const form = new FormData();
      form.append("body", caption);
      photos.forEach((photo, index) => form.append("photos", photo, `gallaspy-${index + 1}.jpg`));
      // FormData sets the multipart boundary itself; never set Content-Type here.
      const response = await fetch(API, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: form,
        cache: "no-store",
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        throw new Error(result?.error ||
          (response.status === 404
            ? "Photo posting is not deployed yet. Please try again later."
            : "Unable to publish Community photos."));
      }
      return result;
    },
  };
})();
