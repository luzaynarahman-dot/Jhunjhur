/* =========================================================
   JHUNJHUR — Admin Panel JavaScript
   Location: admin/js/admin.js
========================================================= */

// =========================================================
// SIDEBAR TOGGLE (Mobile)
// =========================================================

const sidebarToggle = document.getElementById('sidebarToggle');
const adminSidebar = document.getElementById('adminSidebar');

// Create overlay for mobile
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

function toggleSidebar() {
    adminSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = adminSidebar.classList.contains('open') ? 'hidden' : '';
}

sidebarToggle?.addEventListener('click', toggleSidebar);
overlay?.addEventListener('click', toggleSidebar);

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && adminSidebar?.classList.contains('open')) {
        toggleSidebar();
    }
});

// =========================================================
// TOAST NOTIFICATION (for admin)
// =========================================================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 14px 24px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        font-family: "Montserrat", sans-serif;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 50);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 400);
    }, 3000);
}

// =========================================================
// CHART.JS — Revenue Chart (Dashboard)
// =========================================================

const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx && typeof Chart !== 'undefined') {
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue (৳)',
                data: [32000, 45000, 38000, 56000, 49000, 67890],
                borderColor: '#a87525',
                backgroundColor: 'rgba(168, 117, 37, 0.08)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#a87525',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '৳' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '৳' + value.toLocaleString();
                        },
                        font: { size: 10 }
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            }
        }
    });
}

// =========================================================
// LOGOUT
// =========================================================

document.getElementById('adminLogout')?.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('jhunjhurAdmin');
        window.location.href = 'login.html';
    }
});

// =========================================================
// NOTIFICATION CLICK
// =========================================================

document.querySelector('.header-btn .fa-regular.fa-bell')?.addEventListener('click', function() {
    const dot = this.parentElement.querySelector('.notif-dot');
    if (dot) dot.style.display = 'none';
    showToast('📬 No new notifications', 'info');
});

document.querySelector('.header-btn .fa-regular.fa-envelope')?.addEventListener('click', function() {
    showToast('📧 No new messages', 'info');
});

// =========================================================
// STATS ANIMATION ON LOAD
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        const currency = text.includes('৳') ? '৳' : '';
        
        if (!isNaN(number) && number > 0) {
            let current = 0;
            const increment = number / 40;
            const duration = 600;
            const stepTime = duration / 40;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                const displayNum = Math.floor(current);
                stat.textContent = currency + displayNum.toLocaleString();
            }, stepTime);
        }
    });
});

// =========================================================
// TABLE ROW CLICK (Orders/Customers)
// =========================================================

document.querySelectorAll('.admin-table tbody tr')?.forEach(row => {
    row.addEventListener('click', function() {
        const firstCell = this.querySelector('td');
        if (firstCell) {
            console.log('Row clicked:', firstCell.textContent);
        }
    });
});

// =========================================================
// KEYBOARD SHORTCUTS (Admin)
// =========================================================

document.addEventListener('keydown', (e) => {
    // Alt + D → Dashboard
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        window.location.href = 'dashboard.html';
    }
    // Alt + P → Products
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        window.location.href = 'products.html';
    }
    // Alt + O → Orders
    if (e.altKey && e.key === 'o') {
        e.preventDefault();
        window.location.href = 'orders.html';
    }
    // Alt + S → Settings
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        window.location.href = 'settings.html';
    }
});

// =========================================================
// PRODUCTS PAGE — Load & Render
// =========================================================

function getProducts() {
    const stored = localStorage.getItem('jhunjhurProducts');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch(e) {
            return [];
        }
    }
    return [];
}

function saveProducts(products) {
    localStorage.setItem('jhunjhurProducts', JSON.stringify(products));
}

function renderProductTable() {
    const tbody = document.querySelector('#productsTable tbody');
    if (!tbody) return;
    
    const products = getProducts();
    tbody.innerHTML = '';
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:40px; color:#999;">
                    <i class="fa-solid fa-box" style="font-size:2rem; display:block; margin-bottom:10px;"></i>
                    No products found. Add your first product!
                </td>
            </tr>
        `;
        return;
    }
    
    products.forEach(product => {
        const stockStatus = product.stock > 10 ? 'in-stock' : (product.stock > 0 ? 'low-stock' : 'out-stock');
        const stockLabel = product.stock > 10 ? 'In Stock' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${product.image || 'assets/placeholder.jpg'}" 
                     alt="${product.name}" 
                     style="width:50px;height:50px;object-fit:cover;border-radius:6px;background:#eee2d0;"
                     onerror="this.src='assets/placeholder.jpg'">
            </td>
            <td><strong>${product.name}</strong></td>
            <td><span style="text-transform:uppercase; font-size:0.6rem; color:var(--admin-gold, #a87525);">${product.category}</span></td>
            <td>৳${(product.price || 0).toLocaleString()}</td>
            <td><span class="stock-badge ${stockStatus}">${stockLabel} (${product.stock || 0})</span></td>
            <td>
                <button class="btn-edit" data-id="${product.id}" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn-danger" data-id="${product.id}" onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    renderProductTable();
    showToast('✅ Product deleted successfully!', 'success');
    
    // Update badge
    document.getElementById('productBadge').textContent = products.length;
}

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
        showToast('Product not found!', 'error');
        return;
    }
    
    // Simple edit prompt
    const newName = prompt('Product Name:', product.name);
    if (newName !== null && newName.trim()) {
        product.name = newName.trim();
    }
    
    const newPrice = prompt('Product Price (৳):', product.price);
    if (newPrice !== null && !isNaN(newPrice) && Number(newPrice) > 0) {
        product.price = Number(newPrice);
    }
    
    const newStock = prompt('Stock Quantity:', product.stock || 0);
    if (newStock !== null && !isNaN(newStock) && Number(newStock) >= 0) {
        product.stock = Number(newStock);
    }
    
    saveProducts(products);
    renderProductTable();
    showToast('✅ Product updated successfully!', 'success');
}

// =========================================================
// PRODUCTS PAGE — Filter & Search
// =========================================================

function filterProductsTable() {
    const search = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const stock = document.getElementById('stockFilter')?.value || 'all';
    
    let products = getProducts();
    const tbody = document.querySelector('#productsTable tbody');
    if (!tbody) return;
    
    if (search) {
        products = products.filter(p => p.name.toLowerCase().includes(search));
    }
    
    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }
    
    if (stock === 'in-stock') {
        products = products.filter(p => (p.stock || 0) > 10);
    } else if (stock === 'low-stock') {
        products = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 10);
    } else if (stock === 'out-stock') {
        products = products.filter(p => (p.stock || 0) <= 0);
    }
    
    // Re-render with filtered data
    tbody.innerHTML = '';
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:40px; color:#999;">
                    <i class="fa-solid fa-search" style="font-size:2rem; display:block; margin-bottom:10px;"></i>
                    No products match your filters.
                </td>
            </tr>
        `;
        return;
    }
    
    products.forEach(product => {
        const stockStatus = (product.stock || 0) > 10 ? 'in-stock' : ((product.stock || 0) > 0 ? 'low-stock' : 'out-stock');
        const stockLabel = (product.stock || 0) > 10 ? 'In Stock' : ((product.stock || 0) > 0 ? 'Low Stock' : 'Out of Stock');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${product.image || 'assets/placeholder.jpg'}" 
                     alt="${product.name}" 
                     style="width:50px;height:50px;object-fit:cover;border-radius:6px;background:#eee2d0;"
                     onerror="this.src='assets/placeholder.jpg'">
            </td>
            <td><strong>${product.name}</strong></td>
            <td><span style="text-transform:uppercase; font-size:0.6rem; color:var(--admin-gold, #a87525);">${product.category}</span></td>
            <td>৳${(product.price || 0).toLocaleString()}</td>
            <td><span class="stock-badge ${stockStatus}">${stockLabel} (${product.stock || 0})</span></td>
            <td>
                <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// =========================================================
// PRODUCTS PAGE — Add Product
// =========================================================

function addNewProduct() {
    const name = prompt('Product Name:');
    if (!name || !name.trim()) return;
    
    const category = prompt('Category (bangles/earrings/pendants/rings/others/hair):', 'bangles');
    if (!category || !category.trim()) return;
    
    const price = prompt('Price (৳):', '100');
    if (!price || isNaN(price) || Number(price) <= 0) return;
    
    const stock = prompt('Stock Quantity:', '10');
    if (!stock || isNaN(stock) || Number(stock) < 0) return;
    
    const image = prompt('Image URL (assets/your-image.jpg):', 'assets/placeholder.jpg');
    if (!image || !image.trim()) return;
    
    const description = prompt('Description:', 'Beautiful desi jewellery.');
    
    const products = getProducts();
    const newId = category + '-' + (products.filter(p => p.category === category).length + 1);
    
    const newProduct = {
        id: newId,
        category: category.trim().toLowerCase(),
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
        image: image.trim(),
        description: description || 'Beautiful desi jewellery.'
    };
    
    products.push(newProduct);
    saveProducts(products);
    renderProductTable();
    filterProductsTable();
    document.getElementById('productBadge').textContent = products.length;
    showToast('✅ Product added successfully!', 'success');
}

// =========================================================
// ORDERS PAGE — Load & Render
// =========================================================

function getOrders() {
    const stored = localStorage.getItem('jhunjhurOrders');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch(e) {
            return [];
        }
    }
    return [];
}

function saveOrders(orders) {
    localStorage.setItem('jhunjhurOrders', JSON.stringify(orders));
}

function renderOrders(orders) {
    const tbody = document.getElementById('ordersBody');
    const empty = document.getElementById('emptyOrders');
    const count = document.getElementById('orderCount');
    
    if (!tbody) return;
    
    if (!orders || orders.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        if (count) count.textContent = '0 orders';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    if (count) count.textContent = `${orders.length} orders`;
    
    tbody.innerHTML = '';
    
    orders.forEach((order) => {
        const statusClass = order.status || 'pending';
        const date = new Date(order.date);
        const dateStr = date.toLocaleDateString('en-BD', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        });
        const timeStr = date.toLocaleTimeString('en-BD', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <button class="expand-btn" data-order="${order.id}" onclick="toggleOrderDetail('${order.id}')">
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
            </td>
            <td><span class="order-id-link" onclick="toggleOrderDetail('${order.id}')">#${order.id}</span></td>
            <td><strong>${order.customer}</strong><br><small style="color:var(--admin-text-light, #999);">${order.phone}</small></td>
            <td>${order.items?.length || 0} items</td>
            <td>৳${(order.total || 0).toLocaleString()}</td>
            <td>
                <select class="status ${statusClass}" data-order="${order.id}" onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="pending" ${statusClass === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${statusClass === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="delivered" ${statusClass === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${statusClass === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>${dateStr}<br><small style="color:var(--admin-text-light, #999);">${timeStr}</small></td>
            <td>
                <button class="btn-sm btn-danger-sm" onclick="deleteOrder('${order.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
        
        // Detail row (hidden initially)
        const detailRow = document.createElement('tr');
        detailRow.className = 'order-detail-row';
        detailRow.id = `detail-${order.id}`;
        
        let itemsHtml = '';
        if (order.items && order.items.length > 0) {
            itemsHtml = order.items.map(item => `
                <div class="order-item" style="display:flex; align-items:center; gap:12px; padding:8px 12px; background:white; border-radius:6px; border:1px solid #eee;">
                    <div style="flex:1;">
                        <strong style="font-size:0.8rem;">${item.name}</strong>
                        <small style="display:block; font-size:0.6rem; color:#999;">× ${item.quantity}</small>
                    </div>
                    <span style="font-size:0.75rem; font-weight:600; color:#a87525;">৳${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `).join('');
        }
        
        detailRow.innerHTML = `
            <td colspan="8">
                <div style="padding:20px 25px; background:rgba(247,238,225,0.4);">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:15px;">
                        <div>
                            <strong style="font-size:0.7rem; color:#999;">DELIVERY ADDRESS</strong>
                            <p style="font-size:0.85rem; margin-top:4px;">${order.address || 'N/A'}</p>
                        </div>
                        <div>
                            <strong style="font-size:0.7rem; color:#999;">CONTACT</strong>
                            <p style="font-size:0.85rem; margin-top:4px;">${order.phone || 'N/A'}</p>
                        </div>
                    </div>
                    <strong style="font-size:0.7rem; color:#999;">ORDER ITEMS</strong>
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px,1fr)); gap:10px; margin-top:8px;">
                        ${itemsHtml || '<p style="color:#999; font-size:0.8rem;">No items found</p>'}
                    </div>
                    <div style="margin-top:15px; padding-top:15px; border-top:1px solid rgba(168,117,37,0.15); display:flex; justify-content:space-between; font-weight:600; color:#173c35;">
                        <span>Total</span>
                        <span>৳${(order.total || 0).toLocaleString()}</span>
                    </div>
                </div>
            </td>
        `;
        tbody.appendChild(detailRow);
    });
}

function toggleOrderDetail(orderId) {
    const detailRow = document.getElementById(`detail-${orderId}`);
    const btn = document.querySelector(`.expand-btn[data-order="${orderId}"]`);
    if (detailRow) {
        detailRow.classList.toggle('open');
        if (btn) btn.classList.toggle('rotated');
    }
}

function updateOrderStatus(orderId, newStatus) {
    let orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveOrders(orders);
        showToast(`✅ Order ${orderId} status updated to ${newStatus}`, 'success');
        // Update badge
        updateBadges();
    }
}

function deleteOrder(orderId) {
    if (!confirm(`Are you sure you want to delete order ${orderId}?`)) return;
    
    let orders = getOrders();
    orders = orders.filter(o => o.id !== orderId);
    saveOrders(orders);
    filterOrders();
    updateBadges();
    showToast('🗑️ Order deleted!', 'error');
}

function filterOrders() {
    const search = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    const status = document.getElementById('statusFilter')?.value || 'all';
    const dateRange = document.getElementById('dateFilter')?.value || 'all';
    
    let orders = getOrders();
    
    if (search) {
        orders = orders.filter(o => 
            o.id.toLowerCase().includes(search) || 
            o.customer.toLowerCase().includes(search) ||
            o.phone.includes(search)
        );
    }
    
    if (status !== 'all') {
        orders = orders.filter(o => o.status === status);
    }
    
    if (dateRange !== 'all') {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        orders = orders.filter(o => {
            const orderDate = new Date(o.date);
            if (dateRange === 'today') {
                return orderDate >= today;
            } else if (dateRange === 'week') {
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                return orderDate >= weekAgo;
            } else if (dateRange === 'month') {
                const monthAgo = new Date(today);
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return orderDate >= monthAgo;
            }
            return true;
        });
    }
    
    renderOrders(orders);
}

// =========================================================
// CUSTOMERS PAGE — Load & Render
// =========================================================

function getCustomers() {
    const orders = getOrders();
    const customerMap = new Map();
    
    orders.forEach(order => {
        if (!customerMap.has(order.phone)) {
            customerMap.set(order.phone, {
                name: order.customer,
                phone: order.phone,
                orders: [],
                totalSpent: 0,
                lastOrder: order.date
            });
        }
        const customer = customerMap.get(order.phone);
        customer.orders.push(order.id);
        customer.totalSpent += order.total || 0;
        if (new Date(order.date) > new Date(customer.lastOrder)) {
            customer.lastOrder = order.date;
        }
    });
    
    return Array.from(customerMap.values());
}

function renderCustomers(customers) {
    const tbody = document.getElementById('customersBody');
    const empty = document.getElementById('emptyCustomers');
    const count = document.getElementById('customerCount');
    
    if (!tbody) return;
    
    if (!customers || customers.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        if (count) count.textContent = '0 customers';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    if (count) count.textContent = `${customers.length} customers`;
    
    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const initials = customer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const lastOrder = new Date(customer.lastOrder);
        const dateStr = lastOrder.toLocaleDateString('en-BD', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        });
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:40px; height:40px; border-radius:50%; background:#a87525; color:white; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:0.8rem;">${initials}</div>
                    <div>
                        <div style="font-weight:600;">${customer.name}</div>
                    </div>
                </div>
            </td>
            <td>${customer.phone}</td>
            <td>${customer.orders.length}</td>
            <td>৳${customer.totalSpent.toLocaleString()}</td>
            <td style="font-size:0.7rem;">${dateStr}</td>
            <td>
                <button class="btn-sm btn-primary" onclick="viewCustomerOrders('${customer.phone}')" style="font-size:0.55rem; padding:4px 10px; background:#173c35; color:white; border-radius:4px;">
                    <i class="fa-solid fa-eye"></i> Orders
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterCustomers() {
    const search = document.getElementById('customerSearch')?.value.toLowerCase() || '';
    let customers = getCustomers();
    
    if (search) {
        customers = customers.filter(c => 
            c.name.toLowerCase().includes(search) || 
            c.phone.includes(search)
        );
    }
    
    renderCustomers(customers);
}

function viewCustomerOrders(phone) {
    const orders = getOrders();
    const customerOrders = orders.filter(o => o.phone === phone);
    
    if (customerOrders.length === 0) {
        showToast('No orders found for this customer.', 'error');
        return;
    }
    
    let msg = '📦 Orders for this customer:\n\n';
    customerOrders.forEach(o => {
        msg += `#${o.id} — ${o.items?.length || 0} items — ৳${(o.total || 0).toLocaleString()} — ${o.status}\n`;
    });
    msg += `\nTotal: ${customerOrders.length} orders`;
    alert(msg);
}

// =========================================================
// BADGE UPDATES
// =========================================================

function updateBadges() {
    const products = getProducts();
    document.getElementById('productBadge').textContent = products.length;
    
    const orders = getOrders();
    document.getElementById('orderBadge').textContent = orders.length;
    
    const customers = getCustomers();
    document.getElementById('customerBadge').textContent = customers.length;
    
    const wishlist = JSON.parse(localStorage.getItem('jhunjhurWishlist')) || [];
    document.getElementById('wishlistBadge').textContent = wishlist.length;
}

// =========================================================
// SETTINGS PAGE — Load & Save
// =========================================================

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('jhunjhurSettings')) || {};
    
    if (settings.storeName) document.getElementById('storeName').value = settings.storeName;
    if (settings.storeTagline) document.getElementById('storeTagline').value = settings.storeTagline;
    if (settings.storeEmail) document.getElementById('storeEmail').value = settings.storeEmail;
    if (settings.storePhone) document.getElementById('storePhone').value = settings.storePhone;
    if (settings.storeAddress) document.getElementById('storeAddress').value = settings.storeAddress;
    if (settings.storeCurrency) document.getElementById('storeCurrency').value = settings.storeCurrency;
    if (settings.shippingFee) document.getElementById('shippingFee').value = settings.shippingFee;
    if (settings.freeShipping) document.getElementById('freeShipping').value = settings.freeShipping;
    if (settings.deliveryTime) document.getElementById('deliveryTime').value = settings.deliveryTime;
    
    // Payment methods
    if (settings.paymentMethods) {
        document.querySelectorAll('.payment-checkbox input').forEach(cb => {
            cb.checked = settings.paymentMethods.includes(cb.value);
        });
    }
    
    // Store status
    if (settings.storeStatus !== undefined) {
        document.getElementById('storeStatus').checked = settings.storeStatus;
        updateStatusUI(settings.storeStatus);
    }
    if (settings.maintenanceMsg) {
        document.getElementById('maintenanceMsg').value = settings.maintenanceMsg;
    }
    
    // Notifications
    if (settings.notifications) {
        document.getElementById('notifEmail').checked = settings.notifications.email !== false;
        document.getElementById('notifSMS').checked = settings.notifications.sms !== false;
        document.getElementById('notifOrder').checked = settings.notifications.order !== false;
        document.getElementById('notifLowStock').checked = settings.notifications.lowStock === true;
    }
}

function updateStatusUI(isOpen) {
    const label = document.getElementById('statusLabel');
    const badge = document.getElementById('statusBadge');
    const subtext = document.getElementById('statusSubtext');
    
    if (isOpen) {
        if (label) label.textContent = 'Open';
        if (badge) { badge.textContent = '🟢 Open'; badge.style.background = '#27ae60'; }
        if (subtext) subtext.textContent = 'Customers can place orders';
    } else {
        if (label) label.textContent = 'Closed';
        if (badge) { badge.textContent = '🔴 Closed'; badge.style.background = '#e74c3c'; }
        if (subtext) subtext.textContent = 'Store is temporarily closed';
    }
}

// General Settings Save
document.getElementById('generalSettings')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const settings = JSON.parse(localStorage.getItem('jhunjhurSettings')) || {};
    
    settings.storeName = document.getElementById('storeName').value.trim();
    settings.storeTagline = document.getElementById('storeTagline').value.trim();
    settings.storeEmail = document.getElementById('storeEmail').value.trim();
    settings.storePhone = document.getElementById('storePhone').value.trim();
    settings.storeAddress = document.getElementById('storeAddress').value.trim();
    settings.storeCurrency = document.getElementById('storeCurrency').value;
    
    localStorage.setItem('jhunjhurSettings', JSON.stringify(settings));
    showToast('✅ General settings saved!', 'success');
});

// Shipping Settings Save
document.getElementById('shippingSettings')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const settings = JSON.parse(localStorage.getItem('jhunjhurSettings')) || {};
    
    settings.shippingFee = parseFloat(document.getElementById('shippingFee').value) || 0;
    settings.freeShipping = parseFloat(document.getElementById('freeShipping').value) || 0;
    settings.deliveryTime = parseInt(document.getElementById('deliveryTime').value) || 3;
    
    const paymentMethods = [];
    document.querySelectorAll('.payment-checkbox input:checked').forEach(cb => {
        paymentMethods.push(cb.value);
    });
    settings.paymentMethods = paymentMethods;
    
    localStorage.setItem('jhunjhurSettings', JSON.stringify(settings));
    showToast('✅ Shipping & Payment settings saved!', 'success');
});

// Store Status Save
function saveStoreStatus() {
    const settings = JSON.parse(localStorage.getItem('jhunjhurSettings')) || {};
    settings.storeStatus = document.getElementById('storeStatus').checked;
    settings.maintenanceMsg = document.getElementById('maintenanceMsg').value.trim();
    
    localStorage.setItem('jhunjhurSettings', JSON.stringify(settings));
    updateStatusUI(settings.storeStatus);
    showToast('✅ Store status updated!', 'success');
}

document.getElementById('storeStatus')?.addEventListener('change', function() {
    updateStatusUI(this.checked);
});

// Notification Settings Save
function saveNotificationSettings() {
    const settings = JSON.parse(localStorage.getItem('jhunjhurSettings')) || {};
    
    settings.notifications = {
        email: document.getElementById('notifEmail').checked,
        sms: document.getElementById('notifSMS').checked,
        order: document.getElementById('notifOrder').checked,
        lowStock: document.getElementById('notifLowStock').checked
    };
    
    localStorage.setItem('jhunjhurSettings', JSON.stringify(settings));
    showToast('✅ Notification preferences saved!', 'success');
}

// =========================================================
// SETTINGS — Danger Zone
// =========================================================

function clearAllData() {
    if (!confirm('⚠️ Are you sure you want to delete ALL data?')) return;
    if (!confirm('⚠️ REALLY? This includes orders, customers, cart, and wishlist!')) return;
    if (!confirm('⚠️ LAST CHANCE! This cannot be undone!')) return;
    
    localStorage.removeItem('jhunjhurOrders');
    localStorage.removeItem('jhunjhurCart');
    localStorage.removeItem('jhunjhurWishlist');
    localStorage.removeItem('jhunjhurProducts');
    
    showToast('🗑️ All data has been cleared!', 'error');
    setTimeout(() => location.reload(), 1000);
}

function exportData() {
    const data = {
        orders: JSON.parse(localStorage.getItem('jhunjhurOrders')) || [],
        cart: JSON.parse(localStorage.getItem('jhunjhurCart')) || [],
        wishlist: JSON.parse(localStorage.getItem('jhunjhurWishlist')) || [],
        products: JSON.parse(localStorage.getItem('jhunjhurProducts')) || [],
        settings: JSON.parse(localStorage.getItem('jhunjhurSettings')) || {},
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jhunjhur-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('📥 Data exported successfully!', 'success');
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.orders) localStorage.setItem('jhunjhurOrders', JSON.stringify(data.orders));
            if (data.cart) localStorage.setItem('jhunjhurCart', JSON.stringify(data.cart));
            if (data.wishlist) localStorage.setItem('jhunjhurWishlist', JSON.stringify(data.wishlist));
            if (data.products) localStorage.setItem('jhunjhurProducts', JSON.stringify(data.products));
            if (data.settings) localStorage.setItem('jhunjhurSettings', JSON.stringify(data.settings));
            
            showToast('✅ Data imported successfully!', 'success');
            setTimeout(() => location.reload(), 1000);
        } catch(err) {
            showToast('❌ Invalid JSON file format!', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function resetSettings() {
    if (!confirm('Reset all settings to default?')) return;
    localStorage.removeItem('jhunjhurSettings');
    showToast('🔄 Settings reset to default', 'info');
    setTimeout(() => location.reload(), 500);
}

function viewAllData() {
    const data = {
        orders: JSON.parse(localStorage.getItem('jhunjhurOrders')) || [],
        cart: JSON.parse(localStorage.getItem('jhunjhurCart')) || [],
        wishlist: JSON.parse(localStorage.getItem('jhunjhurWishlist')) || [],
        products: JSON.parse(localStorage.getItem('jhunjhurProducts')) || [],
        settings: JSON.parse(localStorage.getItem('jhunjhurSettings')) || {}
    };
    
    console.log('📊 All Data:', data);
    alert('📊 Data logged to console. Press F12 to view.');
    showToast('📊 Data logged to console', 'info');
}

// =========================================================
// PROFILE PICTURE UPLOAD
// =========================================================

document.getElementById('avatarUpload')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.getElementById('adminAvatar');
            if (img) img.src = event.target.result;
            localStorage.setItem('adminAvatar', event.target.result);
            showToast('✅ Profile picture updated!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// Load saved avatar
document.addEventListener('DOMContentLoaded', function() {
    const savedAvatar = localStorage.getItem('adminAvatar');
    if (savedAvatar) {
        const img = document.getElementById('adminAvatar');
        if (img) img.src = savedAvatar;
    }
});

// =========================================================
// STORE LOGO UPLOAD
// =========================================================

document.getElementById('storeLogoUpload')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.getElementById('storeLogoPreview');
            if (img) img.src = event.target.result;
            localStorage.setItem('storeLogo', event.target.result);
            showToast('✅ Logo updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// Load saved logo
document.addEventListener('DOMContentLoaded', function() {
    const savedLogo = localStorage.getItem('storeLogo');
    if (savedLogo) {
        const img = document.getElementById('storeLogoPreview');
        if (img) img.src = savedLogo;
    }
});

// =========================================================
// INITIALIZE ADMIN
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    // Load settings
    loadSettings();
    
    // Update badges
    updateBadges();
    
    // Products page
    renderProductTable();
    
    // Orders page
    const orders = getOrders();
    renderOrders(orders);
    
    // Customers page
    const customers = getCustomers();
    renderCustomers(customers);
    
    // Event listeners for filters
    document.getElementById('productSearch')?.addEventListener('input', filterProductsTable);
    document.getElementById('categoryFilter')?.addEventListener('change', filterProductsTable);
    document.getElementById('stockFilter')?.addEventListener('change', filterProductsTable);
    
    document.getElementById('orderSearch')?.addEventListener('input', filterOrders);
    document.getElementById('statusFilter')?.addEventListener('change', filterOrders);
    document.getElementById('dateFilter')?.addEventListener('change', filterOrders);
    
    document.getElementById('customerSearch')?.addEventListener('input', filterCustomers);
    
    // Refresh button for orders
    document.getElementById('refreshOrders')?.addEventListener('click', function() {
        filterOrders();
        updateBadges();
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Refreshing...';
        setTimeout(() => {
            this.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh';
        }, 800);
    });
    
    console.log('🪄 Jhunjhur Admin Panel Loaded');
    console.log('✨ Shortcuts: Alt+D (Dashboard), Alt+P (Products), Alt+O (Orders), Alt+S (Settings)');
});

// =========================================================
// EXPOSE FUNCTIONS GLOBALLY
// =========================================================

window.deleteProduct = deleteProduct;
window.editProduct = editProduct;
window.addNewProduct = addNewProduct;
window.filterProductsTable = filterProductsTable;
window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;
window.filterOrders = filterOrders;
window.toggleOrderDetail = toggleOrderDetail;
window.viewCustomerOrders = viewCustomerOrders;
window.filterCustomers = filterCustomers;
window.saveStoreStatus = saveStoreStatus;
window.saveNotificationSettings = saveNotificationSettings;
window.clearAllData = clearAllData;
window.exportData = exportData;
window.handleImport = handleImport;
window.resetSettings = resetSettings;
window.viewAllData = viewAllData;
window.showToast = showToast;