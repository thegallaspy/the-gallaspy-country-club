(() => {
  "use strict";

  const grid = document.getElementById("nativeShopGrid");
  const status = document.getElementById("nativeShopStatus");
  const filters = document.querySelectorAll("[data-shop-category]");

  if (!grid || !status) return;

  const detail = document.getElementById("nativeShopDetail");
  const back = document.getElementById("nativeShopBack");
  const filterBar = document.querySelector(".native-shop-filters");
  const shopHeading = document.querySelector("#nativeShopScreen > .my-heading");
  const memberCollections = document.getElementById("nativeShopMemberCollections");
  const memberEntry = document.querySelector("#nativeShopScreen .native-shop-member-entry");

  function showCollection() {
    detail.hidden = true;
    grid.hidden = false;
    filterBar.hidden = false;
    if (shopHeading) shopHeading.hidden = false;
    if (memberEntry) memberEntry.hidden = false;
    if (memberCollections) memberCollections.hidden = true;
  }

  function openProduct(product) {
    if (!detail) return;

    const image = document.getElementById("nativeShopDetailImage");
    image.src = "https://thegallaspy.com" + product.image;
    image.alt = product.name + " — " + product.color;

    document.getElementById("nativeShopDetailName").textContent = product.name;
    document.getElementById("nativeShopDetailColor").textContent = product.color;
    document.getElementById("nativeShopDetailPrice").textContent = product.price;

    const sizeSelect = document.getElementById("nativeShopSize");
    const quantitySelect = document.getElementById("nativeShopQuantity");
    const addButton = document.getElementById("nativeShopAddToBag");

    if (sizeSelect) {
      sizeSelect.replaceChildren();

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "SELECT YOUR SIZE";
      placeholder.disabled = true;
      placeholder.selected = true;
      sizeSelect.append(placeholder);

      for (const size of product.sizes || []) {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeSelect.append(option);
      }

      if (product.sizes?.length === 1) {
        sizeSelect.value = product.sizes[0];
      }
    }

    if (quantitySelect) {
      quantitySelect.value = "1";
    }

    if (addButton) {
      addButton.disabled = true;
      addButton.textContent = "ADD TO BAG";

      const updateButton = () => {
        addButton.disabled = !(
          sizeSelect?.value &&
          product.sizes?.includes(sizeSelect.value)
        );
      };

      sizeSelect.onchange = () => {
        addButton.textContent = "ADD TO BAG";
        updateButton();
      };

      if (quantitySelect) {
        quantitySelect.onchange = () => {
          addButton.textContent = "ADD TO BAG";
          updateButton();
        };
      }

      addButton.onclick = () => {
        const size = sizeSelect?.value;
        const quantity = Number(quantitySelect?.value);

        if (!product.sizes?.includes(size)) return;

        const added = window.gallaspyShopBag?.addItem(
          product,
          size,
          quantity
        );

        if (added) {
          addButton.textContent = "ADDED TO BAG ✓";
        } else {
          addButton.textContent = "UNABLE TO ADD ITEM";
        }
      };

      updateButton();
    }

    grid.hidden = true;
    filterBar.hidden = true;
    if (shopHeading) shopHeading.hidden = true;
    if (memberEntry) memberEntry.hidden = true;
    if (memberCollections) memberCollections.hidden = true;
    detail.hidden = false;
    detail.scrollIntoView({ behavior: "instant", block: "start" });
    back.focus({ preventScroll: true });
  }

  back?.addEventListener("click", () => {
    showCollection();
    document.getElementById("nativeShopCatalog")
      ?.scrollIntoView({ behavior: "instant", block: "start" });
    grid.querySelector("[data-shop-selected]")
      ?.focus({ preventScroll: true });
  });

  let products = [];
  let category = "men";

  function render() {
    grid.replaceChildren();

    const selected = products.filter(
      product => product.collection === category
    );

    for (const product of selected) {
      const card = document.createElement("article");
      card.className = "native-shop-product";

      const image = document.createElement("img");
      image.src = "https://thegallaspy.com" + product.image;
      image.alt = product.name + " — " + product.color;
      image.loading = "lazy";

      const info = document.createElement("div");
      info.className = "native-shop-product-info";

      const name = document.createElement("h4");
      name.textContent = product.name;

      const color = document.createElement("p");
      color.textContent = product.color;

      const price = document.createElement("strong");
      price.textContent = product.price;

      info.append(name, color, price);
      card.append(image, info);
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "View " + product.name);

      card.addEventListener("click", () => {
        grid.querySelectorAll("[data-shop-selected]").forEach(item => {
          item.removeAttribute("data-shop-selected");
        });
        card.setAttribute("data-shop-selected", "");
        openProduct(product);
      });

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          card.click();
        }
      });

      grid.append(card);
    }

    status.textContent = selected.length
      ? ""
      : "No products available in this category.";
  }

  filters.forEach(button => {
    button.addEventListener("click", () => {
      category = button.dataset.shopCategory;

      filters.forEach(filter => {
        filter.setAttribute(
          "aria-pressed",
          String(filter === button)
        );
      });

      render();
    });
  });

  async function loadCatalog() {
    status.textContent = "Loading The Gallaspy Collection...";

    try {
      const response = await fetch("./data/apparel-catalog.json");

      if (!response.ok) {
        throw new Error("Catalog unavailable.");
      }

      const catalog = await response.json();

      if (!Array.isArray(catalog.products)) {
        throw new Error("Invalid catalog.");
      }

      products = catalog.products;
      render();
    } catch (error) {
      status.textContent =
        "Unable to load the collection. Please try again later.";
      console.error("Native shop catalog:", error);
    }
  }


  document.getElementById("nativeShopOpenCollection")
    ?.addEventListener("click", () => {
      showCollection();
      document.getElementById("nativeShopCatalog")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

  loadCatalog();
})();
