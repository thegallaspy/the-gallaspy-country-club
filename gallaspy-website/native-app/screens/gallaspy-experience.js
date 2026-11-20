
(() => {
  const landing = document.getElementById("nativeShopLanding");
  const catalog = document.getElementById("nativeShopCatalog");
  const back = document.getElementById("nativeShopLandingBack");
  const detail = document.getElementById("nativeShopDetail");
  const content = document.getElementById("nativeContent");

  if (!landing || !catalog || !back) return;

  function showLanding() {
    if (detail && !detail.hidden) {
      document.getElementById("nativeShopBack")?.click();
    }
    landing.hidden = false;
    catalog.hidden = true;
    if (content) content.scrollTop = 0;
  }

  landing.querySelectorAll("[data-shop-landing-category]").forEach(button => {
    button.addEventListener("click", () => {
      landing.hidden = true;
      catalog.hidden = false;
      document.querySelector('[data-shop-category="' + button.dataset.shopLandingCategory + '"]')?.click();
      catalog.scrollIntoView({block:"start"});
    });
  });

  back.addEventListener("click", showLanding);

  document.querySelector('.tab[data-route="/shop"]')
    ?.addEventListener("click", showLanding);

  showLanding();
})();
