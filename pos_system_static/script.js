function getCustomers() {
    return JSON.parse(localStorage.getItem('customers') || '[]');
}

function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

function saveCustomers(customers) {
    localStorage.setItem('customers', JSON.stringify(customers));
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function addCustomer() {
    const name = document.getElementById('customerName').value.trim();
    if (!name) return alert('Enter a name');
    const customers = getCustomers();
    customers.push(name);
    saveCustomers(customers);
    populateCustomers();
    document.getElementById('customerName').value = '';
}

function populateCustomers() {
    const customers = getCustomers();
    const select = document.getElementById('customerSelect');
    select.innerHTML = '';
    customers.forEach(name => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = name;
        select.appendChild(opt);
    });
}

function addOrder() {
    const customer = document.getElementById('customerSelect').value;
    const item = document.getElementById('orderItem').value.trim();
    const qty = parseInt(document.getElementById('orderQty').value);
    if (!customer || !item || !qty) return alert('Fill all fields');
    const orders = getOrders();
    orders.push({ customer, item, qty, time: new Date().toLocaleString() });
    saveOrders(orders);
    renderOrders();
    document.getElementById('orderItem').value = '';
    document.getElementById('orderQty').value = '';
}

function renderOrders() {
    const orders = getOrders();
    const container = document.getElementById('orderHistory');
    container.innerHTML = '';
    orders.forEach(o => {
        const div = document.createElement('div');
        div.textContent = `${o.time}: ${o.customer} ordered ${o.qty} x ${o.item}`;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateCustomers();
    renderOrders();
});