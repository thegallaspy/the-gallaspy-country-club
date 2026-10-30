(() => {
  "use strict";

  const svg = document.getElementById("shotTracerOverlay");
  const controls = document.getElementById("shotTracerControls");

  if (!svg || !controls) return;

  const palettes = [
    ["GOLD", "#E6B84F"],
    ["WHITE", "#FFFFFF"],
    ["RED", "#F04452"],
    ["BLUE", "#2196F3"],
    ["GREEN", "#27AE60"],
    ["PURPLE", "#9B59B6"],
    ["ORANGE", "#FF8A35"]
  ];

  let color = "#E6B84F";
  let thickness = 6;

  const studio = document.createElement("section");
  studio.className = "gallaspy-tracer-studio";

  const title = document.createElement("h4");
  title.textContent = "TRACER STUDIO";

  const subtitle = document.createElement("p");
  subtitle.textContent =
    "Personalize your ball-flight tracer.";

  const palette = document.createElement("div");
  palette.className = "gallaspy-tracer-palette";

  const customLabel = document.createElement("label");
  customLabel.className = "gallaspy-tracer-custom";
  customLabel.textContent = "CUSTOM COLOR";

  const custom = document.createElement("input");
  custom.type = "color";
  custom.value = color;
  custom.setAttribute("aria-label", "Custom tracer color");

  customLabel.appendChild(custom);

  const widthLabel = document.createElement("label");
  widthLabel.className = "gallaspy-tracer-width";
  widthLabel.textContent = "TRACER THICKNESS";

  const widthInput = document.createElement("input");
  widthInput.type = "range";
  widthInput.min = "2";
  widthInput.max = "14";
  widthInput.step = "1";
  widthInput.value = String(thickness);

  const widthValue = document.createElement("span");
  widthValue.textContent = "STANDARD";

  widthLabel.append(widthInput, widthValue);

  const swatches = [];

  function applyStyle() {
    const paths = [...svg.querySelectorAll("path")];

    for (const path of paths) {
      path.style.stroke = color;
      path.style.strokeWidth = String(thickness);
      path.style.strokeLinecap = "round";
      path.style.strokeLinejoin = "round";
    }

    swatches.forEach(button => {
      const active =
        button.dataset.color.toLowerCase() ===
        color.toLowerCase();

      button.setAttribute(
        "aria-pressed",
        String(active)
      );
    });

    widthValue.textContent =
      thickness <= 4 ? "THIN" :
      thickness <= 8 ? "STANDARD" : "BOLD";
  }

  for (const [name, value] of palettes) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "gallaspy-tracer-swatch";
    button.dataset.color = value;

    button.style.setProperty("--swatch-color", value);

    button.setAttribute(
      "aria-label",
      name + " tracer"
    );

    button.title = name;

    button.addEventListener("click", () => {
      color = value;
      custom.value = value;
      applyStyle();
    });

    palette.appendChild(button);
    swatches.push(button);
  }

  custom.addEventListener("input", () => {
    color = custom.value;
    applyStyle();
  });

  widthInput.addEventListener("input", () => {
    thickness = Number(widthInput.value);
    applyStyle();
  });

  studio.append(
    title,
    subtitle,
    palette,
    customLabel,
    widthLabel
  );

  controls.appendChild(studio);

  const observer = new MutationObserver(() => {
    applyStyle();
  });

  observer.observe(svg, {
    childList: true,
    subtree: true
  });

  applyStyle();

  window.GallaspyTracerStyle = {
    getSettings() {
      return { color, thickness };
    }
  };
})();
