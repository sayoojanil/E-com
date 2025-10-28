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
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="fa-regular fa-star"></i>';
  return html;
}

document.addEventListener('DOMContentLoaded', setActiveNav);

// Expose helpers
window.formatPrice = formatPrice;
window.renderRatingStars = renderRatingStars;


