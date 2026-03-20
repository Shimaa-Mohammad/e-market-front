document.addEventListener('DOMContentLoaded', () => {
    const productsList = document.getElementById('products-list');
    const filterButtons = document.querySelectorAll('.filter-btn'); 
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let allProductsData = []; 

    updateBadge();

    function formatPrice(priceCents) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(priceCents / 100);
    }

    function buildStars(starsValue) {
        const fullStars = Math.floor(starsValue);
        const hasHalfStar = starsValue % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fa-solid fa-star"></i>';
        if (hasHalfStar) starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="fa-regular fa-star"></i>';
        return starsHtml;
    }

    function updateBadge() {
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartElem = document.getElementById('cart-count');
        if (cartElem) cartElem.innerText = cartCount;

        const favCount = favorites.length;
        const favElem = document.getElementById('fav-count');
        if (favElem) favElem.innerText = favCount;
    }


    function renderProducts(products) {
        if (!productsList) return;
        
        const cardsMarkup = products.map((product) => {
            const isFav = favorites.some(fav => fav.id === product.id);
            const heartClass = isFav ? 'fa-solid text-danger' : 'fa-regular';

            return `
                <div class="col-md-4 mb-4">
                    <article class="card product-card h-100">
                        <img src="${product.image}" class="product-card-image p-3" alt="${product.name}" style="height: 250px; object-fit: contain;">
                        <i class="${heartClass} fa-heart product-wishlist-icon" 
                           data-id="${product.id}" 
                           style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <div class="product-rating mb-2 text-warning">
                                ${buildStars(product.rating.stars)}
                                <span class="text-muted small">(${product.rating.count})</span>
                            </div>
                            <p class="price fw-bold fs-5">${formatPrice(product.priceCents)}</p>
                            <button class="btn button mt-auto add-to-cart-btn" data-id="${product.id}">
                                Add to Cart
                            </button>
                        </div>
                    </article>
                </div>
            `;
        }).join('');

        productsList.innerHTML = cardsMarkup;

     document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        addToCart(btn.dataset.id, products);
        
        const toast = document.getElementById("cart-toast");
        toast.classList.remove('d-none');
        toast.classList.add('d-flex');
        
        setTimeout(() => {
            toast.classList.add( 'd-none');
        }, 2000);
    });
});

        document.querySelectorAll('.product-wishlist-icon').forEach(icon => {
            icon.onclick = () => {
                toggleFavorite(icon.dataset.id, products);
                icon.classList.toggle('fa-solid');
                icon.classList.toggle('fa-regular');
                icon.classList.toggle('text-danger');
            };
        });
    }

    function initFiltering(allProducts) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                const filtered = allProducts.filter(p => 
                    p.category.toLowerCase() === category.toLowerCase()
                );

                renderProducts(filtered);
            });
        });
    }

    function addToCart(productId, allProducts) {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.priceCents,
                    image: product.image,
                    quantity: 1
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateBadge();
        }
    }

    function toggleFavorite(productId, allProducts) {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;
        const index = favorites.findIndex(fav => fav.id === productId);
        if (index > -1) {
            favorites.splice(index, 1); 
        } else {
            favorites.push(product); 
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateBadge();
    }

    async function loadProducts() {
        if (!productsList) return;
        try {
            const response = await fetch('./js/products.json');
            const data = await response.json();
            allProductsData = data.products || [];
            
            renderProducts(allProductsData); 
            initFiltering(allProductsData); 
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    loadProducts();
});