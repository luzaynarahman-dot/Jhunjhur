/* =========================================================
   JHUNJHUR — Main JavaScript
   Location: js/script.js
   Complete Dynamic + LocalStorage CRUD
========================================================= */

// =========================================================
// DEFAULT PRODUCTS (Fallback)
// =========================================================

const DEFAULT_PRODUCTS = [
    // Bangles
    {
        id: 'bangles-1',
        category: 'bangles',
        name: 'Desi Churi Set',
        price: 450,
        image: 'assets/bangles1.jpg',
        description: 'দেশি সাজের জন্য সুন্দর traditional churi set.'
    },
    {
        id: 'bangles-2',
        category: 'bangles',
        name: 'Golden Churi Set',
        price: 480,
        image: 'assets/bangles2.jpg',
        description: 'Elegant golden churi set for festive and everyday desi looks.'
    },
    {
        id: 'bangles-3',
        category: 'bangles',
        name: 'Pearl Churi Set',
        price: 520,
        image: 'assets/bangles3.jpg',
        description: 'Soft pearl detailing with a classic desi finish.'
    },
    {
        id: 'bangles-4',
        category: 'bangles',
        name: 'Traditional Churi',
        price: 390,
        image: 'assets/bangles4.jpg',
        description: 'A classic traditional churi for a timeless desi look.'
    },
    // Earrings
    {
        id: 'earrings-1',
        category: 'earrings',
        name: 'Golden Jhumka',
        price: 350,
        image: 'assets/earrings1.jpg',
        description: 'Classic golden jhumka with an elegant desi finish.'
    },
    {
        id: 'earrings-2',
        category: 'earrings',
        name: 'Pearl Drop Earrings',
        price: 420,
        image: 'assets/earrings2.jpg',
        description: 'Elegant pearl drop earrings for a soft feminine look.'
    },
    {
        id: 'earrings-3',
        category: 'earrings',
        name: 'Desi Floral Earrings',
        price: 380,
        image: 'assets/earrings3.jpg',
        description: 'Floral inspired earrings with a beautiful desi touch.'
    },
    // Pendants
    {
        id: 'pendants-1',
        category: 'pendants',
        name: 'Classic Gold Pendant',
        price: 550,
        image: 'assets/pendants1.jpg',
        description: 'A minimal classic gold pendant for everyday elegance.'
    },
    {
        id: 'pendants-2',
        category: 'pendants',
        name: 'Floral Pendant',
        price: 620,
        image: 'assets/pendants2.jpg',
        description: 'A delicate floral pendant made for graceful styling.'
    },
    // Rings
    {
        id: 'rings-1',
        category: 'rings',
        name: 'Floral Pearl Ring',
        price: 450,
        image: 'assets/rings1.jpg',
        description: 'A floral pearl ring for a delicate everyday look.'
    },
    {
        id: 'rings-2',
        category: 'rings',
        name: 'Classic Gold Ring',
        price: 390,
        image: 'assets/rings2.jpg',
        description: 'A simple classic gold ring that goes with every look.'
    },
    // Others (replaces Tikli)
    {
        id: 'others-1',
        category: 'others',
        name: 'Antique Tikli',
        price: 350,
        image: 'assets/tikli1.jpg',
        description: 'Traditional antique-inspired tikli for a complete desi look.'
    },
    {
        id: 'others-2',
        category: 'others',
        name: 'Golden Floral Tikli',
        price: 320,
        image: 'assets/tikli2.jpg',
        description: 'Golden floral tikli with a delicate traditional touch.'
    },
    // Hair Accessories
    {
        id: 'hair-1',
        category: 'hair',
        name: 'Floral Hair Clip',
        price: 280,
        image: 'assets/hair1.jpg',
        description: 'A pretty floral hair clip for a soft desi hairstyle.'
    },
    {
        id: 'hair-2',
        category: 'hair',
        name: 'Desi Hair Band',
        price: 250,
        image: 'assets/hair2.jpg',
        description: 'A simple desi hair band for everyday styling.'
    }
];

// =========================================================
// REVIEWS DATA
// =========================================================

const DEFAULT_REVIEWS = [
    {
        name: 'Sohana Islam',
        text: 'চুড়িগুলো ছবির থেকেও বেশি সুন্দর! কোয়ালিটি অসাধারণ, খুব যত্ন নিয়ে প্যাক করা ছিল। ভালোবাসা রইলো ঝুনঝুর!',
        product: 'Desi Churi Set',
        image: 'assets/bangles1.jpg'
    },
    {
        name: 'Farhana Mim',
        text: 'প্রথমবার অর্ডার করেছিলাম, অভিজ্ঞতা দারুণ! ডেলিভারি ছিল দ্রুত এবং জুয়েলারিগুলো একদম পারফেক্ট।',
        product: 'Golden Jhumka',
        image: 'assets/earrings1.jpg'
    },
    {
        name: 'Nusrat Jahan',
        text: 'প্রতিটা কালেকশনই এত সুন্দর হয়! ঝুনঝুর মানেই ট্রাস্ট। সবসময় আমার ফেভারিট জায়গা এখানেই।',
        product: 'Classic Gold Pendant',
        image: 'assets/pendants1.jpg'
    }
];

// =========================================================
// CATEGORY CONFIG
// =========================================================

const CATEGORIES = [
    { id: 'all', label: 'All Products', icon: 'all.png' },
    { id: 'bangles', label: 'Bangles', icon: 'bangles.png' },
    { id: 'earrings', label: 'Earrings', icon: 'earrings.png' },
    { id: 'pendants', label: 'Pendants', icon: 'pendants.png' },
    { id: 'rings', label: 'Rings', icon: 'rings.png' },
    { id: 'others', label: 'Others', icon: 'tikli.png' },
    { id: 'hair', label: 'Hair Accessories', icon: 'hair-accessories.png' }
];

const CATEGORY_INFO = {
    all: { title: 'All Products', subtitle: 'সব ধরনের সুন্দর প্রোডাক্ট' },
    bangles: { title: 'Bangles', subtitle: 'দেশি সাজের চিরচেনা সৌন্দর্য' },
    earrings: { title: 'Earrings', subtitle: 'ছোট্ট দুলে সাজ হোক আরও সুন্দর' },
    pendants: { title: 'Pendants', subtitle: 'গলায় থাকুক ছোট্ট একটুকরো সৌন্দর্য' },
    rings: { title: 'Rings', subtitle: 'আপনার আঙুলের জন্য ছোট্ট সৌন্দর্য' },
    others: { title: 'Others', subtitle: 'নিত্য নতুন কিছু' },
    hair: { title: 'Hair Accessories', subtitle: 'চুলের সাজেও থাকুক Jhunjhur-এর ছোঁয়া' }
};

// =========================================================
// LOCAL STORAGE HELPERS
// =========================================================

function getProducts() {
    const stored = localStorage.getItem('jhunjhurProducts');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            localStorage.setItem('jhunjhurProducts', JSON.stringify(DEFAULT_PRODUCTS));
            return DEFAULT_PRODUCTS;
        }
    }
    localStorage.setItem('jhunjhurProducts', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
    localStorage.setItem('jhunjhurProducts', JSON.stringify(products));
}

function getCart() {
    const stored = localStorage.getItem('jhunjhurCart');
    return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
    localStorage.setItem('jhunjhurCart', JSON.stringify(cart));
}

function getWishlist() {
    const stored = localStorage.getItem('jhunjhurWishlist');
    return stored ? JSON.parse(stored) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('jhunjhurWishlist', JSON.stringify(wishlist));
}

function getOrders() {
    const stored = localStorage.getItem('jhunjhurOrders');
    return stored ? JSON.parse(stored) : [];
}

function saveOrders(orders) {
    localStorage.setItem('jhunjhurOrders', JSON.stringify(orders));
}

// =========================================================
// TOAST NOTIFICATION
// =========================================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <div class="toast-content">
            <strong>${message}</strong>
            <span>${type === 'success' ? '✓ Success' : '⚠️ Notice'}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 2500);
}

// =========================================================
// FORMAT HELPERS
// =========================================================

function formatPrice(price) {
    return `৳${Number(price).toLocaleString('en-BD')}`;
}

function getCategoryName(category) {
    const cat = CATEGORIES.find(c => c.id === category);
    return cat ? cat.label : 'JHUNJHUR';
}

function getProduct(id) {
    const products = getProducts();
    return products.find(p => p.id === id);
}

function needsSize(product) {
    return ['bangles', 'rings'].includes(product.category);
}

// =========================================================
// RENDER CATEGORIES
// =========================================================

function renderCategories() {
    const bar = document.getElementById('categoryBar');
    if (!bar) return;
    
    bar.innerHTML = '';
    CATEGORIES.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-tab' + (cat.id === 'all' ? ' active' : '');
        btn.dataset.category = cat.id;
        btn.innerHTML = `
            <img src="assets/${cat.icon}" alt="${cat.label}" loading="lazy">
            <span>${cat.label}</span>
        `;
        bar.appendChild(btn);
    });
}

// =========================================================
// RENDER PRODUCTS (with Pagination)
// =========================================================

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let currentCategory = 'all';
let wishlistIds = [];

function renderProducts(products, page = 1) {
    const grid = document.getElementById('productGrid');
    const count = document.getElementById('productCount');
    const pagination = document.getElementById('paginationContainer');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (!products || products.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
                <i class="fa-solid fa-search" style="font-size:3rem; color:rgba(168,117,37,0.3);"></i>
                <h3 style="font-family:'Cormorant Garamond',serif; font-size:1.5rem; color:#173c35; margin-top:15px;">
                    No products found
                </h3>
                <p style="color:#6c665b;">Try adjusting your search or filter.</p>
            </div>
        `;
        count.textContent = '0 Products';
        pagination.innerHTML = '';
        return;
    }
    
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageProducts = products.slice(start, end);
    
    pageProducts.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.dataset.category = product.category;
        card.dataset.name = product.name;
        card.dataset.price = product.price;
        card.dataset.image = product.image;
        card.dataset.description = product.description;
        
        const isWishlist = wishlistIds.includes(product.id);
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" 
                     onerror="this.src='assets/placeholder.jpg'">
                <button class="wishlist-btn ${isWishlist ? 'active' : ''}" 
                        aria-label="${isWishlist ? 'Remove from' : 'Add to'} wishlist">
                    <i class="${isWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h4>${product.name}</h4>
                <strong>${formatPrice(product.price)}</strong>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    count.textContent = `${products.length} Products`;
    renderPagination(totalPages, page);
    attachProductEvents();
}

function renderPagination(totalPages, current) {
    const container = document.getElementById('paginationContainer');
    if (!container) return;
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = '';
    html += `<button ${current === 1 ? 'disabled' : ''} onclick="changePage(${current - 1})">
                <i class="fa-solid fa-chevron-left"></i>
            </button>`;
    
    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(totalPages, current + 2);
    
    if (startPage > 1) {
        html += `<button onclick="changePage(1)">1</button>`;
        if (startPage > 2) html += `<button disabled>...</button>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `<button class="${i === current ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += `<button disabled>...</button>`;
        html += `<button onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    html += `<button ${current === totalPages ? 'disabled' : ''} onclick="changePage(${current + 1})">
                <i class="fa-solid fa-chevron-right"></i>
            </button>`;
    
    container.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    applyFilters();
}

// =========================================================
// ATTACH PRODUCT EVENTS
// =========================================================

function attachProductEvents() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.wishlist-btn')) return;
            openProductModal(this.dataset.id);
        });
    });
    
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.product-card');
            if (!card) return;
            toggleWishlist(card.dataset.id);
        });
    });
}

// =========================================================
// FILTER & SEARCH
// =========================================================

function applyFilters() {
    const category = currentCategory;
    const searchTerm = document.getElementById('searchInput')?.value?.trim().toLowerCase() || '';
    
    let products = getProducts();
    
    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }
    
    if (searchTerm) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    const info = CATEGORY_INFO[category] || CATEGORY_INFO.all;
    document.getElementById('productHeading').textContent = info.title;
    document.getElementById('productSubheading').textContent = info.subtitle;
    
    renderProducts(products, currentPage);
}

function filterProducts(category) {
    currentCategory = category;
    currentPage = 1;
    applyFilters();
}

// =========================================================
// WISHLIST
// =========================================================

function loadWishlist() {
    wishlistIds = getWishlist();
}

function isInWishlist(id) {
    return wishlistIds.includes(id);
}

function toggleWishlist(id) {
    if (isInWishlist(id)) {
        wishlistIds = wishlistIds.filter(item => item !== id);
        showToast('Removed from Wishlist 💔', 'error');
    } else {
        wishlistIds.push(id);
        showToast('Added to Wishlist ❤️', 'success');
    }
    saveWishlist(wishlistIds);
    updateWishlistUI();
}

function updateWishlistUI() {
    document.querySelectorAll('.product-card .wishlist-btn').forEach(btn => {
        const card = btn.closest('.product-card');
        if (!card) return;
        const id = card.dataset.id;
        const active = isInWishlist(id);
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Add to wishlist');
        const icon = btn.querySelector('i');
        icon.className = (active ? 'fa-solid' : 'fa-regular') + ' fa-heart';
    });
    
    document.getElementById('mobileWishlistCount').textContent = wishlistIds.length;
    document.getElementById('drawerWishlistCount').textContent = wishlistIds.length;
    renderWishlistDrawer();
}

function renderWishlistDrawer() {
    const container = document.getElementById('wishlistItems');
    const empty = document.getElementById('emptyWishlist');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (wishlistIds.length === 0) {
        if (empty) empty.style.display = 'flex';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    
    wishlistIds.forEach(id => {
        const product = getProduct(id);
        if (!product) return;
        
        const item = document.createElement('div');
        item.className = 'wishlist-item';
        item.innerHTML = `
            <div class="wishlist-item-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'">
            </div>
            <div class="wishlist-item-info">
                <h4>${product.name}</h4>
                <strong>${formatPrice(product.price)}</strong>
            </div>
            <div class="wishlist-item-actions">
                <button class="wishlist-remove-btn" data-remove-wishlist="${product.id}" aria-label="Remove from wishlist">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="wishlist-cart-btn" data-wishlist-cart="${product.id}">
                    ADD TO CART
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

// =========================================================
// WISHLIST EVENT DELEGATION
// =========================================================

document.addEventListener('click', function(e) {
    const removeBtn = e.target.closest('[data-remove-wishlist]');
    if (removeBtn) {
        const id = removeBtn.dataset.removeWishlist;
        toggleWishlist(id);
        return;
    }
    
    const addBtn = e.target.closest('[data-wishlist-cart]');
    if (addBtn) {
        const id = addBtn.dataset.wishlistCart;
        const product = getProduct(id);
        if (!product) return;
        
        if (needsSize(product)) {
            toggleWishlist(id);
            setTimeout(() => openProductModal(id), 300);
            return;
        }
        
        addToCart(id, 1, null);
        toggleWishlist(id);
        openBag('cart');
    }
});

// =========================================================
// CART
// =========================================================

function addToCart(id, quantity = 1, size = null) {
    const product = getProduct(id);
    if (!product) {
        showToast('Product not found!', 'error');
        return;
    }
    
    if (needsSize(product) && !size) {
        openProductModal(id);
        return;
    }
    
    let cart = getCart();
    const existing = cart.find(item => item.id === id && item.size === size);
    
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id, quantity, size });
    }
    
    saveCart(cart);
    updateCartUI();
    showToast(`Added ${product.name} to Cart 🛍️`, 'success');
}

function removeFromCart(id, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart(cart);
    updateCartUI();
}

function changeCartQuantity(id, size, change) {
    let cart = getCart();
    const item = cart.find(item => item.id === id && item.size === size);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(id, size);
        return;
    }
    if (item.quantity > 20) item.quantity = 20;
    
    saveCart(cart);
    updateCartUI();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = getProduct(item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// =========================================================
// RENDER CART
// =========================================================

function renderCartDrawer() {
    const container = document.getElementById('cartItems');
    const empty = document.getElementById('emptyCart');
    const summary = document.getElementById('cartSummary');
    const cart = getCart();
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        if (empty) empty.style.display = 'flex';
        if (summary) summary.style.display = 'none';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    if (summary) summary.style.display = 'block';
    
    cart.forEach(item => {
        const product = getProduct(item.id);
        if (!product) return;
        
        const element = document.createElement('div');
        element.className = 'bag-item';
        element.innerHTML = `
            <div class="bag-item-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'">
            </div>
            <div class="bag-item-info">
                <span>${getCategoryName(product.category)}</span>
                <h4>${product.name}</h4>
                ${item.size ? `<small>Size: ${item.size}</small>` : ''}
            </div>
            <strong class="bag-item-price">${formatPrice(product.price * item.quantity)}</strong>
            <div class="bag-item-actions">
                <div class="mini-quantity">
                    <button data-cart-minus data-id="${item.id}" data-size="${item.size || ''}">−</button>
                    <span>${item.quantity}</span>
                    <button data-cart-plus data-id="${item.id}" data-size="${item.size || ''}">+</button>
                </div>
                <button class="remove-item" data-cart-remove data-id="${item.id}" data-size="${item.size || ''}" aria-label="Remove item">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        container.appendChild(element);
    });
}

function updateCartUI() {
    renderCartDrawer();
    
    const count = getCartCount();
    const total = getCartTotal();
    
    document.getElementById('bagCount').textContent = count;
    document.getElementById('mobileCartCount').textContent = count;
    document.getElementById('drawerCartCount').textContent = count;
    document.getElementById('cartTotal').textContent = formatPrice(total);
    document.getElementById('orderTotal').textContent = formatPrice(total);
}

// =========================================================
// CART EVENTS
// =========================================================

document.addEventListener('click', function(e) {
    const plus = e.target.closest('[data-cart-plus]');
    if (plus) {
        changeCartQuantity(plus.dataset.id, plus.dataset.size || null, 1);
        return;
    }
    
    const minus = e.target.closest('[data-cart-minus]');
    if (minus) {
        changeCartQuantity(minus.dataset.id, minus.dataset.size || null, -1);
        return;
    }
    
    const remove = e.target.closest('[data-cart-remove]');
    if (remove) {
        removeFromCart(remove.dataset.id, remove.dataset.size || null);
    }
});

// =========================================================
// PRODUCT MODAL
// =========================================================

const modalElements = {
    overlay: document.getElementById('productModal'),
    close: document.getElementById('modalClose'),
    image: document.getElementById('modalProductImage'),
    category: document.getElementById('modalProductCategory'),
    name: document.getElementById('modalProductName'),
    price: document.getElementById('modalProductPrice'),
    description: document.getElementById('modalProductDescription'),
    wishlistBtn: document.getElementById('modalWishlistBtn'),
    qty: document.getElementById('modalQty'),
    qtyMinus: document.getElementById('modalQtyMinus'),
    qtyPlus: document.getElementById('modalQtyPlus'),
    addCart: document.getElementById('modalAddCart'),
    sizeSection: document.getElementById('modalSizeSection'),
    selectedSizeText: document.getElementById('selectedSizeText')
};

let currentProductId = null;
let currentQuantity = 1;
let selectedSize = null;

function openProductModal(id) {
    const product = getProduct(id);
    if (!product) return;
    
    currentProductId = id;
    currentQuantity = 1;
    selectedSize = null;
    
    modalElements.image.src = product.image;
    modalElements.image.alt = product.name;
    modalElements.category.textContent = getCategoryName(product.category);
    modalElements.name.textContent = product.name;
    modalElements.price.textContent = formatPrice(product.price);
    modalElements.description.textContent = product.description;
    modalElements.qty.textContent = currentQuantity;
    
    const showSize = needsSize(product);
    modalElements.sizeSection.style.display = showSize ? 'block' : 'none';
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    modalElements.selectedSizeText.textContent = showSize ? 'Select a size' : 'Not applicable';
    modalElements.selectedSizeText.style.color = '#8b806e';
    
    updateModalWishlistState(id);
    
    modalElements.overlay.classList.add('active');
    modalElements.overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeProductModal() {
    modalElements.overlay.classList.remove('active');
    modalElements.overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

modalElements.close?.addEventListener('click', closeProductModal);
modalElements.overlay?.addEventListener('click', function(e) {
    if (e.target === this) closeProductModal();
});

function updateModalWishlistState(id) {
    const active = isInWishlist(id);
    modalElements.wishlistBtn.classList.toggle('active', active);
    const icon = modalElements.wishlistBtn.querySelector('i');
    icon.className = (active ? 'fa-solid' : 'fa-regular') + ' fa-heart';
}

modalElements.wishlistBtn?.addEventListener('click', function() {
    if (!currentProductId) return;
    toggleWishlist(currentProductId);
});

// =========================================================
// SIZE SELECTION
// =========================================================

document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedSize = this.dataset.size;
        modalElements.selectedSizeText.textContent = `Selected: ${selectedSize}`;
        modalElements.selectedSizeText.style.color = '#2e7d32';
    });
});

// =========================================================
// MODAL QUANTITY
// =========================================================

modalElements.qtyMinus?.addEventListener('click', function() {
    if (currentQuantity > 1) {
        currentQuantity--;
        modalElements.qty.textContent = currentQuantity;
    }
});

modalElements.qtyPlus?.addEventListener('click', function() {
    if (currentQuantity < 20) {
        currentQuantity++;
        modalElements.qty.textContent = currentQuantity;
    }
});

// =========================================================
// ADD TO CART FROM MODAL
// =========================================================

modalElements.addCart?.addEventListener('click', function() {
    if (!currentProductId) return;
    const product = getProduct(currentProductId);
    if (!product) return;
    
    if (needsSize(product) && !selectedSize) {
        modalElements.selectedSizeText.textContent = 'Please select a size';
        modalElements.selectedSizeText.style.color = '#c62828';
        return;
    }
    
    addToCart(currentProductId, currentQuantity, selectedSize);
    closeProductModal();
    openBag('cart');
});

// =========================================================
// BAG DRAWER
// =========================================================

const bagDrawer = document.getElementById('bagDrawer');
const bagOverlay = document.getElementById('bagOverlay');
const bagBtn = document.getElementById('bagBtn');
const bagClose = document.getElementById('bagClose');

function openBag(view = 'cart') {
    bagDrawer?.classList.add('active');
    bagOverlay?.classList.add('active');
    document.body.classList.add('modal-open');
    switchBagView(view);
}

function closeBag() {
    bagDrawer?.classList.remove('active');
    bagOverlay?.classList.remove('active');
    document.body.classList.remove('modal-open');
}

bagBtn?.addEventListener('click', () => openBag('cart'));
bagClose?.addEventListener('click', closeBag);
bagOverlay?.addEventListener('click', closeBag);

// =========================================================
// BAG TABS
// =========================================================

const bagTabs = document.querySelectorAll('.bag-tab');
const cartView = document.getElementById('cartView');
const wishlistView = document.getElementById('wishlistView');

function switchBagView(view) {
    bagTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.bagView === view);
    });
    if (cartView) cartView.classList.toggle('active', view === 'cart');
    if (wishlistView) wishlistView.classList.toggle('active', view === 'wishlist');
}

bagTabs.forEach(tab => {
    tab.addEventListener('click', () => switchBagView(tab.dataset.bagView));
});

// =========================================================
// MOBILE BAG / WISHLIST
// =========================================================

document.getElementById('mobileCartBtn')?.addEventListener('click', () => openBag('cart'));
document.getElementById('mobileWishlistBtn')?.addEventListener('click', () => openBag('wishlist'));

document.getElementById('continueShopping')?.addEventListener('click', () => {
    closeBag();
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('continueWishlistShopping')?.addEventListener('click', () => {
    closeBag();
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
});

// =========================================================
// SEARCH MODAL
// =========================================================

const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchEmpty = document.getElementById('searchEmpty');

function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add('active');
    document.body.classList.add('modal-open');
    setTimeout(() => searchInput?.focus(), 100);
    if (searchResults) searchResults.innerHTML = '';
    if (searchEmpty) searchEmpty.style.display = 'block';
    if (searchInput) searchInput.value = '';
}

function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

document.getElementById('searchBtn')?.addEventListener('click', openSearchModal);
document.getElementById('mobileSearchBtn')?.addEventListener('click', () => {
    closeMobileMenu();
    openSearchModal();
});

searchClose?.addEventListener('click', closeSearchModal);
searchModal?.addEventListener('click', function(e) {
    if (e.target === this) closeSearchModal();
});

searchInput?.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (!query) {
        if (searchEmpty) searchEmpty.style.display = 'block';
        return;
    }
    
    if (searchEmpty) searchEmpty.style.display = 'none';
    
    const products = getProducts();
    const results = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-empty">
                <i class="fa-solid fa-search"></i>
                <p>No products found for "${query}"</p>
            </div>
        `;
        return;
    }
    
    results.forEach(product => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'">
            <div class="search-result-info">
                <strong>${product.name}</strong>
                <span>${formatPrice(product.price)} • ${getCategoryName(product.category)}</span>
            </div>
        `;
        item.addEventListener('click', () => {
            closeSearchModal();
            openProductModal(product.id);
        });
        searchResults.appendChild(item);
    });
});

// =========================================================
// ACCOUNT MODAL
// =========================================================

const accountModal = document.getElementById('accountModal');
const accountClose = document.getElementById('accountClose');

function openAccountModal() {
    if (!accountModal) return;
    accountModal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeAccountModal() {
    if (!accountModal) return;
    accountModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

document.getElementById('accountBtn')?.addEventListener('click', openAccountModal);
document.getElementById('mobileAccountBtn')?.addEventListener('click', () => {
    closeMobileMenu();
    openAccountModal();
});

accountClose?.addEventListener('click', closeAccountModal);
accountModal?.addEventListener('click', function(e) {
    if (e.target === this) closeAccountModal();
});

document.getElementById('accountNotifyBtn')?.addEventListener('click', function() {
    showToast('We\'ll notify you when ready! 📧', 'success');
    closeAccountModal();
});

// =========================================================
// CHECKOUT / ORDER
// =========================================================

const checkoutBtn = document.getElementById('checkoutBtn');
const orderModal = document.getElementById('orderModal');
const orderClose = document.getElementById('orderClose');
const orderForm = document.getElementById('orderForm');
const orderSuccessModal = document.getElementById('orderSuccessModal');
const orderSuccessClose = document.getElementById('orderSuccessClose');
const successMessage = document.getElementById('successMessage');
const successDetails = document.getElementById('successDetails');

function openOrderModal() {
    if (getCartCount() === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    if (!orderModal) return;
    orderModal.classList.add('active');
    document.body.classList.add('modal-open');
    document.getElementById('orderTotal').textContent = formatPrice(getCartTotal());
}

function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

checkoutBtn?.addEventListener('click', openOrderModal);
orderClose?.addEventListener('click', closeOrderModal);
orderModal?.addEventListener('click', function(e) {
    if (e.target === this) closeOrderModal();
});

orderForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('customerName')?.value.trim();
    const phone = document.getElementById('customerPhone')?.value.trim();
    const address = document.getElementById('customerAddress')?.value.trim();
    
    if (!name || !phone || !address) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    const cart = getCart();
    let orderSummary = `<strong>Order Summary:</strong><br>`;
    cart.forEach(item => {
        const product = getProduct(item.id);
        if (!product) return;
        const sizeText = item.size ? ` (Size: ${item.size})` : '';
        orderSummary += `${product.name}${sizeText} × ${item.quantity} = ${formatPrice(product.price * item.quantity)}<br>`;
    });
    orderSummary += `<br><strong>Total:</strong> ${formatPrice(getCartTotal())}`;
    orderSummary += `<br><br><strong>Delivery Details:</strong><br>Name: ${name}<br>Phone: ${phone}<br>Address: ${address}`;
    
    const orders = getOrders();
    const newOrder = {
        id: 'ORD-' + String(orders.length + 1).padStart(3, '0'),
        customer: name,
        phone: phone,
        address: address,
        items: cart.map(item => {
            const product = getProduct(item.id);
            return {
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                size: item.size
            };
        }),
        total: getCartTotal(),
        status: 'pending',
        date: new Date().toISOString()
    };
    orders.push(newOrder);
    saveOrders(orders);
    
    if (successDetails) successDetails.innerHTML = orderSummary;
    if (successMessage) successMessage.textContent = `Thank you, ${name}! We will contact you at ${phone} to confirm your order.`;
    
    saveCart([]);
    updateCartUI();
    orderForm.reset();
    
    closeOrderModal();
    if (orderSuccessModal) {
        orderSuccessModal.classList.add('active');
        document.body.classList.add('modal-open');
    }
    closeBag();
});

function closeOrderSuccess() {
    if (!orderSuccessModal) return;
    orderSuccessModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    closeBag();
}

orderSuccessClose?.addEventListener('click', closeOrderSuccess);
orderSuccessModal?.addEventListener('click', function(e) {
    if (e.target === this) closeOrderSuccess();
});

// =========================================================
// MOBILE MENU
// =========================================================

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function closeMobileMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }
}

menuBtn?.addEventListener('click', function() {
    const isOpen = navLinks?.classList.toggle('active');
    if (mobileOverlay) mobileOverlay.classList.toggle('active', isOpen);
    this.setAttribute('aria-expanded', isOpen);
    const icon = this.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
    }
});

mobileOverlay?.addEventListener('click', closeMobileMenu);

navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// =========================================================
// NAVBAR SCROLL
// =========================================================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
}, { passive: true });

// =========================================================
// HERO PARALLAX
// =========================================================

const heroImage = document.getElementById('heroImage');
const hero = document.querySelector('.hero');

if (hero && heroImage && window.innerWidth > 768) {
    hero.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const moveX = (x - 0.5) * 6;
        const moveY = (y - 0.5) * 4;
        heroImage.style.transform = `scale(1.035) translate(${moveX}px, ${moveY}px)`;
    });
    
    hero.addEventListener('mouseleave', function() {
        heroImage.style.transform = 'scale(1.035) translate(0, 0)';
    });
}

// =========================================================
// REVIEW SLIDER
// =========================================================

let currentReview = 0;
let reviewInterval;

function renderReviews() {
    const track = document.getElementById('reviewsTrack');
    const dots = document.getElementById('reviewDots');
    if (!track) return;
    
    const reviews = DEFAULT_REVIEWS;
    
    track.innerHTML = '';
    reviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-avatar">
                <img src="${review.image}" alt="${review.name}" onerror="this.src='assets/placeholder.jpg'">
            </div>
            <div class="review-content">
                <div class="review-top">
                    <div class="stars">★★★★★</div>
                    <span class="quote-mark">“</span>
                </div>
                <p>${review.text}</p>
                <strong>— ${review.name}</strong>
                <span class="review-product">
                    <i class="fa-regular fa-gem"></i> ${review.product}
                </span>
            </div>
        `;
        track.appendChild(card);
    });
    
    if (dots) {
        dots.innerHTML = '';
        reviews.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'review-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Review ${i + 1}`);
            dot.addEventListener('click', () => goToReview(i));
            dots.appendChild(dot);
        });
    }
    
    updateReviewSlider();
    startReviewAutoPlay();
}

function updateReviewSlider() {
    const track = document.getElementById('reviewsTrack');
    const dots = document.querySelectorAll('.review-dot');
    if (!track) return;
    
    const width = 100;
    track.style.transform = `translateX(-${currentReview * width}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentReview);
    });
}

function goToReview(index) {
    stopReviewAutoPlay();
    currentReview = index;
    updateReviewSlider();
    startReviewAutoPlay();
}

function nextReview() {
    const total = DEFAULT_REVIEWS.length;
    currentReview = (currentReview + 1) % total;
    updateReviewSlider();
}

function startReviewAutoPlay() {
    stopReviewAutoPlay();
    reviewInterval = setInterval(nextReview, 4000);
}

function stopReviewAutoPlay() {
    if (reviewInterval) {
        clearInterval(reviewInterval);
        reviewInterval = null;
    }
}

document.getElementById('reviewPrev')?.addEventListener('click', function() {
    stopReviewAutoPlay();
    const total = DEFAULT_REVIEWS.length;
    currentReview = (currentReview - 1 + total) % total;
    updateReviewSlider();
    startReviewAutoPlay();
});

document.getElementById('reviewNext')?.addEventListener('click', function() {
    stopReviewAutoPlay();
    nextReview();
    startReviewAutoPlay();
});

// =========================================================
// KEYBOARD SHORTCUTS
// =========================================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
        closeOrderModal();
        closeOrderSuccess();
        closeSearchModal();
        closeAccountModal();
        closeBag();
        closeMobileMenu();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
});

// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🪄 Jhunjhur Initializing...');
    
    loadWishlist();
    renderCategories();
    
    const products = getProducts();
    console.log(`📦 ${products.length} products loaded`);
    
    applyFilters();
    renderReviews();
    updateCartUI();
    updateWishlistUI();
    
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.category);
        });
    });
    
    console.log('✨ Jhunjhur — Desi Jewellery & Accessories');
    console.log(`❤️ ${wishlistIds.length} items in wishlist`);
    console.log(`🛒 ${getCartCount()} items in cart`);
});

// =========================================================
// EXPOSE FOR ADMIN PANEL
// =========================================================

window.getProducts = getProducts;
window.saveProducts = saveProducts;
window.DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;
window.reloadProducts = function() {
    applyFilters();
};
