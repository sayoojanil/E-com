

//  navbar active state,


document.addEventListener('DOMContentLoaded', setActiveNav);         //Waits for page to load before running code

function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';   
  document.querySelectorAll('.nav-link').forEach(a => {  // It checks if the link’s href (like "about.html") matches the current page filename.
    if (a.getAttribute('href') === path) {
      a.classList.add('active');                      //If it matches , it adds the CSS class "active".
    } else {
      a.classList.remove('active');       //other wise it removes the active class. 
    }
  });
}

// This is a helper function to format a number as a price.

function formatPrice(num) {
  return `$${num.toFixed(2)}`;       // 2 is two decimal places and $ sign is for dollar sign
}


// Expose helpers
window.formatPrice = formatPrice;                            //By assigning the function to window, it becomes a global function.


