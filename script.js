const products = [
    { name: "Apple", price: 1.00 },
    { name: "Banana", price: 0.75 },
    { name: "Orange", price: 0.85 },
    { name: "Water", price: 1.25 },
    { name: "Juice", price: 2.00 },
    { name: "Sandwich", price: 3.50 },
    { name: "Coffee", price: 1.80 },
    { name: "Tea", price: 1.50 }
];

let cart = [];

function getCustomers() {
    return JSON.parse(localStorage.getItem('customers') || '["Walk-in"]');
}

function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function populateCustomerSelect() {
    const customers = getCustomers();
    const select = document.getElementById('customerSelect');
    select.innerHTML = '';
    customers.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        select.appendChild(opt);
    });
}

function addToCart(product) {
    cart.push(product);
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        container.appendChild(div);
        total += item.price;
    });
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

function completeSale() {
    const customer = document.getElementById('customerSelect').value;
    const orders = getOrders();
    if (cart.length === 0) return alert("Cart is empty!");
    orders.push({
        customer,
        cart,
        time: new Date().toLocaleString(),
        total: cart.reduce((sum, i) => sum + i.price, 0)
    });
    saveOrders(orders);
    cart = [];
    renderCart();
    alert("Sale completed!");
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    products.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'product';
        btn.textContent = `${p.name} ($${p.price.toFixed(2)})`;
        btn.onclick = () => addToCart(p);
        grid.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    populateCustomerSelect();
});
