/* =========================================================
   ADMIN PANEL — Jhunjhur
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

sidebarToggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && adminSidebar.classList.contains('open')) {
        toggleSidebar();
    }
});

// =========================================================
// CHART.JS — Revenue Chart
// =========================================================

const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) {
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
                legend: {
                    display: false,
                },
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
                        font: {
                            size: 10,
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 10,
                        }
                    }
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

document.getElementById('adminLogout')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        // Redirect to login page (or main site)
        window.location.href = '../index.html';
    }
});

// =========================================================
// NOTIFICATION CLICK
// =========================================================

document.querySelector('.header-btn .fa-regular.fa-bell')?.addEventListener('click', function() {
    const dot = this.parentElement.querySelector('.notif-dot');
    if (dot) {
        dot.style.display = 'none';
    }
    alert('📬 No new notifications');
});

// =========================================================
// MESSAGE CLICK
// =========================================================

document.querySelector('.header-btn .fa-regular.fa-envelope')?.addEventListener('click', function() {
    alert('📧 No new messages');
});

// =========================================================
// STATS ANIMATION ON LOAD
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Animate stat numbers
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
// TABLE ROW CLICK
// =========================================================

document.querySelectorAll('.admin-table tbody tr').forEach(row => {
    row.addEventListener('click', function() {
        // You can add order detail view here
        console.log('Row clicked:', this.querySelector('td')?.textContent);
    });
});

// =========================================================
// KEYBOARD SHORTCUTS
// =========================================================

document.addEventListener('keydown', (e) => {
    // Alt + D → Dashboard
    if (e.altKey && e.key === 'd') {
        window.location.href = 'dashboard.html';
    }
    // Alt + P → Products
    if (e.altKey && e.key === 'p') {
        window.location.href = 'products.html';
    }
    // Alt + O → Orders
    if (e.altKey && e.key === 'o') {
        window.location.href = 'orders.html';
    }
});

console.log('🪄 Jhunjhur Admin Panel');
console.log('✨ Shortcuts: Alt+D (Dashboard), Alt+P (Products), Alt+O (Orders)');
