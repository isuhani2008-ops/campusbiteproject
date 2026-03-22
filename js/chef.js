// ===============================
// LOGIN
// ===============================
function chefLogin() {
    const username = document.getElementById("chefUser").value.trim();
    const password = document.getElementById("chefPass").value.trim();

    if (username === "chef" && password === "1234") {
        sessionStorage.setItem("chefLoggedIn", "true");
        alert("Login Successful 👨‍🍳");
        window.location.href = "chef_dashboard.html";
    } else {
        alert("Invalid Username or Password ❌");
    }
}

// ===============================
// PAGE NAVIGATION (IMPORTANT)
// ===============================
function show(id){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id)?.classList.add("active");
}

// ===============================
// ORDER SYSTEM
// ===============================
let orderId = 100;
let totalOrders = 0;

// 🔥 GENERATE LIVE ORDERS
function generateOrder(){

    const pending = document.getElementById("pending");
    if(!pending) return;

    const itemsList = [
        "🍔 Burger x2",
        "🍕 Pizza x1",
        "🍝 Pasta x1",
        "🍟 Fries x3"
    ];

    const randomItem = itemsList[Math.floor(Math.random()*itemsList.length)];

    const isPriority = Math.random() > 0.7;
    const isUrgent = Math.random() > 0.85;

    const card = document.createElement("div");
    card.classList.add("card");

    if(isPriority) card.classList.add("priority");
    if(isUrgent) card.classList.add("urgent");

    let tags = "";
    if(isPriority) tags += `<span class="tag priority-tag">PRIORITY</span>`;
    if(isUrgent) tags += `<span class="tag urgent-tag">URGENT</span>`;

    card.innerHTML = `
        <h4>#${orderId}</h4>
        ${tags}
        <p class="items">${randomItem}</p>

        <p>⏱️ <span class="timer">0s</span></p>
        <p>⏳ Est: <span class="estTime">--</span></p>

        <button onclick="moveOrder(this,'prep')">Start</button>
    `;

    pending.prepend(card);

    notify("New Order #" + orderId);

    totalOrders++;
    updateAnalytics();

    orderId++;
}

// ===============================
// MOVE ORDER
// ===============================
function moveOrder(btn, status){

    const card = btn.parentElement;

    if(status === "prep"){
        document.getElementById("prep")?.appendChild(card);

        btn.innerText = "Ready";
        btn.onclick = () => moveOrder(btn,"ready");

        startTimer(card);
    }

    else if(status === "ready"){
        document.getElementById("ready")?.appendChild(card);

        btn.innerText = "Deliver";
        btn.onclick = () => moveOrder(btn,"done");
    }

    else if(status === "done"){
        document.getElementById("done")?.appendChild(card);

        addToHistory(card);
        btn.remove();
    }
}

// ===============================
// TIMER SYSTEM
// ===============================
function startTimer(card){

    let time = 0;
    const estimate = Math.floor(Math.random() * 300) + 180;

    const timerEl = card.querySelector(".timer");
    const estEl = card.querySelector(".estTime");

    if(!timerEl || !estEl) return;

    estEl.innerText = Math.floor(estimate/60) + " min";

    const interval = setInterval(() => {

        time++;
        timerEl.innerText = time + "s";

        if(time > estimate){
            card.classList.add("delay");
        }

        if(card.parentElement?.id === "done"){
            clearInterval(interval);
        }

    },1000);
}

// ===============================
// NOTIFICATIONS
// ===============================
function notify(msg){
    const n = document.getElementById("notify");
    if(n) n.innerHTML += `<li>${msg}</li>`;
}

// ===============================
// MENU SYSTEM (FIXED)
// ===============================
function addDish(){

    const dish = document.getElementById("dish").value.trim();
    const price = document.getElementById("price").value.trim();

    if(!dish || !price){
        alert("Enter dish & price");
        return;
    }

    const list = document.getElementById("menuList");

    const item = document.createElement("div");
    item.innerHTML = `
        ${dish} - ₹${price}
        <button onclick="this.parentElement.remove()">Delete</button>
    `;

    list.appendChild(item);

    document.getElementById("dish").value = "";
    document.getElementById("price").value = "";
}

// ===============================
// HISTORY SYSTEM
// ===============================
function addToHistory(card){
    const historyList = document.getElementById("historyList");

    if(historyList){
        const li = document.createElement("li");
        li.innerText = card.innerText;
        historyList.appendChild(li);
    }
}

// ===============================
// ANALYTICS
// ===============================
function updateAnalytics(){
    const el = document.getElementById("totalOrders");
    if(el) el.innerText = totalOrders;
}

// ===============================
// AUTO START (IMPORTANT FIX)
// ===============================
window.addEventListener("DOMContentLoaded", () => {

    console.log("Dashboard Loaded ✅");

    if(document.getElementById("pending")){
        setInterval(generateOrder, 5000);
    }
});
// ===============================
// MENU MANAGEMENT SYSTEM (ADVANCED)
// ===============================
let menu = JSON.parse(localStorage.getItem("menu")) || [];

// ===============================
// ADD DISH
// ===============================
function addDish(){

    const name = document.getElementById("dish").value.trim();
    const price = document.getElementById("price").value.trim();

    if(!name || !price){
        alert("Enter dish & price");
        return;
    }

    const newDish = {
        id: Date.now(),
        name,
        price,
        ingredients: "Not added",
        available: true,
        special: false
    };

    menu.push(newDish);
    saveMenu();
    renderMenu();

    document.getElementById("dish").value = "";
    document.getElementById("price").value = "";
}

// ===============================
// RENDER MENU
// ===============================
function renderMenu(){

    const list = document.getElementById("menuList");
    if(!list) return;

    list.innerHTML = "";

    menu.forEach(dish => {

        const div = document.createElement("div");
        div.classList.add("menu-item");

        div.innerHTML = `
            <h4>${dish.name} ${dish.special ? "⭐" : ""}</h4>

            <p>💰 ₹${dish.price}</p>
            <p>🧾 ${dish.ingredients}</p>
            <p>Status: ${dish.available ? "🟢 Available" : "🔴 Out of Stock"}</p>

            <button onclick="editDish(${dish.id})">Edit</button>
            <button onclick="deleteDish(${dish.id})">Delete</button>
            <button onclick="toggleStock(${dish.id})">
                ${dish.available ? "Mark Out of Stock" : "Mark Available"}
            </button>
            <button onclick="toggleSpecial(${dish.id})">
                ${dish.special ? "Remove Special" : "⭐ Make Special"}
            </button>
        `;

        list.appendChild(div);
    });
}

// ===============================
// EDIT DISH
// ===============================
function editDish(id){

    const dish = menu.find(d => d.id === id);

    const newName = prompt("Edit name:", dish.name);
    const newPrice = prompt("Edit price:", dish.price);
    const newIngredients = prompt("Edit ingredients:", dish.ingredients);

    if(newName) dish.name = newName;
    if(newPrice) dish.price = newPrice;
    if(newIngredients) dish.ingredients = newIngredients;

    saveMenu();
    renderMenu();
}

// ===============================
// DELETE DISH
// ===============================
function deleteDish(id){
    menu = menu.filter(d => d.id !== id);
    saveMenu();
    renderMenu();
}

// ===============================
// TOGGLE STOCK
// ===============================
function toggleStock(id){
    const dish = menu.find(d => d.id === id);
    dish.available = !dish.available;
    saveMenu();
    renderMenu();
}

// ===============================
// DAILY SPECIAL
// ===============================
function toggleSpecial(id){
    const dish = menu.find(d => d.id === id);
    dish.special = !dish.special;
    saveMenu();
    renderMenu();
}

// ===============================
// SAVE MENU (LOCAL STORAGE)
// ===============================
function saveMenu(){
    localStorage.setItem("menu", JSON.stringify(menu));
}

// ===============================
// LOAD MENU ON PAGE
// ===============================
window.addEventListener("DOMContentLoaded", () => {
    renderMenu();
});
