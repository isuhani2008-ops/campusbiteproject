// ===============================
// DOM LOADED
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    // ===============================
// LOGIN DROPDOWN TOGGLE
// ===============================
// LOGIN DROPDOWN
const loginBtn = document.querySelector(".login-btn");
const loginMenu = document.getElementById("loginMenu");

if (loginBtn && loginMenu) {

    loginBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        loginMenu.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".login-btn")) {
            loginMenu.classList.remove("show");
        }
    });
}
function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle("active");
}

    // ===============================
    // SMOOTH SCROLL
    // ===============================
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const section = document.querySelector(targetId);

            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });


    // ===============================
    // STICKY NAVBAR
    // ===============================
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });


    // ===============================
    // ACTIVE LINK HIGHLIGHT
    // ===============================
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });


    // ===============================
    // CONTACT FORM
    // ===============================
    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = this.querySelector("input[type='text']").value.trim();
            const email = this.querySelector("input[type='email']").value.trim();
            const message = this.querySelector("textarea").value.trim();

            if (!name || !email || !message) {
                alert("⚠ Please fill all fields!");
                return;
            }

            alert("✅ Message sent successfully!");
            this.reset();
        });
    }

    // ===============================
    // LOAD SAVED THEME
    // ===============================
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

});


// ===============================
// GLOBAL THEME TOGGLE
// ===============================
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}
// ===============================
// LOGIN REDIRECTS
// ===============================
const adminBtn = document.getElementById("adminLogin");
const chefBtn = document.getElementById("chefLogin");
const customerBtn = document.getElementById("customerLogin");

if(adminBtn){
    adminBtn.addEventListener("click", () => {
        window.location.href = "admin_login.html";
    });
}

if(chefBtn){
    chefBtn.addEventListener("click", () => {
        window.location.href = "chef_login.html";
    });
}

if(customerBtn){
    customerBtn.addEventListener("click", () => {
        window.location.href = "customer_login.html";
    });
}
