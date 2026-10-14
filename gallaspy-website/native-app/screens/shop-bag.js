(() => {
  "use strict";

  const STORAGE_KEY = "gallaspy-native-shopping-bag-v1";

  function readBag() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveBag(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("gallaspy:bag-updated"));
  }

  function getBag() {
    return readBag();
  }

  function addItem(product, size, quantity) {
    if (
      !product?.slug ||
      !Array.isArray(product.sizes) ||
      !product.sizes.includes(size) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      return false;
    }

    const items = readBag();
    const existing = items.find(
      item => item.slug === product.slug && item.size === size
    );

    if (existing) {
      if (existing.quantity + quantity > 10) return false;
      existing.quantity += quantity;
    } else {
      items.push({
        slug: product.slug,
        size,
        quantity
      });
    }

    if (items.length > 27) return false;
    if (items.reduce((sum, item) => sum + item.quantity, 0) > 30) {
      return false;
    }

    try {
      saveBag(items);
      return true;
    } catch {
      return false;
    }
  }

  function updateQuantity(slug, size, quantity) {
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 10) {
      return false;
    }

    const items = readBag();
    const index = items.findIndex(
      item => item.slug === slug && item.size === size
    );

    if (index === -1) return false;

    if (quantity === 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = quantity;
    }

    if (items.reduce((sum, item) => sum + item.quantity, 0) > 30) {
      return false;
    }

    try {
      saveBag(items);
      return true;
    } catch {
      return false;
    }
  }

  window.gallaspyShopBag = {
    getBag,
    addItem,
    updateQuantity
  };
})();
