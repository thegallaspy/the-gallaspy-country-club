
(() => {
  "use strict";

  const svg = document.getElementById("shotTracerOverlay");
  const controls = document.getElementById("shotTracerControls");
  const reset = document.getElementById("shotTracerReset");
  const video = document.getElementById("shotTracerPreview");
  const stage = document.getElementById("shotTracerStage");
  const status = document.getElementById("shotTracerStatus");

  if (!svg || !controls || !reset || !video || !stage || !status) return;

  const NS = "http://www.w3.org/2000/svg";

  const defaults = [
    { x: 220, y: 850 },
    { x: 490, y: 230 },
    { x: 800, y: 570 }
  ];

  let points = defaults.map(p => ({ ...p }));
  let activeHandle = null;

  // gallaspy-manual-shot-tracer-v1
  // User-adjusted guide only; NOT automatic ball tracking.
  let manualVisible = false;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.id = "shotTracerManualStart";
  toggle.textContent = "DRAW MANUAL TRAJECTORY";

  const note = document.createElement("p");
  note.id = "shotTracerManualNote";
  note.textContent =
    "Manual guide only. Adjust the points to match your shot. " +
    "Automatic tracking and video export are not yet available.";

  controls.prepend(toggle, note);
  svg.setAttribute("hidden", "");


  function element(tag, attributes) {
    const node = document.createElementNS(NS, tag);

    Object.entries(attributes).forEach(([key, value]) => {
      node.setAttribute(key, String(value));
    });

    svg.appendChild(node);
    return node;
  }

  const path = element("path", {
    fill: "none",
    stroke: "#f5c65d",
    "stroke-width": 8,
    "stroke-linecap": "round"
  });

  const handles = points.map((_, index) => {
    const handle = element("circle", {
      r: 23,
      fill: "#ffffff",
      stroke: "#174b38",
      "stroke-width": 7,
      class: "shot-tracer-handle"
    });

    handle.addEventListener("pointerdown", event => {
      event.preventDefault();
      activeHandle = index;
      handle.setPointerCapture(event.pointerId);
    });

    handle.addEventListener("pointermove", event => {
      if (activeHandle !== index) return;

      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      points[index] = {
        x: Math.max(0, Math.min(1000,
          (event.clientX - rect.left) / rect.width * 1000)),
        y: Math.max(0, Math.min(1000,
          (event.clientY - rect.top) / rect.height * 1000))
      };

      draw();
    });

    const release = () => {
      if (activeHandle === index) activeHandle = null;
    };

    handle.addEventListener("pointerup", release);
    handle.addEventListener("pointercancel", release);
    handle.addEventListener("lostpointercapture", release);

    return handle;
  });

  function draw() {
    const [start, peak, end] = points;

    const controlX = 2 * peak.x - (start.x + end.x) / 2;
    const controlY = 2 * peak.y - (start.y + end.y) / 2;

    path.setAttribute(
      "d",
      `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`
    );

    handles.forEach((handle, index) => {
      handle.setAttribute("cx", points[index].x);
      handle.setAttribute("cy", points[index].y);
    });
  }


  function setManualVisible(visible) {
    manualVisible = Boolean(visible);

    if (manualVisible) {
      video.pause();
      svg.removeAttribute("hidden");
      draw();
    } else {
      svg.setAttribute("hidden", "");
    }

    toggle.textContent = manualVisible
      ? "HIDE MANUAL TRAJECTORY"
      : "DRAW MANUAL TRAJECTORY";
  }

  toggle.addEventListener("click", () => {
    const enabled = !manualVisible;
    setManualVisible(enabled);

    status.textContent = enabled
      ? "Manual trajectory enabled. Drag the three points " +
        "to match the visible shot. This is not automatic tracking."
      : "Manual guide hidden. Your video is ready to review.";
  });

  video.addEventListener("loadstart", () => {
    controls.hidden = true;
    setManualVisible(false);
  });

  video.addEventListener("error", () => {
    controls.hidden = true;
    setManualVisible(false);
  });

  reset.addEventListener("click", () => {
    points = defaults.map(p => ({ ...p }));
    draw();
  });

  video.addEventListener("loadedmetadata", () => {
    controls.hidden = false;
    setManualVisible(false);

    const ratio = video.videoHeight > 0
      ? video.videoWidth / video.videoHeight
      : 0;

    if (Number.isFinite(ratio) && ratio > 0) {
      stage.style.maxWidth =
        `min(100%, ${(65 * ratio).toFixed(3)}vh)`;
      stage.style.marginInline = "auto";
    } else {
      stage.style.maxWidth = "";
    }

    points = defaults.map(point => ({ ...point }));
    draw();
  });

  draw();
})();
