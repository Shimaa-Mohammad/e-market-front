
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    }).format(price);
};


function renderCart() {
    const container = document.getElementById('cart-items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    updateSummary(cart);

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center p-5 bg-white rounded-3 border">
                <i class="fas fa-box-open fa-3x mb-3 text-muted"></i>
                <p class="fs-4 fw-bold">Your bag is empty!</p>
                <a href="index.html" class="btn button active">Shop Now</a>
            </div>`;
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="card cart-card ">
            <div class="card-body p-3">
                <div class="row align-items-center">
                    <div class="col-3 col-md-2">
                        <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                    </div>
                    <div class="col-9 col-md-4">
                        <h6 class="fw-bold mb-1">${item.name}</h6>
                        <small class="text-muted">Price: ${formatPrice(item.price)}</small>
                    </div>
                    <div class="col-6 col-md-3 mt-3 mt-md-0">
                        <div class="d-flex align-items-center justify-content-center">
                            <button class="qty-btn button" onclick="updateQty('${item.id}', -1)">-</button>
                            <span class="mx-3 fw-bold">${item.quantity}</span>
                            <button class="qty-btn button" onclick="updateQty('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <div class="col-4 col-md-2 mt-3 mt-md-0 text-center fw-bold text-primary">
                        ${formatPrice(item.price * item.quantity)}
                    </div>
                    <div class="col-2 col-md-1 mt-3 mt-md-0 text-end">
                        <button class="btn text-danger p-0" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// update quantity
function updateQty(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id == id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) return removeFromCart(id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// remove product
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateSummary(cart) {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    

    const cartBadge = document.getElementById('cart-count');
    if(cartBadge) cartBadge.innerText = totalQty;

    document.getElementById('total-items-qty').innerText = `${totalQty} Items`;
    document.getElementById('total-price-amount').innerText = formatPrice(totalPrice);
}

function checkout() {
    alert("Order Received! Thank you for shopping.");
}

document.addEventListener('DOMContentLoaded', renderCart);