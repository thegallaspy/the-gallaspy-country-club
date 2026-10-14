(() => {
  "use strict";

  document.querySelectorAll("[data-home-play]").forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.homePlay;
      window.openGallaspyPlayFeature?.(target);
    });
  });

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
