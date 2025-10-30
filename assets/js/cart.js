// Simple cart with localStorage persistence

const CART_STORAGE_KEY = ''; // Key used to store/retrieve cart data in localStorage

function loadCart() { // Loads cart data from localStorage
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY); // Get raw JSON string from localStorage
    return raw ? JSON.parse(raw) : {}; // Parse JSON or return empty object if no data
  } catch (e) {
    return {}; // Return empty object if parsing fails (corrupted data)
  }
}

function saveCart(cart) { // Saves the given cart object to localStorage
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); // Convert cart object to string and save
}

function addToCart(productId, quantity = 1) { // Adds a product to the cart with default quantity 1
  const product = window.getProductById(productId); // Get product details from global product list
  if (!product) return; // Stop if product not found
  const cart = loadCart(); // Load existing cart
  const currentQty = cart[productId]?.quantity || 0; // Get current quantity in cart or 0
  cart[productId] = { productId, quantity: currentQty + quantity }; // Update quantity or add new product
  saveCart(cart); // Save updated cart to localStorage
  showCartToast(`${product.name} added to cart`); // Show success toast message
  updateCartCountUI(); // Update cart count display in UI
}

function removeFromCart(productId) { // Removes an item from the cart
  const cart = loadCart(); // Load current cart
  delete cart[productId]; // Delete item using productId
  saveCart(cart); // Save updated cart
  updateCartCountUI(); // Refresh cart count in UI
}

function updateQuantity(productId, quantity) { // Updates the quantity of an item
  const cart = loadCart(); // Load existing cart
  if (!cart[productId]) return; // Stop if product is not in cart

  let q = parseInt(quantity, 10); // Convert input to integer

  if (isNaN(q) || q < 1) { // Handle invalid inputs (non-numeric or less than 1)
    q = 1; // Reset to minimum quantity 1
  }

  cart[productId].quantity = q; // Update the product’s quantity
  saveCart(cart); // Save the updated cart
  updateCartCountUI(); // Update cart count in UI
}

function clearCart() { // Clears all items from the cart
  saveCart({}); // Save an empty object to localStorage
  updateCartCountUI(); // Update cart count (should show 0)
}

function getCartItemsDetailed() { // Returns detailed info (product + quantity) for each cart item
  const cart = loadCart(); // Load cart data
  const items = Object.values(cart); // Convert cart object to array of items
  return items
    .map(({ productId, quantity }) => { // For each cart item
      const product = window.getProductById(productId); // Get product details
      return { product, quantity }; // Combine product info with quantity
    })
    .filter(i => i.product); // Filter out invalid items (product not found)
}

function computeCartTotals() { // Calculates subtotal, shipping, tax, and total
  const items = getCartItemsDetailed(); // Get detailed cart items
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0); // Sum of (price × qty)
  const shipping = subtotal > 60 ? 0 : (subtotal === 0 ? 0 : 4.99); // Free shipping if subtotal > 60, else 4.99
  const tax = subtotal * 0.07; // 7% tax on subtotal
  const total = subtotal + shipping + tax; // Final total cost
  return { subtotal, shipping, tax, total }; // Return all totals as an object
}

function updateCartCountUI() { // Updates the cart item count in the UI
  const cart = loadCart(); // Load current cart
  const count = Object.values(cart).reduce((sum, i) => sum + (i.quantity || 0), 0); // Calculate total quantity
  const el = document.querySelector('[data-cart-count]'); // Find element with data-cart-count attribute
  if (el) el.textContent = String(count); // Update text content with count
}

function showCartToast(message) { // Displays a Bootstrap toast message
  const el = document.getElementById('cartToast'); // Get toast container
  const textEl = document.getElementById('cartToastText'); // Get toast message element
  if (!el || !window.bootstrap) return; // Exit if Bootstrap not loaded
  if (textEl) textEl.textContent = message; // Update toast text
  const toast = bootstrap.Toast.getOrCreateInstance(el); // Create or get existing toast instance
  toast.show(); // Show the toast
}

// Optional: Prevent typing invalid characters in quantity inputs
document.addEventListener('input', (e) => { // Listen for input changes globally
  if (e.target.matches('input[type="number"]')) { // Only affect number input fields
    e.target.value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digit characters
  }
});

// expose
window.addToCart = addToCart; // Make addToCart accessible globally
window.removeFromCart = removeFromCart; // Make removeFromCart accessible globally
window.updateQuantity = updateQuantity; // Make updateQuantity accessible globally
window.clearCart = clearCart; // Make clearCart accessible globally
window.getCartItemsDetailed = getCartItemsDetailed; // Make getCartItemsDetailed accessible globally
window.computeCartTotals = computeCartTotals; // Make computeCartTotals accessible globally
window.updateCartCountUI = updateCartCountUI; // Make updateCartCountUI accessible globally

document.addEventListener('DOMContentLoaded', updateCartCountUI); // Automatically update cart count when page loads
