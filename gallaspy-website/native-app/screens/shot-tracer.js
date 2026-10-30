(() => {
  "use strict";
  const camera = document.getElementById("shotTracerCaptureVideo");
  const library = document.getElementById("shotTracerVideo");
  const stage = document.getElementById("shotTracerStage");
  const video = document.getElementById("shotTracerPreview");
  const status = document.getElementById("shotTracerStatus");
  if (!library || !stage || !video || !status) return;
  let videoURL = null;
  const MAX_BYTES = 500 * 1024 * 1024;
  function choose(input) {
    const file = input.files?.[0];
    if (videoURL) URL.revokeObjectURL(videoURL);
    videoURL = null;
    video.pause();
    video.removeAttribute("src");
    video.load();
    stage.hidden = true;
    if (!file) { status.textContent = "Record or choose a golf video."; return; }
    if (!file.type.startsWith("video/")) {
      status.textContent = "Choose a video file rather than a photo."; return;
    }
    if (file.size > MAX_BYTES) {
      status.textContent = "This video is too large. Choose a clip under 500 MB."; return;
    }
    videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    video.load();
    stage.hidden = false;
    status.textContent = "Loading recording…";
    // This screen records/imports real golf video. It does NOT automatically
    // identify the ball or display an invented trajectory.
  }
  library.addEventListener("change", () => choose(library));
  camera?.addEventListener("change", () => choose(camera));
  video.addEventListener("loadedmetadata", () => {
    status.textContent = "Video ready. Review your shot; automatic ball tracking is not yet available.";
  });
  video.addEventListener("error", () => {
    status.textContent = "This recording couldn't be opened on your device.";
  });
  window.addEventListener("pagehide", () => {
    if (videoURL) URL.revokeObjectURL(videoURL);
  });
})();
