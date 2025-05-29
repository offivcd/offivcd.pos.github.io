const items = [
  { name: "Burger", price: 5 },
  { name: "Fries", price: 2 },
  { name: "Hot Dog", price: 3 },
  { name: "Pizza Slice", price: 4 },
  { name: "Chicken Wrap", price: 5 },
  { name: "Taco", price: 2.5 },
  { name: "Coke", price: 1.5 },
  { name: "Sprite", price: 1.5 },
  { name: "Water", price: 1 },
  { name: "Coffee", price: 2 },
  { name: "Milkshake", price: 3 },
  { name: "Iced Tea", price: 1.8 },
  { name: "Nuggets", price: 4 },
  { name: "Salad", price: 3.5 },
  { name: "Fish Sandwich", price: 5 }
];

let cart = [];

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  items.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "item";
    btn.textContent = `${item.name} ($${item.price.toFixed(2)})`;
    btn.onclick = () => addToCart(item);
    grid.appendChild(btn);
  });
}

function addToCart(item) {
  cart.push(item);
  updateOrderList();
}

function updateOrderList() {
  const list = document.getElementById("orderList");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    const div = document.createElement("div");
    div.textContent = `${i.name} - $${i.price.toFixed(2)}`;
    list.appendChild(div);
    total += i.price;
  });
  document.getElementById("total").textContent = total.toFixed(2);
}

function pay(method) {
  alert(`Paid by ${method.toUpperCase()}.`);
}

function completeOrder() {
  if (cart.length === 0) return alert("Cart is empty!");
  alert("Order Complete! Thank you.");
  cart = [];
  updateOrderList();
}

document.addEventListener("DOMContentLoaded", renderMenu);
