// ===============================
// AUTH CHECK (Dashboard Protection)
// ===============================

// ===============================
// LOGOUT
// ===============================
function logout(){
    sessionStorage.removeItem("customerLoggedIn");
    window.location.href = "customer_login.html";
}

// ===============================
// DATA
// ===============================
const foodItems = [
    {name:"Dosa", category:"South Indian", price:80, img:"https://www.daringgourmet.com/wp-content/uploads/2023/06/Dosa-Recipe-3.jpg"},
    {name:"Idli", category:"South Indian", price:60, img:"https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2018/12/Instant-Suji-idli.jpg?ssl=1"},
    {name:"Vada", category:"South Indian", price:50, img:"https://c.ndtvimg.com/2023-09/u113o4r_medu-vada_625x300_06_September_23.jpg"},
    {name:"Pizza", category:"Fast Food", price:200, img:"https://images.jdmagicbox.com/v2/comp/bangalore/a3/080pxx80.xx80.200218070744.k1a3/catalogue/pizzarea-venkateshwara-layout-bangalore-pizza-outlets-1tkezj9e5x.jpg"},
    {name:"Burger", category:"Fast Food", price:120, img:"https://www.licious.in/blog/wp-content/uploads/2022/08/shutterstock_574607542.jpg"},
    {name:"Fries", category:"Fast Food", price:90, img:"https://kirbiecravings.com/wp-content/uploads/2019/09/easy-french-fries-1.jpg"},
    {name:"Pasta", category:"Italian", price:150, img:"https://www.spicebangla.com/wp-content/uploads/2024/08/Spicy-Pasta-recipe-optimised-scaled.webp"},
    {name:"Noodles", category:"Chinese", price:130, img:"https://www.kitchensanctuary.com/wp-content/uploads/2024/03/Stir-Fried-Noodles-with-Beansprouts-square-FS-500x500.jpg"},
    {name:"Cake", category:"Desserts", price:340, img:"https://www.dpsainiflorist.com/wp-content/uploads/2025/04/A556DBD7-612B-4BCF-8086-A84DFCB9A1E7.jpg"},
    {name:"Ice Cream", category:"Desserts", price:180, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReR12xx1BViXTiCrV1xHrSxUFTuzdp42mF8Q&s"},
    {name:"Strawberry Shake", category:"Drinks", price:290, img:"https://minimalistbaker.com/wp-content/uploads/2022/04/Strawberry-Milkshake-SQUARE.jpg"},
    {name:"Cold Coffee", category:"Drinks", price:180, img:"https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/1x1/1x1-cold-coffee-recipe.jpg"}
];

const categories = [
    {name:"South Indian", img:"https://assets.vogue.com/photos/63d169f727f1d528635b4287/3:2/w_3630,h_2420,c_limit/GettyImages-1292563627.jpg"},
    {name:"Fast Food", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0cFleHkr83XTp-0AALLRqiAOs7nZxme-OVQ&s"},
    {name:"Italian", img:"https://www.chenabgourmet.com/wp-content/uploads/2021/06/italian-food.jpeg"},
    {name:"Chinese", img:"https://vaya.in/recipes/wp-content/uploads/2019/03/Chinese-Foods.jpg"},
    {name:"Desserts", img:"https://upload.wikimedia.org/wikipedia/commons/a/ab/Desserts.jpg"},
    {name:"Drinks", img:"https://thebigmansworld.com/wp-content/uploads/2024/09/protein-shakes.jpg"}
];

let cart = [];
let wishlist = [];

// ===============================
// MENU
// ===============================
function renderMenu(list = foodItems){
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    list.forEach((item,i)=>{
        menu.innerHTML += `
        <div class="card">
            <img src="${item.img}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="addToCart(${i})">Add 🛒</button>
            <button onclick="toggleWishlist(${i})">
                ${wishlist.includes(item.name) ? "❤️" : "🤍"}
            </button>
        </div>`;
    });
}

// ===============================
// CATEGORIES
// ===============================
function renderCategories(){
    const c = document.getElementById("categories");
    c.innerHTML = "";

    categories.forEach(cat=>{
        c.innerHTML += `
        <div class="category" onclick="filterCategory('${cat.name}')">
            <img src="${cat.img}">
            <p>${cat.name}</p>
        </div>`;
    });
}

function filterCategory(cat){
    const filtered = foodItems.filter(f=>f.category===cat);
    renderMenu(filtered);
}

// ===============================
// CART
// ===============================
function addToCart(i){
    cart.push(foodItems[i]);
    renderCart();
}

function renderCart(){
    const cartDiv = document.getElementById("cartItems");
    let total = 0;
    cartDiv.innerHTML = "";

    cart.forEach((item,index)=>{
        total += item.price;
        cartDiv.innerHTML += `
        <p>${item.name} - ₹${item.price} 
        <button onclick="removeItem(${index})">❌</button></p>`;
    });

    document.getElementById("total").innerText = total;
}

function removeItem(i){
    cart.splice(i,1);
    renderCart();
}

// ===============================
// WISHLIST
// ===============================
function toggleWishlist(i){
    const name = foodItems[i].name;

    if(wishlist.includes(name)){
        wishlist = wishlist.filter(x=>x!==name);
    } else {
        wishlist.push(name);
    }

    renderWishlist();
    renderMenu();
}

function renderWishlist(){
    const w = document.getElementById("wishlist");
    w.innerHTML = "";

    if(wishlist.length === 0){
        w.innerHTML = "<p style='padding:20px'>No items in wishlist 💔</p>";
        return;
    }

    wishlist.forEach(name=>{
        const item = foodItems.find(f=>f.name===name);

        w.innerHTML += `
        <div class="card">
            <img src="${item.img}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="addToCart(${foodItems.indexOf(item)})">Add 🛒</button>
        </div>`;
    });
}

// ===============================
// SEARCH
// ===============================
function searchFood(){
    const input = document.getElementById("search").value.toLowerCase().trim();

    if(input === ""){
        renderMenu();
        return;
    }

    const filtered = foodItems.filter(item =>
        item.name.toLowerCase().includes(input) ||
        item.category.toLowerCase().includes(input)
    );

    renderMenu(filtered);
}

// ===============================
// PAYMENT
// ===============================
function proceedPayment(){
    document.getElementById("paymentModal").style.display = "block";
}

function showQR(){
    hidePayment();
    document.getElementById("qrSection").style.display = "block";
}

function showUPI(){
    hidePayment();
    document.getElementById("upiSection").style.display = "block";
}

function hidePayment(){
    document.getElementById("qrSection").style.display = "none";
    document.getElementById("upiSection").style.display = "none";
}

function payUPI(){
    const upi = document.getElementById("upiId").value;

    if(!upi.includes("@")){
        alert("Enter valid UPI ID ❌");
        return;
    }

    alert("Processing UPI Payment...");
    setTimeout(confirmOrder,1500);
}

function cashOnDelivery(){
    alert("Order placed with Cash on Delivery 💵");
    confirmOrder();
}

function confirmOrder(){
    alert("Order Placed Successfully 🎉");

    cart = [];
    renderCart();

    document.getElementById("paymentModal").style.display = "none";
}

// ===============================
// THEME
// ===============================
function toggleTheme(){
    document.body.classList.toggle("dark");
}

// ===============================
// GREETING
// ===============================
function setGreeting(){
    const h = new Date().getHours();
    let text = "";

    if(h < 12) text = "🌅 Good Morning";
    else if(h < 18) text = "🌤️ Good Afternoon";
    else text = "🌙 Good Evening";

    document.getElementById("greeting").innerText = text + ", Sia ✨";
}

// ===============================
// PROFILE MENU
// ===============================
function toggleProfileMenu(){
    const menu = document.getElementById("profileMenu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}
// AUTO REDIRECT (LOGIN PAGE)
if(currentPage.includes("customer_login.html")){
    window.onload = function(){
        if(sessionStorage.getItem("customerLoggedIn")){
            window.location.href = "customer_dashboard.html";
        }
    };
}

// LOGIN FUNCTION
function customerLogin(){

    const username = document.getElementById("custUser").value.trim();
    const password = document.getElementById("custPass").value.trim();

    if(username === "customer" && password === "1234"){

        sessionStorage.setItem("customerLoggedIn", "true");
        window.location.href = "customer_dashboard.html";

    } else {
        alert("Invalid Login ❌");
    }
}
