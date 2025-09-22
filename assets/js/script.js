// Scroll animation: reveal sections when they enter viewport
document.addEventListener("scroll", function() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

// Persistent Shopping Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartLink = document.querySelector('a[data-bs-target="#cartModal"]');

updateCart();

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    const name = this.getAttribute("data-name");
    const price = parseFloat(this.getAttribute("data-price"));
    cart.push({ name, price });
    saveCart();
    updateCart();
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)}
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>`;
    cartItemsContainer.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
  cartLink.textContent = `🛒 Cart (${cart.length})`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
document.getElementById("checkoutBtn").addEventListener("click", function() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  
  let confirmPayment = confirm(`Your total is $${total.toFixed(2)}. Proceed to fake payment?`);
  if (confirmPayment) {
    alert("Payment successful! Thank you for your purchase.");
    cart = [];
    saveCart();
    updateCart();
    bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
  }
});