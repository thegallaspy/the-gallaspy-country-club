(() => {
  "use strict";

  const screen = document.getElementById("nativeCheckoutScreen");
  const back = document.getElementById("nativeCheckoutBack");
  const summary = document.getElementById("nativeCheckoutOrderSummary");
  const form = document.getElementById("nativeCheckoutForm");

  if (!screen || !back || !summary || !form) return;

  const money = amount => "$" + amount.toFixed(2);

  let catalog = [];

  async function loadCatalog() {
    if (catalog.length) return;

    const response = await fetch("./data/apparel-catalog.json");

    if (!response.ok) {
      throw new Error("Unable to load apparel information.");
    }

    const data = await response.json();

    if (!Array.isArray(data.products)) {
      throw new Error("Invalid apparel catalog.");
    }

    catalog = data.products;
  }

  async function openCheckout() {
    await loadCatalog();

    const bag = window.gallaspyShopBag?.getBag() || [];

    if (!bag.length) {
      throw new Error("Your shopping bag is empty.");
    }

    const rows = [];
    let subtotal = 0;

    for (const item of bag) {
      const product = catalog.find(p => p.slug === item.slug);

      const normalizedSize =
        item.size === "OneSize" ? "One Size" : item.size;

      const validSize =
        product?.sizes?.includes(item.size) ||
        product?.sizes?.includes(normalizedSize);

      const quantity = Number(item.quantity);
      const price = product
        ? Number(String(product.price).replace(/[^0-9.]/g, ""))
        : NaN;

      if (
        !product ||
        !validSize ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10 ||
        !Number.isFinite(price) ||
        price < 0
      ) {
        throw new Error("Review the items in your shopping bag.");
      }

      subtotal += price * quantity;

      rows.push({
        name: product.name,
        color: product.color,
        size: normalizedSize,
        quantity,
        total: price * quantity
      });
    }

    summary.replaceChildren();

    for (const item of rows) {
      const row = document.createElement("div");
      row.className = "native-checkout-order-item";

      const description = document.createElement("span");
      description.textContent =
        `${item.name} — ${item.color} / ${item.size} × ${item.quantity}`;

      const amount = document.createElement("strong");
      amount.textContent = money(item.total);

      row.append(description, amount);
      summary.append(row);
    }

    const total = document.createElement("div");
    total.className = "native-checkout-order-total";

    const label = document.createElement("strong");
    label.textContent = "SUBTOTAL";

    const value = document.createElement("strong");
    value.textContent = money(subtotal);

    total.append(label, value);
    summary.append(total);

    window.showNativeScreen?.("checkout");
  }

  back.addEventListener("click", () => {
    window.showNativeScreen?.("shop");
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
  });

  window.openNativeCheckout = openCheckout;
})();
