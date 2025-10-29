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

document.addEventListener('DOMContentLoaded', setActiveNav);

// Expose helpers
window.formatPrice = formatPrice;


