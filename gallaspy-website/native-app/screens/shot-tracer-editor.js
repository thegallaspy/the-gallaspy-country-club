
(() => {
  "use strict";

  const svg = document.getElementById("shotTracerOverlay");
  const controls = document.getElementById("shotTracerControls");
  const reset = document.getElementById("shotTracerReset");
  const video = document.getElementById("shotTracerPreview");

  if (!svg || !controls || !reset || !video) return;

  const NS = "http://www.w3.org/2000/svg";

  const defaults = [
    { x: 220, y: 850 },
    { x: 490, y: 230 },
    { x: 800, y: 570 }
  ];

  let points = defaults.map(p => ({ ...p }));
  let activeHandle = null;

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

  reset.addEventListener("click", () => {
    points = defaults.map(p => ({ ...p }));
    draw();
  });

  video.addEventListener("loadedmetadata", () => {
    controls.hidden = false;
    draw();
  });

  draw();
})();
