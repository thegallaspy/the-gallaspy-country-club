(() => {
  "use strict";

  // Open the existing Golf Partners hosting form directly.
  // Keep Scorecard as a separate PLAY feature.
  document.querySelector("[data-home-host-round]")
    ?.addEventListener("click", () => {
      const openFeature = window.openGallaspyPlayFeature;

      if (typeof openFeature !== "function" ||
          openFeature("playFoursomes") !== true) {
        window.alert("Unable to open Host a Round.");
        return;
      }

      // Reuse the existing HOST tab handler in foursomes.js.
      const hostTab = document.getElementById("foursomeHost");

      if (!hostTab) {
        window.alert("The hosting form is unavailable.");
        return;
      }

      hostTab.click();

      requestAnimationFrame(() => {
        document.getElementById("foursomeCourse")
          ?.focus({ preventScroll: true });
      });
    });

  document.querySelectorAll("[data-home-play]").forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.homePlay;
      window.openGallaspyPlayFeature?.(target);
    });
  });

  document.querySelectorAll("[data-home-community]").forEach(button => {
    button.addEventListener("click", () => window.showNativeScreen?.("community"));
  });

  document.getElementById("communityBackHome")?.addEventListener(
    "click",
    () => window.showNativeScreen?.("home")
  );

  document.querySelector("[data-home-caddie]")?.addEventListener(
    "click",
    () => window.showNativeScreen?.("ai-caddie")
  );

  document.querySelectorAll("[data-home-rewards]").forEach(button => {
    button.addEventListener("click", () => {
      window.showNativeScreen?.("my-gallaspy");

      const content = document.getElementById("nativeContent");
      const points = document.getElementById("myClubPoints");

      if (!content || !points) return;

      requestAnimationFrame(() => {
        const top = points.getBoundingClientRect().top
          - content.getBoundingClientRect().top
          + content.scrollTop - 16;

        content.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth"
        });
      });
    });
  });

  document.getElementById("caddieBackHome")?.addEventListener(
    "click",
    () => window.showNativeScreen?.("home")
  );
})();
