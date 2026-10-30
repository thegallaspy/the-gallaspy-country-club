(() => {
  "use strict";

  // Gallaspy manually timed trajectory preview.
  // This does NOT automatically detect the golf ball.

  const video = document.getElementById("shotTracerPreview");
  const svg = document.getElementById("shotTracerOverlay");
  const controls = document.getElementById("shotTracerControls");
  const manual = document.getElementById("shotTracerManualStart");
  const reset = document.getElementById("shotTracerReset");
  const status = document.getElementById("shotTracerStatus");
  const path = svg?.querySelector("path");

  if (!video || !svg || !controls ||
      !manual || !reset || !status || !path) return;

  let previewing = false;
  let impact = 0;
  let flight = 1.25;
  let raf = null;
  let length = 1;

  const handles = [
    ...svg.querySelectorAll(".shot-tracer-handle")
  ];

  const tools = document.createElement("div");
  tools.className = "gallaspy-tracer-timing";
  tools.hidden = true;

  const instruction = document.createElement("p");
  instruction.textContent =
    "Pause your video at ball impact, then mark that " +
    "moment. The manually adjusted gold curve will " +
    "draw during playback.";

  const mark = document.createElement("button");
  mark.type = "button";
  mark.textContent = "SET IMPACT AT CURRENT FRAME";

  const impactLabel = document.createElement("p");
  impactLabel.className = "gallaspy-tracer-timing-readout";

  const durationLabel = document.createElement("label");
  durationLabel.textContent = "TRACER DRAW TIME";

  const duration = document.createElement("input");
  duration.type = "range";
  duration.min = "0.25";
  duration.max = "4";
  duration.step = "0.05";
  duration.value = String(flight);

  const durationValue = document.createElement("span");
  durationValue.className = "gallaspy-tracer-timing-readout";

  durationLabel.append(duration, durationValue);

  const preview = document.createElement("button");
  preview.type = "button";
  preview.className = "gallaspy-tracer-preview-button";
  preview.textContent = "PREVIEW ANIMATED TRACER";

  const edit = document.createElement("button");
  edit.type = "button";
  edit.className = "gallaspy-tracer-preview-button";
  edit.textContent = "EDIT TRAJECTORY";
  edit.hidden = true;

  tools.append(
    instruction,
    mark,
    impactLabel,
    durationLabel,
    preview,
    edit
  );

  controls.append(tools);

  function displayTiming() {
    impactLabel.textContent =
      `IMPACT: ${impact.toFixed(2)} s`;

    durationValue.textContent =
      `${flight.toFixed(2)} seconds`;
  }

  function updateButtons() {
    tools.hidden = svg.hasAttribute("hidden");
    preview.hidden = previewing;
    edit.hidden = !previewing;
    mark.disabled = previewing;
    duration.disabled = previewing;
    reset.hidden = previewing;

    handles.forEach(handle => {
      handle.style.display = previewing ? "none" : "";
    });
  }

  function stopLoop() {
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
  }

  function showFullLine() {
    path.style.strokeDasharray = "";
    path.style.strokeDashoffset = "";
    path.style.visibility = "";
  }

  function drawAtVideoTime() {
    if (!previewing) return;

    const elapsed = video.currentTime - impact;
    const fraction = Math.max(
      0,
      Math.min(1, elapsed / flight)
    );

    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset =
      String(length * (1 - fraction));

    path.style.visibility =
      fraction > 0 ? "visible" : "hidden";
  }

  function tick() {
    raf = null;
    drawAtVideoTime();

    if (previewing && !video.paused && !video.ended) {
      raf = requestAnimationFrame(tick);
    }
  }

  function leavePreview() {
    stopLoop();
    previewing = false;
    showFullLine();
    updateButtons();
  }

  function resetForVideo() {
    leavePreview();
    impact = 0;
    flight = 1.25;
    duration.value = String(flight);
    displayTiming();
    tools.hidden = true;
  }

  mark.addEventListener("click", () => {
    if (!Number.isFinite(video.duration)) return;

    video.pause();

    impact = Math.max(
      0,
      Math.min(video.duration, video.currentTime || 0)
    );

    displayTiming();

    status.textContent =
      `Impact marked at ${impact.toFixed(2)} seconds. ` +
      "Adjust flight duration, then preview.";
  });

  duration.addEventListener("input", () => {
    flight = Number(duration.value);
    displayTiming();
  });

  preview.addEventListener("click", () => {
    if (svg.hasAttribute("hidden") ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0) {
      status.textContent =
        "Import a video and enable the manual " +
        "trajectory first.";
      return;
    }

    video.pause();

    try {
      length = Math.max(1, path.getTotalLength());
      previewing = true;
      updateButtons();

      video.currentTime = Math.max(0, impact - 0.6);
      drawAtVideoTime();

      status.textContent =
        "Previewing your manually positioned tracer. " +
        "This is not automatic ball tracking.";

      const playing = video.play();

      if (playing && typeof playing.catch === "function") {
        playing.catch(() => {
          leavePreview();
          status.textContent =
            "Playback couldn't start. Tap play " +
            "on the video, or try again.";
        });
      }
    } catch {
      leavePreview();
      status.textContent =
        "Unable to preview the trajectory for this video.";
    }
  });

  edit.addEventListener("click", () => {
    video.pause();
    leavePreview();

    status.textContent =
      "Editing manual trajectory. Drag the three " +
      "circles to match your shot.";
  });

  manual.addEventListener("click", () => {
    leavePreview();
    updateButtons();
  });

  video.addEventListener("loadstart", resetForVideo);
  video.addEventListener("error", resetForVideo);
  video.addEventListener("timeupdate", drawAtVideoTime);
  video.addEventListener("seeked", drawAtVideoTime);

  video.addEventListener("play", () => {
    if (previewing && raf === null) {
      raf = requestAnimationFrame(tick);
    }
  });

  video.addEventListener("pause", stopLoop);
  video.addEventListener("ended", stopLoop);

  displayTiming();
})();
