// ==========================
// LOGIN FUNCTION (FOR LOGIN PAGE)
// ==========================
function adminLogin() {
    let username = document.getElementById("adminUser")?.value;
    let password = document.getElementById("adminPass")?.value;

    if (username === "admin" && password === "1234") {
        alert("Login Successful ✅");

        // 🔥 IMPORTANT: path based on your structure
        window.location.href = "admin_dashboard.html"; 
        // ⬆️ change if your file is somewhere else

    } else {
        alert("Invalid Username or Password ❌");
    }
}


// ==========================
// SECTION SWITCHING
// ==========================
function showSection(sectionId) {
    let sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}


// ==========================
// THEME TOGGLE
// ==========================
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}


// ==========================
// LOGOUT
// ==========================
function logoutAdmin() {
    alert("Logging out...");
    window.location.href = "admin_login.html"; 
}


// ==========================
// LOAD CHARTS (SAFE)
// ==========================
window.addEventListener("DOMContentLoaded", function () {

    // Weekly Sales
    const sales = document.getElementById("salesChart");

    if (sales) {
        new Chart(sales, {
            type: "line",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                    label: "Sales ₹",
                    data: [1200, 1900, 1500, 2200, 3000, 2500, 3200],
                    borderWidth: 2,
                    tension: 0.4
                }]
            }
        });
    }

    // Daily Chart
    const daily = document.getElementById("dailyChart");

    if (daily) {
        new Chart(daily, {
            type: "bar",
            data: {
                labels: ["10AM", "12PM", "2PM", "4PM", "6PM"],
                datasets: [{
                    label: "Orders",
                    data: [20, 45, 60, 30, 25],
                    borderWidth: 1
                }]
            }
        });
    }

    // Monthly Chart
    const monthly = document.getElementById("monthlyChart");

    if (monthly) {
        new Chart(monthly, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [{
                    label: "Revenue ₹",
                    data: [12000, 18000, 15000, 22000, 30000],
                    borderWidth: 2,
                    tension: 0.4
                }]
            }
        });
    }
});


// ==========================
// GLOBAL CLICK HANDLER
// ==========================
document.addEventListener("click", function (e) {

    // Orders
    if (e.target.classList.contains("accept-btn")) {
        alert("Order Accepted ✅");
        e.target.closest(".order-card").classList.remove("pending");
        e.target.closest(".order-card").classList.add("preparing");
    }

    if (e.target.classList.contains("ready-btn")) {
        alert("Order Ready 🍽️");
        e.target.closest(".order-card").classList.remove("preparing");
        e.target.closest(".order-card").classList.add("ready");
    }

    if (e.target.classList.contains("deliver-btn")) {
        alert("Order Delivered 🚀");
        e.target.closest(".order-card").remove();
    }

    if (e.target.classList.contains("cancel-btn")) {
        alert("Order Cancelled ❌");
        e.target.closest(".order-card").remove();
    }

    // Food delete
    if (e.target.classList.contains("delete-btn")) {
        e.target.closest(".food-card").remove();
    }

    // Inventory delete
    if (e.target.classList.contains("delete-stock")) {
        e.target.closest("tr").remove();
    }

});


// ==========================
// ADD FOOD
// ==========================
document.addEventListener("DOMContentLoaded", function () {

    // ✅ ADD FOOD LOGIC HERE
    document.querySelector(".submit-btn")?.addEventListener("click", function () {

        let inputs = document.querySelectorAll(
            ".add-food-form input, .add-food-form textarea, .add-food-form select"
        );

        let name = inputs[0].value;
        let price = inputs[1].value;
        let image = inputs[2].value;
        let category = inputs[3].value;
        let desc = inputs[4].value;

        if (!name || !price || !image) {
            alert("Fill all fields!");
            return;
        }

        // 📦 Get existing menu
        let menu = JSON.parse(localStorage.getItem("menu")) || [];

        // ➕ Add new item
        menu.push({ name, price, image, category, desc });

        // 💾 Save
        localStorage.setItem("menu", JSON.stringify(menu));

        // 🔄 Reload UI
        loadMenu();

        alert("Food Added 🍔");

    });

});


    // ==========================
    // INVENTORY ADD
    // ==========================
    document.querySelector(".inventory-form button")?.addEventListener("click", function () {

        let inputs = document.querySelectorAll(".inventory-form input");

        let name = inputs[0].value;
        let category = inputs[1].value;
        let stock = inputs[2].value;

        if (!name || !category || !stock) {
            alert("Fill all fields!");
            return;
        }

        let status = "in-stock";

        if (stock == 0) status = "out-stock";
        else if (stock < 10) status = "low-stock";

        let newRow = `
            <tr>
                <td>${name}</td>
                <td>${category}</td>
                <td>${stock}</td>
                <td>${status}</td>
                <td><button class="delete-stock">Delete</button></td>
            </tr>
        `;

        document.querySelector(".inventory-table table").innerHTML += newRow;

        alert("Inventory Added 📦");
    });


// ==========================
// MENU SEARCH FUNCTION
// ==========================
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.querySelector(".menu-actions input");

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {

            let searchValue = searchInput.value.toLowerCase();

            let foodCards = document.querySelectorAll(".food-card");

            foodCards.forEach(card => {

                let name = card.querySelector("h3").innerText.toLowerCase();
                let category = card.querySelector(".category")?.innerText.toLowerCase() || "";

                if (name.includes(searchValue) || category.includes(searchValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });
    }

});
function loadMenu() {
    let menu = JSON.parse(localStorage.getItem("menu")) || [];

    let container = document.querySelector(".menu-grid");
    container.innerHTML = "";

    menu.forEach((item, index) => {
        container.innerHTML += createFoodCard(item, index);
    });
}
function createFoodCard(item, index) {
    return `
        <div class="food-card" data-index="${index}">
            <img src="${item.image}">
            <div class="food-info">
                <h3>${item.name}</h3>
                <p class="category">${item.category}</p>
                <p class="price">₹${item.price}</p>
                <p class="desc">${item.desc}</p>
                <div class="food-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    `;
}
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("edit-btn")) {

        let card = e.target.closest(".food-card");
        let index = card.dataset.index;

        let menu = JSON.parse(localStorage.getItem("menu")) || [];

        let item = menu[index];

        let newName = prompt("Edit Name:", item.name);
        let newPrice = prompt("Edit Price:", item.price);
        let newImage = prompt("Edit Image URL:", item.image);
        let newCategory = prompt("Edit Category:", item.category);
        let newDesc = prompt("Edit Description:", item.desc);

        menu[index] = {
            name: newName,
            price: newPrice,
            image: newImage,
            category: newCategory,
            desc: newDesc
        };

        localStorage.setItem("menu", JSON.stringify(menu));

        loadMenu();

        alert("Updated Successfully ✏️");
    }

});
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {

        let card = e.target.closest(".food-card");
        let index = card.dataset.index;

        let menu = JSON.parse(localStorage.getItem("menu")) || [];

        menu.splice(index, 1);

        localStorage.setItem("menu", JSON.stringify(menu));

        loadMenu();
    }

});