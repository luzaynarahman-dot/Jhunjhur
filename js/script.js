/* =========================================================  
   NAVBAR  
========================================================= */  

const navbar = document.getElementById("navbar");  

window.addEventListener("scroll", () => {  
    navbar.classList.toggle("scrolled", window.scrollY > 30);  
}, { passive: true });  

/* =========================================================  
   MOBILE MENU  
========================================================= */  

const menuBtn = document.getElementById("menuBtn");  
const navLinks = document.getElementById("navLinks");  
const mobileOverlay = document.getElementById("mobileOverlay");  

function closeMobileMenu() {  
    navLinks.classList.remove("active");  
    mobileOverlay.classList.remove("active");  
    menuBtn.setAttribute("aria-expanded", "false");  
    const icon = menuBtn.querySelector("i");  
    icon.classList.remove("fa-xmark");  
    icon.classList.add("fa-bars");  
}  

menuBtn.addEventListener("click", () => {  
    const isOpen = navLinks.classList.toggle("active");  
    mobileOverlay.classList.toggle("active", isOpen);  
    menuBtn.setAttribute("aria-expanded", isOpen);  
    const icon = menuBtn.querySelector("i");  
    icon.classList.toggle("fa-bars", !isOpen);  
    icon.classList.toggle("fa-xmark", isOpen);  
});  

mobileOverlay.addEventListener("click", closeMobileMenu);  

navLinks.querySelectorAll("a").forEach(link => {  
    link.addEventListener("click", closeMobileMenu);  
});  

/* =========================================================  
   HERO PARALLAX  
========================================================= */  

const hero = document.querySelector(".hero");  
const heroImage = document.getElementById("heroImage");  
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;  

if (hero && heroImage && !reducedMotion && window.innerWidth > 768) {  
    hero.addEventListener("mousemove", (event) => {  
        const rect = hero.getBoundingClientRect();  
        const x = (event.clientX - rect.left) / rect.width;  
        const y = (event.clientY - rect.top) / rect.height;  
        const moveX = (x - 0.5) * 6;  
        const moveY = (y - 0.5) * 4;  
        heroImage.style.transform = `scale(1.035) translate(${moveX}px, ${moveY}px)`;  
    });  
    hero.addEventListener("mouseleave", () => {  
        heroImage.style.transform = "scale(1.035) translate(0, 0)";  
    });  
}  

/* =========================================================  
   PRODUCT DATA  
========================================================= */  

const productCards = document.querySelectorAll(".product-card");  
const products = {};  

productCards.forEach(card => {  
    products[card.dataset.id] = {  
        id: card.dataset.id,  
        category: card.dataset.category,  
        name: card.dataset.name,  
        price: Number(card.dataset.price),  
        image: card.dataset.image,  
        description: card.dataset.description  
    };  
});  

/* =========================================================  
   LOCAL STORAGE  
========================================================= */  

let cart = JSON.parse(localStorage.getItem("jhunjhurCart")) || [];  
let wishlist = JSON.parse(localStorage.getItem("jhunjhurWishlist")) || [];  

function saveCart() {  
    localStorage.setItem("jhunjhurCart", JSON.stringify(cart));  
}  

function saveWishlist() {  
    localStorage.setItem("jhunjhurWishlist", JSON.stringify(wishlist));  
}  

/* =========================================================  
   TOAST NOTIFICATION  
========================================================= */  

function showToast(message, type = "success") {  
    const container = document.getElementById("toastContainer");  
    const toast = document.createElement("div");  
    toast.className = `toast toast-${type}`;  
    const icon = type === "success" ? "fa-check-circle" : "fa-exclamation-circle";  
    toast.innerHTML = `  
        <i class="fa-solid ${icon}"></i>  
        <div class="toast-content">  
            <strong>${message}</strong>  
            <span>${type === "success" ? "✓ Success" : "⚠️ Notice"}</span>  
        </div>  
    `;  
    container.appendChild(toast);  
    setTimeout(() => {  
        if (toast.parentNode) toast.remove();  
    }, 2500);  
}  

/* =========================================================  
   HELPERS  
========================================================= */  

function formatPrice(price) {  
    return `৳${Number(price).toLocaleString("en-BD")}`;  
}  

function getCategoryName(category) {  
    const names = {  
        bangles: "BANGLES",  
        earrings: "EARRINGS",  
        pendants: "PENDANTS",  
        rings: "RINGS",  
        tikli: "TIKLI",  
        hair: "HAIR ACCESSORIES"  
    };  
    return names[category] || "JHUNJHUR";  
}  

function getProduct(id) {  
    return products[id];  
}  

function needsSize(product) {  
    return ["bangles", "rings"].includes(product.category);  
}  

function getDefaultSize(id) {  
    const product = getProduct(id);  
    if (product && needsSize(product)) {  
        return "2.6";  
    }  
    return null;  
}  

/* =========================================================  
   WISHLIST  
========================================================= */  

function isInWishlist(id) {  
    return wishlist.includes(id);  
}  

function toggleWishlist(id) {  
    if (isInWishlist(id)) {  
        wishlist = wishlist.filter(item => item !== id);  
        showToast("Removed from Wishlist 💔", "error");  
    } else {  
        wishlist.push(id);  
        showToast("Added to Wishlist ❤️", "success");  
    }  
    saveWishlist();  
    updateWishlistUI();  
    updateModalWishlistState(id);  
}  

function updateWishlistUI() {  
    document.querySelectorAll(".wishlist-btn").forEach(button => {  
        const card = button.closest(".product-card");  
        if (!card) return;  
        const id = card.dataset.id;  
        const active = isInWishlist(id);  
        button.classList.toggle("active", active);  
        button.setAttribute("aria-label", active ? "Remove from wishlist" : "Add to wishlist");  
        const icon = button.querySelector("i");  
        icon.classList.toggle("fa-solid", active);  
        icon.classList.toggle("fa-regular", !active);  
    });  

    const wishlistCount = wishlist.length;  
    document.getElementById("mobileWishlistCount").textContent = wishlistCount;  
    document.getElementById("drawerWishlistCount").textContent = wishlistCount;  
    renderWishlist();  
}  

function renderWishlist() {  
    const container = document.getElementById("wishlistItems");  
    const empty = document.getElementById("emptyWishlist");  
    container.innerHTML = "";  

    if (wishlist.length === 0) {  
        empty.style.display = "flex";  
        return;  
    }  
    empty.style.display = "none";  

    wishlist.forEach(id => {  
        const product = getProduct(id);  
        if (!product) return;  
        const item = document.createElement("div");  
        item.className = "wishlist-item";  
        item.innerHTML = `  
            <div class="wishlist-item-image">  
                <img src="${product.image}" alt="${product.name}">  
            </div>  
            <div class="wishlist-item-info">  
                <h4>${product.name}</h4>  
                <strong>${formatPrice(product.price)}</strong>  
            </div>  
            <div class="wishlist-item-actions">  
                <button type="button" class="wishlist-remove-btn" data-remove-wishlist="${product.id}" aria-label="Remove from wishlist">  
                    <i class="fa-solid fa-trash"></i>  
                </button>  
                <button type="button" class="wishlist-cart-btn" data-wishlist-cart="${product.id}">  
                    ADD TO CART  
                </button>  
            </div>  
        `;  
        container.appendChild(item);  
    });  
}  

/* =========================================================  
   WISHLIST EVENT DELEGATION  
========================================================= */  

document.addEventListener("click", (event) => {  
    const removeButton = event.target.closest("[data-remove-wishlist]");  
    if (removeButton) {  
        const id = removeButton.dataset.removeWishlist;  
        toggleWishlist(id);  
        return;  
    }  

    const addButton = event.target.closest("[data-wishlist-cart]");  
    if (addButton) {  
        const id = addButton.dataset.wishlistCart;  
        const product = getProduct(id);  
        if (needsSize(product)) {  
            toggleWishlist(id);  
            setTimeout(() => {  
                openProductModal(id);  
            }, 300);  
            return;  
        }  
        addToCart(id, 1, null);  
        openBag("cart");  
    }  
});  

/* =========================================================  
   CART  
========================================================= */  

function addToCart(id, quantity = 1, size = null) {  
    const product = getProduct(id);  
    if (!product) return;  

    if (needsSize(product) && !size) {  
        openProductModal(id);  
        return;  
    }  

    const existing = cart.find(item => item.id === id && item.size === size);  
    if (existing) {  
        existing.quantity += quantity;  
    } else {  
        cart.push({ id, quantity, size });  
    }  

    saveCart();  
    updateCartUI();  
    showToast(`Added ${product.name} to Cart 🛍️`, "success");  
}  

function removeFromCart(id, size) {  
    cart = cart.filter(item => !(item.id === id && item.size === size));  
    saveCart();  
    updateCartUI();  
}  

function changeCartQuantity(id, size, change) {  
    const item = cart.find(item => item.id === id && item.size === size);  
    if (!item) return;  
    item.quantity += change;  
    if (item.quantity <= 0) {  
        removeFromCart(id, size);  
        return;  
    }  
    if (item.quantity > 20) item.quantity = 20;  
    saveCart();  
    updateCartUI();  
}  

function getCartTotal() {  
    return cart.reduce((total, item) => {  
        const product = getProduct(item.id);  
        if (!product) return total;  
        return total + product.price * item.quantity;  
    }, 0);  
}  

function getCartCount() {  
    return cart.reduce((total, item) => total + item.quantity, 0);  
}  

/* =========================================================  
   RENDER CART  
========================================================= */  

function renderCart() {  
    const container = document.getElementById("cartItems");  
    const empty = document.getElementById("emptyCart");  
    const summary = document.getElementById("cartSummary");  
    container.innerHTML = "";  

    if (cart.length === 0) {  
        empty.style.display = "flex";  
        summary.style.display = "none";  
        return;  
    }  
    empty.style.display = "none";  
    summary.style.display = "block";  

    cart.forEach(item => {  
        const product = getProduct(item.id);  
        if (!product) return;  
        const element = document.createElement("div");  
        element.className = "bag-item";  
        element.innerHTML = `  
            <div class="bag-item-image">  
                <img src="${product.image}" alt="${product.name}">  
            </div>  
            <div class="bag-item-info">  
                <span>${getCategoryName(product.category)}</span>  
                <h4>${product.name}</h4>  
                ${item.size ? `<small>Size: ${item.size}</small>` : ""}  
            </div>  
            <strong class="bag-item-price">${formatPrice(product.price * item.quantity)}</strong>  
            <div class="bag-item-actions">  
                <div class="mini-quantity">  
                    <button type="button" data-cart-minus data-id="${item.id}" data-size="${item.size || ""}">−</button>  
                    <span>${item.quantity}</span>  
                    <button type="button" data-cart-plus data-id="${item.id}" data-size="${item.size || ""}">+</button>  
                </div>  
                <button type="button" class="remove-item" data-cart-remove data-id="${item.id}" data-size="${item.size || ""}">Remove</button>  
            </div>  
        `;  
        container.appendChild(element);  
    });  
}  

function updateCartUI() {  
    renderCart();  
    const count = getCartCount();  
    const total = getCartTotal();  
    document.getElementById("bagCount").textContent = count;  
    document.getElementById("mobileCartCount").textContent = count;  
    document.getElementById("drawerCartCount").textContent = count;  
    document.getElementById("cartTotal").textContent = formatPrice(total);  
    document.getElementById("orderTotal").textContent = formatPrice(total);  
}  

/* =========================================================  
   CART BUTTON EVENTS  
========================================================= */  

document.addEventListener("click", (event) => {  
    const plus = event.target.closest("[data-cart-plus]");  
    if (plus) {  
        changeCartQuantity(plus.dataset.id, plus.dataset.size || null, 1);  
        return;  
    }  
    const minus = event.target.closest("[data-cart-minus]");  
    if (minus) {  
        changeCartQuantity(minus.dataset.id, minus.dataset.size || null, -1);  
        return;  
    }  
    const remove = event.target.closest("[data-cart-remove]");  
    if (remove) {  
        removeFromCart(remove.dataset.id, remove.dataset.size || null);  
    }  
});  

/* =========================================================  
   PRODUCT MODAL  
========================================================= */  

const productModal = document.getElementById("productModal");  
const modalClose = document.getElementById("modalClose");  
const modalImage = document.getElementById("modalProductImage");  
const modalCategory = document.getElementById("modalProductCategory");  
const modalName = document.getElementById("modalProductName");  
const modalPrice = document.getElementById("modalProductPrice");  
const modalDescription = document.getElementById("modalProductDescription");  
const modalWishlistBtn = document.getElementById("modalWishlistBtn");  
const modalQty = document.getElementById("modalQty");  
const modalQtyMinus = document.getElementById("modalQtyMinus");  
const modalQtyPlus = document.getElementById("modalQtyPlus");  
const modalAddCart = document.getElementById("modalAddCart");  
const sizeSection = document.getElementById("modalSizeSection");  
const sizeButtons = document.querySelectorAll(".size-btn");  
const selectedSizeText = document.getElementById("selectedSizeText");  

let currentProductId = null;  
let currentQuantity = 1;  
let selectedSize = null;  

function openProductModal(id) {  
    const product = getProduct(id);  
    if (!product) return;  

    currentProductId = id;  
    currentQuantity = 1;  
    selectedSize = null;  

    modalImage.src = product.image;  
    modalImage.alt = product.name;  
    modalCategory.textContent = getCategoryName(product.category);  
    modalName.textContent = product.name;  
    modalPrice.textContent = formatPrice(product.price);  
    modalDescription.textContent = product.description;  
    modalQty.textContent = currentQuantity;  

    sizeSection.style.display = needsSize(product) ? "block" : "none";  
    sizeButtons.forEach(button => button.classList.remove("active"));  
    selectedSizeText.textContent = needsSize(product) ? "Select a size" : "Not applicable";  
    selectedSizeText.style.color = "#8b806e";  

    updateModalWishlistState(id);  
    productModal.classList.add("active");  
    productModal.setAttribute("aria-hidden", "false");  
    document.body.classList.add("modal-open");  
}  

function closeProductModal() {  
    productModal.classList.remove("active");  
    productModal.setAttribute("aria-hidden", "true");  
    document.body.classList.remove("modal-open");  
}  

modalClose.addEventListener("click", closeProductModal);  
productModal.addEventListener("click", (event) => {  
    if (event.target === productModal) closeProductModal();  
});  

productCards.forEach(card => {  
    card.addEventListener("click", (event) => {  
        if (event.target.closest(".wishlist-btn")) return;  
        openProductModal(card.dataset.id);  
    });  
});  

document.querySelectorAll(".wishlist-btn").forEach(button => {  
    button.addEventListener("click", (event) => {  
        event.stopPropagation();  
        const card = button.closest(".product-card");  
        if (!card) return;  
        toggleWishlist(card.dataset.id);  
    });  
});  

function updateModalWishlistState(id) {  
    const active = isInWishlist(id);  
    modalWishlistBtn.classList.toggle("active", active);  
    const icon = modalWishlistBtn.querySelector("i");  
    icon.classList.toggle("fa-solid", active);  
    icon.classList.toggle("fa-regular", !active);  
}  

modalWishlistBtn.addEventListener("click", () => {  
    if (!currentProductId) return;  
    toggleWishlist(currentProductId);  
});  

/* =========================================================  
   SIZE  
========================================================= */  

sizeButtons.forEach(button => {  
    button.addEventListener("click", () => {  
        sizeButtons.forEach(item => item.classList.remove("active"));  
        button.classList.add("active");  
        selectedSize = button.dataset.size;  
        selectedSizeText.textContent = `Selected: ${selectedSize}`;  
        selectedSizeText.style.color = "#2e7d32";  
    });  
});  

/* =========================================================  
   MODAL QUANTITY  
========================================================= */  

modalQtyMinus.addEventListener("click", () => {  
    if (currentQuantity > 1) {  
        currentQuantity--;  
        modalQty.textContent = currentQuantity;  
    }  
});  

modalQtyPlus.addEventListener("click", () => {  
    if (currentQuantity < 20) {  
        currentQuantity++;  
        modalQty.textContent = currentQuantity;  
    }  
});  

/* =========================================================  
   ADD TO CART FROM MODAL  
========================================================= */  

modalAddCart.addEventListener("click", () => {  
    if (!currentProductId) return;  
    const product = getProduct(currentProductId);  

    if (needsSize(product) && !selectedSize) {  
        selectedSizeText.textContent = "Please select a size";  
        selectedSizeText.style.color = "#c62828";  
        return;  
    }  

    addToCart(currentProductId, currentQuantity, selectedSize);  
    closeProductModal();  
    openBag("cart");  
});  

/* =========================================================  
   BAG DRAWER  
========================================================= */  

const bagDrawer = document.getElementById("bagDrawer");  
const bagOverlay = document.getElementById("bagOverlay");  
const bagBtn = document.getElementById("bagBtn");  
const bagClose = document.getElementById("bagClose");  

function openBag(view = "cart") {  
    bagDrawer.classList.add("active");  
    bagOverlay.classList.add("active");  
    bagDrawer.setAttribute("aria-hidden", "false");  
    bagOverlay.setAttribute("aria-hidden", "false");  
    document.body.classList.add("modal-open");  
    switchBagView(view);  
    closeMobileMenu();  
}  

function closeBag() {  
    bagDrawer.classList.remove("active");  
    bagOverlay.classList.remove("active");  
    bagDrawer.setAttribute("aria-hidden", "true");  
    bagOverlay.setAttribute("aria-hidden", "true");  
    document.body.classList.remove("modal-open");  
}  

bagBtn.addEventListener("click", () => openBag("cart"));  
bagClose.addEventListener("click", closeBag);  
bagOverlay.addEventListener("click", closeBag);  

/* =========================================================  
   BAG TABS  
========================================================= */  

const bagTabs = document.querySelectorAll(".bag-tab");  
const cartView = document.getElementById("cartView");  
const wishlistView = document.getElementById("wishlistView");  

function switchBagView(view) {  
    bagTabs.forEach(tab => {  
        tab.classList.toggle("active", tab.dataset.bagView === view);  
    });  
    cartView.classList.toggle("active", view === "cart");  
    wishlistView.classList.toggle("active", view === "wishlist");  
}  

bagTabs.forEach(tab => {  
    tab.addEventListener("click", () => {  
        switchBagView(tab.dataset.bagView);  
    });  
});  

/* =========================================================  
   MOBILE BAG / WISHLIST  
========================================================= */  

document.getElementById("mobileCartBtn").addEventListener("click", () => {  
    openBag("cart");  
});  

document.getElementById("mobileWishlistBtn").addEventListener("click", () => {  
    openBag("wishlist");  
});  

document.getElementById("continueShopping").addEventListener("click", () => {  
    closeBag();  
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });  
});  

document.getElementById("continueWishlistShopping").addEventListener("click", () => {  
    closeBag();  
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });  
});  

/* =========================================================  
   SEARCH MODAL  
========================================================= */  

const searchModal = document.getElementById("searchModal");  
const searchClose = document.getElementById("searchClose");  
const searchInput = document.getElementById("searchInput");  
const searchResults = document.getElementById("searchResults");  
const searchEmpty = document.getElementById("searchEmpty");  

function openSearchModal() {  
    searchModal.classList.add("active");  
    searchModal.setAttribute("aria-hidden", "false");  
    document.body.classList.add("modal-open");  
    setTimeout(() => searchInput.focus(), 100);  
    searchResults.innerHTML = "";  
    searchEmpty.style.display = "block";  
    searchInput.value = "";  
}  

function closeSearchModal() {  
    searchModal.classList.remove("active");  
    searchModal.setAttribute("aria-hidden", "true");  
    document.body.classList.remove("modal-open");  
}  

document.getElementById("searchBtn").addEventListener("click", openSearchModal);  
document.getElementById("mobileSearchBtn").addEventListener("click", () => {  
    closeMobileMenu();  
    openSearchModal();  
});  

searchClose.addEventListener("click", closeSearchModal);  
searchModal.addEventListener("click", (event) => {  
    if (event.target === searchModal) closeSearchModal();  
});  

searchInput.addEventListener("input", () => {  
    const query = searchInput.value.trim().toLowerCase();  
    searchResults.innerHTML = "";  

    if (!query) {  
        searchEmpty.style.display = "block";  
        return;  
    }  

    searchEmpty.style.display = "none";  
    const results = Object.values(products).filter(product =>  
        product.name.toLowerCase().includes(query) ||  
        product.category.toLowerCase().includes(query)  
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
        const item = document.createElement("div");  
        item.className = "search-result-item";  
        item.innerHTML = `  
            <img src="${product.image}" alt="${product.name}">  
            <div class="search-result-info">  
                <strong>${product.name}</strong>  
                <span>${formatPrice(product.price)} • ${getCategoryName(product.category)}</span>  
            </div>  
        `;  
        item.addEventListener("click", () => {  
            closeSearchModal();  
            openProductModal(product.id);  
        });  
        searchResults.appendChild(item);  
    });  
});  

document.addEventListener("keydown", (event) => {  
    if (event.key === "Escape") {  
        closeSearchModal();  
        closeProductModal();  
        closeOrderModal();  
        closeBag();  
        closeMobileMenu();  
    }  
});  

/* =========================================================  
   ACCOUNT MODAL  
========================================================= */  

const accountModal = document.getElementById("accountModal");  
const accountClose = document.getElementById("accountClose");  
const accountNotifyBtn = document.getElementById("accountNotifyBtn");  

function openAccountModal() {  
    accountModal.classList.add("active");  
    accountModal.setAttribute("aria-hidden", "false");  
    document.body.classList.add("modal-open");  
}  

function closeAccountModal() {  
    accountModal.classList.remove("active");  
    accountModal.setAttribute("aria-hidden", "true");  
    document.body.classList.remove("modal-open");  
}  

document.getElementById("accountBtn").addEventListener("click", openAccountModal);  
document.getElementById("mobileAccountBtn").addEventListener("click", () => {  
    closeMobileMenu();  
    openAccountModal();  
});  

accountClose.addEventListener("click", closeAccountModal);  
accountModal.addEventListener("click", (event) => {  
    if (event.target === accountModal) closeAccountModal();  
});  

accountNotifyBtn.addEventListener("click", () => {  
    showToast("We'll notify you when ready! 📧", "success");  
    closeAccountModal();  
});  

/* =========================================================  
   CHECKOUT / ORDER  
========================================================= */  

const checkoutBtn = document.getElementById("checkoutBtn");  
const orderModal = document.getElementById("orderModal");  
const orderClose = document.getElementById("orderClose");  
const orderForm = document.getElementById("orderForm");  
const orderSuccessModal = document.getElementById("orderSuccessModal");  
const orderSuccessClose = document.getElementById("orderSuccessClose");  
const successMessage = document.getElementById("successMessage");  
const successDetails = document.getElementById("successDetails");  

function openOrderModal() {  
    if (cart.length === 0) return;  
    orderModal.classList.add("active");  
    orderModal.setAttribute("aria-hidden", "false");  
    document.body.classList.add("modal-open");  
    document.getElementById("orderTotal").textContent = formatPrice(getCartTotal());  
}  

function closeOrderModal() {  
    orderModal.classList.remove("active");  
    orderModal.setAttribute("aria-hidden", "true");  
    document.body.classList.remove("modal-open");  
}  

checkoutBtn.addEventListener("click", openOrderModal);  
orderClose.addEventListener("click", closeOrderModal);  
orderModal.addEventListener("click", (event) => {  
    if (event.target === orderModal) closeOrderModal();  
});  

orderForm.addEventListener("submit", (event) => {  
    event.preventDefault();  

    const name = document.getElementById("customerName").value.trim();  
    const phone = document.getElementById("customerPhone").value.trim();  
    const address = document.getElementById("customerAddress").value.trim();  

    if (!name || !phone || !address) {  
        showToast("Please fill in all fields", "error");  
        return;  
    }  

    let orderSummary = `<strong>Order Summary:</strong><br>`;  
    cart.forEach(item => {  
        const product = getProduct(item.id);  
        if (!product) return;  
        const sizeText = item.size ? ` (Size: ${item.size})` : "";  
        orderSummary += `${product.name}${sizeText} × ${item.quantity} = ${formatPrice(product.price * item.quantity)}<br>`;  
    });  
    orderSummary += `<br><strong>Total:</strong> ${formatPrice(getCartTotal())}`;  
    orderSummary += `<br><br><strong>Delivery Details:</strong><br>Name: ${name}<br>Phone: ${phone}<br>Address: ${address}`;  

    successDetails.innerHTML = orderSummary;  
    successMessage.textContent = `Thank you, ${name}! We will contact you at ${phone} to confirm your order.`;  

    closeOrderModal();  

    cart = [];  
    saveCart();  
    updateCartUI();  
    orderForm.reset();  

    orderSuccessModal.classList.add("active");  
    orderSuccessModal.setAttribute("aria-hidden", "false");  
    document.body.classList.add("modal-open");  
    closeBag();  
});  

function closeOrderSuccess() {  
    orderSuccessModal.classList.remove("active");  
    orderSuccessModal.setAttribute("aria-hidden", "true");  
    document.body.classList.remove("modal-open");  
    closeBag();  
}  

orderSuccessClose.addEventListener("click", closeOrderSuccess);  
orderSuccessModal.addEventListener("click", (event) => {  
    if (event.target === orderSuccessModal) closeOrderSuccess();  
});  

/* =========================================================  
   CATEGORY FILTER  
========================================================= */  

const categoryTabs = document.querySelectorAll(".category-tab");  
const productHeading = document.getElementById("productHeading");  
const productSubheading = document.getElementById("productSubheading");  
const productCount = document.getElementById("productCount");  

const categoryInfo = {  
    all: { title: "All Products", subtitle: "সব ধরনের সুন্দর প্রোডাক্ট" },  
    bangles: { title: "Bangles", subtitle: "দেশি সাজের চিরচেনা সৌন্দর্য" },  
    earrings: { title: "Earrings", subtitle: "ছোট্ট দুলে সাজ হোক আরও সুন্দর" },  
    pendants: { title: "Pendants", subtitle: "গলায় থাকুক ছোট্ট একটুকরো সৌন্দর্য" },  
    rings: { title: "Rings", subtitle: "আপনার আঙুলের জন্য ছোট্ট সৌন্দর্য" },  
    tikli: { title: "Tikli", subtitle: "দেশি সাজে একটুখানি ঐতিহ্য" },  
    hair: { title: "Hair Accessories", subtitle: "চুলের সাজেও থাকুক Jhunjhur-এর ছোঁয়া" }  
};  

function filterProducts(category) {  
    let visibleCount = 0;  
    productCards.forEach(card => {  
        const cardCategory = card.dataset.category;  
        const shouldShow = category === "all" || cardCategory === category;  
        if (shouldShow) {  
            card.classList.remove("hidden");  
            visibleCount++;  
        } else {  
            card.classList.add("hidden");  
        }  
    });  

    productHeading.textContent = categoryInfo[category].title;  
    productSubheading.textContent = categoryInfo[category].subtitle;  
    productCount.textContent = `${visibleCount} Products`;  
}  

categoryTabs.forEach(tab => {  
    tab.addEventListener("click", () => {  
        const selectedCategory = tab.dataset.category;  
        categoryTabs.forEach(item => item.classList.remove("active"));  
        tab.classList.add("active");  
        filterProducts(selectedCategory);  

        if (window.innerWidth <= 768) {  
            document.querySelector(".products-wrapper").scrollIntoView({  
                behavior: "smooth",  
                block: "start"  
            });  
        }  
    });  
});  

/* =========================================================  
   CUSTOMER REVIEW SLIDER  
========================================================= */  

const reviewsTrack = document.getElementById("reviewsTrack");  
const reviewCards = document.querySelectorAll(".review-card");  
const reviewPrev = document.getElementById("reviewPrev");  
const reviewNext = document.getElementById("reviewNext");  
const reviewDots = document.querySelectorAll(".review-dot");  

let currentReview = 0;  
let autoPlayInterval;  

function updateReviewSlider() {  
    if (!reviewsTrack || !reviewCards.length) return;  

    reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`;  

    reviewDots.forEach((dot, index) => {  
        dot.classList.toggle("active", index === currentReview);  
    });  
}  

function nextReview() {  
    currentReview++;  
    if (currentReview >= reviewCards.length) {  
        currentReview = 0;  
    }  
    updateReviewSlider();  
}  

function previousReview() {  
    currentReview--;  
    if (currentReview < 0) {  
        currentReview = reviewCards.length - 1;  
    }  
    updateReviewSlider();  
}  

function startAutoPlay() {  
    if (reviewCards.length <= 1) return;  
    autoPlayInterval = setInterval(nextReview, 4000);  
}  

function stopAutoPlay() {  
    clearInterval(autoPlayInterval);  
}  

if (reviewNext && reviewPrev) {  
    reviewNext.addEventListener("click", () => {  
        stopAutoPlay();  
        nextReview();  
        startAutoPlay();  
    });  
    reviewPrev.addEventListener("click", () => {  
        stopAutoPlay();  
        previousReview();  
        startAutoPlay();  
    });  

    reviewDots.forEach((dot, index) => {  
        dot.addEventListener("click", () => {  
            stopAutoPlay();  
            currentReview = index;  
            updateReviewSlider();  
            startAutoPlay();  
        });  
    });  

    const reviewsSlider = document.querySelector('.reviews-slider');  
    if (reviewsSlider) {  
        reviewsSlider.addEventListener('mouseenter', stopAutoPlay);  
        reviewsSlider.addEventListener('mouseleave', startAutoPlay);  
    }  
}  

// Initialize review slider  
if (reviewCards.length > 0) {  
    updateReviewSlider();  
    startAutoPlay();  
}  

/* =========================================================  
   INITIAL STATE  
========================================================= */  

filterProducts("all");  
updateWishlistUI();  
updateCartUI();  

/* =========================================================  
   KEYBOARD SHORTCUTS  
========================================================= */  

document.addEventListener("keydown", (event) => {  
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {  
        event.preventDefault();  
        openSearchModal();  
    }  
});  

console.log("🪄 Jhunjhur — Desi Jewellery & Accessories");  
console.log("✨ Made with ❤️ for desi vibes");  
