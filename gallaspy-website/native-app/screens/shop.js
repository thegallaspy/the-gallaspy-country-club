(() => {
  "use strict";

  document.querySelectorAll("[data-shop-route]").forEach(button => {
    button.addEventListener("click", () => {
      const route = button.dataset.shopRoute;

      if (!route || !route.startsWith("/apparel/")) return;

      window.openClubRoute?.(route);
    });
  });

  document.querySelectorAll("[data-shop-exclusive]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.shopExclusive === "falcon-society") {
        window.openClubRoute?.("/falcon-society/members");
        return;
      }

      if (button.dataset.shopExclusive === "members") {
        // This website route is a public collection preview, not an entitlement grant.
        window.openClubRoute?.("/apparel/members");
        return;
      }

      const message = document.getElementById("shopAccessMessage");

      if (message) {
        message.textContent =
          "This collection is reserved for eligible official Gallaspy club members. Membership access is not yet available in the app.";
      }
    });
  });
})();
