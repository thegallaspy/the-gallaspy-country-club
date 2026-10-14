(() => {
  "use strict";

  const viewButton = document.getElementById("nativeShopViewBag");
  const bagSection = document.getElementById("nativeShopBag");
  const itemsContainer = document.getElementById("nativeShopBagItems");
  const subtotalElement = document.getElementById("nativeShopBagSubtotal");
  const message = document.getElementById("nativeShopBagMessage");
  const checkoutButton = document.getElementById("nativeShopCheckout");

  if (!viewButton || !bagSection || !itemsContainer) return;

  let catalog = [];

  const countElement = document.getElementById("nativeShopBagCount");

  function updateBagCount() {
    const items = window.gallaspyShopBag?.getBag() || [];
    const count = items.reduce(
      (total, item) => total + (Number(item.quantity) || 0), 0
    );

    if (countElement) {
      countElement.textContent = String(count);
      countElement.hidden = count === 0;
    }

    viewButton.setAttribute(
      "aria-label",
      count ? `Open shopping bag, ${count} items` : "Open shopping bag"
    );
  }

  updateBagCount();

  const money = amount => "$" + amount.toFixed(2);

  async function loadCatalog() {
    const response = await fetch("./data/apparel-catalog.json");
    if (!response.ok) throw new Error("Catalog unavailable");
    const data = await response.json();
    if (!Array.isArray(data.products)) {
      throw new Error("Invalid catalog");
    }
    catalog = data.products;
  }

  function renderBag() {
    itemsContainer.replaceChildren();

    const items = window.gallaspyShopBag?.getBag() || [];
    let subtotal = 0;

    if (checkoutButton) {
      checkoutButton.disabled = items.length === 0;
    }

    if (!items.length) {
      const empty = document.createElement("p");
      empty.textContent = "Your shopping bag is empty.";
      itemsContainer.append(empty);
    }

    for (const item of items) {
      const product = catalog.find(p => p.slug === item.slug);

      if (!product || !product.sizes?.includes(item.size)) {
        continue;
      }

      const price = Number(product.price.replace(/[^0-9.]/g, ""));
      if (!Number.isFinite(price)) continue;

      subtotal += price * item.quantity;

      const row = document.createElement("article");
      row.className = "native-shop-bag-item";

      const image = document.createElement("img");
      image.src = "https://thegallaspy.com" + product.image;
      image.alt = product.name;

      const details = document.createElement("div");

      const name = document.createElement("strong");
      name.textContent = product.name;

      const variant = document.createElement("p");
      variant.textContent = product.color + " · " + item.size;

      const total = document.createElement("p");
      total.textContent = money(price * item.quantity);

      const quantity = document.createElement("select");
      quantity.setAttribute("aria-label", "Quantity for " + product.name);

      for (let number = 1; number <= 10; number++) {
        const option = document.createElement("option");
        option.value = String(number);
        option.textContent = String(number);
        quantity.append(option);
      }

      quantity.value = String(item.quantity);
      quantity.onchange = () => {
        const updated = window.gallaspyShopBag.updateQuantity(
          item.slug, item.size, Number(quantity.value)
        );
        if (!updated) {
          message.textContent = "Unable to update quantity.";
          renderBag();
        }
      };

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "REMOVE";
      remove.onclick = () => {
        window.gallaspyShopBag.updateQuantity(item.slug, item.size, 0);
      };

      details.append(name, variant, total, quantity, remove);
      row.append(image, details);
      itemsContainer.append(row);
    }

    subtotalElement.textContent = money(subtotal);
  }

  function prepareCheckoutItems() {
    const bag = window.gallaspyShopBag?.getBag() || [];
    if (!bag.length) throw new Error("Your shopping bag is empty.");

    return bag.map(item => {
      const product = catalog.find(p => p.slug === item.slug);
      const size = item.size === "OneSize" ? "One Size" : item.size;
      const validSize = product?.sizes?.includes(item.size) ||
        product?.sizes?.includes(size);

      if (!product || !validSize ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 || item.quantity > 10) {
        throw new Error("Review the items in your shopping bag.");
      }

      return { slug: item.slug, size, quantity: item.quantity };
    });
  }

  async function createCheckoutSession() {
    if (!navigator.onLine) {
      throw new Error("Connect to the internet to check out.");
    }

    if (!catalog.length) await loadCatalog();
    const items = prepareCheckoutItems();

    const accessToken =
      await window.gallaspyAuth?.getCheckoutAccessToken?.();

    const response = await fetch(
      "https://thegallaspy.com/api/apparel/native-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken
            ? { Authorization: "Bearer " + accessToken }
            : {}),
        },
        body: JSON.stringify({ items }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.success !== true ||
        !/^[a-f0-9]{64}$/.test(data.token || "")) {
      throw new Error(data.error || "Unable to start checkout.");
    }

    return data.token;
  }

  if (checkoutButton) {
    checkoutButton.addEventListener("click", async () => {
      if (checkoutButton.disabled) return;

      checkoutButton.disabled = true;
      message.textContent = "Preparing secure checkout...";

      try {
        const token = await createCheckoutSession();
        const route = "/apparel/checkout?nativeCheckout=" +
          encodeURIComponent(token);

        if (typeof window.openClubRoute !== "function") {
          throw new Error("Checkout navigation is unavailable.");
        }

        window.openClubRoute(route);
        message.textContent = "Secure checkout requested.";
      } catch (error) {
        console.error("Native checkout error:", error);
        message.textContent =
          error instanceof Error
            ? error.message
            : "Unable to start checkout.";
      } finally {
        checkoutButton.disabled =
          (window.gallaspyShopBag?.getBag() || []).length === 0;
      }
    });
  }

  viewButton.addEventListener("click", async () => {
    if (!catalog.length) {
      try {
        await loadCatalog();
      } catch {
        message.textContent = "Unable to load your shopping bag.";
        return;
      }
    }

    bagSection.hidden = !bagSection.hidden;
    viewButton.setAttribute(
      "aria-expanded", String(!bagSection.hidden)
    );

    if (!bagSection.hidden) {
      bagSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (!bagSection.hidden) renderBag();
  });

  window.addEventListener("gallaspy:bag-updated", () => {
    updateBagCount();
    if (!bagSection.hidden && catalog.length) renderBag();
  });
})();
