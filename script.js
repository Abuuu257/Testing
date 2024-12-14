const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install the service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resources and respond with cached versions when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Otherwise, fetch from the network
        return fetch(event.request);
      })
  );
});

// Activate the service worker and update cache if needed
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



// Select relevant elements
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const saveFavouritesButton = document.getElementById('save-favourites');
const applyFavouritesButton = document.getElementById('apply-favourites');
const buyNowButton = document.getElementById('buy-now');

let cart = [];
let favourites = [];

// Utility function to calculate total price
function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    totalPriceElement.textContent = `Total Price: $${total.toFixed(2)}`;
}

// Function to update the cart table
function updateCartTable() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
        `;

        cartItems.appendChild(row);
    });

    calculateTotal();
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const quantityInput = button.previousElementSibling;
        const quantity = parseInt(quantityInput.value, 10);

        if (!quantity || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        // Check if item already exists in the cart
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }

        quantityInput.value = ''; // Clear the input field
        updateCartTable();
    });
});

// Save favourites functionality
saveFavouritesButton.addEventListener('click', () => {
    favourites = [...cart];
    alert('Your favourites have been saved!');
});

// Apply favourites functionality
applyFavouritesButton.addEventListener('click', () => {
    if (favourites.length === 0) {
        alert('No favourites saved.');
        return;
    }

    favourites.forEach(favItem => {
        const existingItem = cart.find(item => item.name === favItem.name);

        if (existingItem) {
            existingItem.quantity += favItem.quantity;
        } else {
            cart.push({ ...favItem });
        }
    });

    updateCartTable();
    alert('Favourites have been applied to the cart!');
});

// Buy now functionality
buyNowButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Purchase successful! Thank you for your order.');
    cart = []; // Clear the cart after purchase
    updateCartTable();
    window.location.href='payment.html';
});

