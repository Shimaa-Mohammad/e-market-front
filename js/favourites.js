document.addEventListener('DOMContentLoaded', () => {
    const favoritesList = document.getElementById('favorites-list');
    const favCountElem = document.getElementById('fav-count');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function renderFavorites() {
        if (favorites.length === 0) {
            document.getElementById("empty").classList.remove('d-none') ;
            if (favCountElem) favCountElem.innerText = 0;
            return;
        }

        favCountElem.innerText = favorites.length;

        const markup = favorites.map(product => `
            <div class="col-md-3 mb-4" id="card-${product.id}">
                <div class="card h-100 shadow-sm product-card">
                    <img src="${product.image}" class="product-card-image p-3" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title">${product.name}</h6>
                        <p class="text-danger fw-bold">${(product.priceCents / 100).toFixed(2)} $</p>
                        <button class="btn btn-outline-danger mt-auto remove-fav" data-id="${product.id}">
                            <i class="fa-solid fa-trash"></i> إزالة
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        favoritesList.innerHTML = markup;

        document.querySelectorAll('.remove-fav').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                removeFromFavorites(id);
            });
        });
    }

    function removeFromFavorites(productId) {
        favorites = favorites.filter(item => item.id !== productId);
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        renderFavorites();
    }

    renderFavorites();
});

