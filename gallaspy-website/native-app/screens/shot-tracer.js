(() => {
  "use strict";

  const input = document.getElementById("shotTracerVideo");
  const stage = document.getElementById("shotTracerStage");
  const video = document.getElementById("shotTracerPreview");
  const status = document.getElementById("shotTracerStatus");

  if (!input || !video || !status) return;

  let videoURL = null;

  input.addEventListener("change", () => {
    const file = input.files?.[0];

    if (videoURL) {
      URL.revokeObjectURL(videoURL);
      videoURL = null;
    }

    video.pause();
    video.removeAttribute("src");
    video.load();
    stage.hidden = true;

    if (!file) {
      status.textContent = "Select a video to begin.";
      return;
    }

    if (!file.type.startsWith("video/")) {
      status.textContent = "Please select a video file.";
      return;
    }

    videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    stage.hidden = false;
    video.load();

    status.textContent = "Loading your golf shot…";
  });

  video.addEventListener("loadedmetadata", () => {
    status.textContent = "Video ready. Press play to review your shot.";
  });

  video.addEventListener("error", () => {
    status.textContent = "This video could not be opened.";
  });

  window.addEventListener("pagehide", () => {
    if (videoURL) URL.revokeObjectURL(videoURL);
  });
})();
