// Simple cart with localStorage persistence

const CART_STORAGE_KEY = 'toy_cart_v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  const product = window.getProductById(productId);
  if (!product) return;
  const cart = loadCart();
  const currentQty = cart[productId]?.quantity || 0;
  cart[productId] = { productId, quantity: currentQty + quantity };
  saveCart(cart);
  showCartToast(`${product.name} added to cart`);
  updateCartCountUI();
}

function removeFromCart(productId) {
  const cart = loadCart();
  delete cart[productId];
  saveCart(cart);
  updateCartCountUI();
}

function updateQuantity(productId, quantity) {
  const cart = loadCart();
  if (!cart[productId]) return;

  // Convert safely to integer
  let q = parseInt(quantity, 10);

  // Handle invalid or partial inputs (like ".", "", "-", etc.)
  if (isNaN(q) || q < 1) {
    q = 1;
  }

  cart[productId].quantity = q;
  saveCart(cart);
  updateCartCountUI();
}

function clearCart() {
  saveCart({});
  updateCartCountUI();
}

function getCartItemsDetailed() {
  const cart = loadCart();
  const items = Object.values(cart);
  return items
    .map(({ productId, quantity }) => {
      const product = window.getProductById(productId);
      return { product, quantity };
    })
    .filter(i => i.product);
}

function computeCartTotals() {
  const items = getCartItemsDetailed();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 60 ? 0 : (subtotal === 0 ? 0 : 4.99);
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}

function updateCartCountUI() {
  const cart = loadCart();
  const count = Object.values(cart).reduce((sum, i) => sum + (i.quantity || 0), 0);
  const el = document.querySelector('[data-cart-count]');
  if (el) el.textContent = String(count);
}

function showCartToast(message) {
  const el = document.getElementById('cartToast');
  const textEl = document.getElementById('cartToastText');
  if (!el || !window.bootstrap) return;
  if (textEl) textEl.textContent = message;
  const toast = bootstrap.Toast.getOrCreateInstance(el);
  toast.show();
}

//  Optional: Prevent typing invalid characters in quantity inputs
document.addEventListener('input', (e) => {
  if (e.target.matches('input[type="number"]')) {
    // Only allow digits
    e.target.value = e.target.value.replace(/[^\d]/g, '');
  }
});

// expose
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.getCartItemsDetailed = getCartItemsDetailed;
window.computeCartTotals = computeCartTotals;
window.updateCartCountUI = updateCartCountUI;

document.addEventListener('DOMContentLoaded', updateCartCountUI);
