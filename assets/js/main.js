// Shared JS: navbar active state, dynamic renders, utilities

function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

function formatPrice(num) {
  return `$${num.toFixed(2)}`;
}

function renderRatingStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '';
  if (half) html += '';
  for (let i = full + (half ? 1 : 0); i < 5; i++) html += '';
  return html;
}

document.addEventListener('DOMContentLoaded', setActiveNav);

// Expose helpers
window.formatPrice = formatPrice;
window.renderRatingStars = renderRatingStars;


