const nav = document.querySelector("nav");
const adminSave = sessionStorage.getItem("admin");
const path = window.location.pathname;
const pageName = path.substring(path.lastIndexOf("/") + 1);

let pageValue = document.documentElement.getAttribute("page");

nav.innerHTML = `
        <div class="logoInputContainer">
          <a href="/">
            <img src="/src/assets/icons/Logo.png" />
          </a>
          <div class="containerInput">
            <input type="text" placeholder="O que deseja encontrar?" />
            <img src="/src/assets/icons/Icone.png" />
          </div>
        </div>
        <button id="login">Login</button>
        <button id="administration" class="hidden">Menu administrador</button>
        <div class="menu">
          <img src="/src/assets/icons/Menu.png" />
        </div>  
  `;
document
  .getElementById("login")
  .addEventListener("click", () => (window.location = "src/pages/login.html"));
document
  .getElementById("administration")
  .addEventListener("click", () => (window.location = "allProducts.html"));

if (pageName === "allProducts.html" && adminSave && pageValue === "primary") {
  document.documentElement.setAttribute("page", "secondary");
}

pageValue = document.documentElement.getAttribute("page");

if (pageValue === "primary") {
  document.getElementById("login").classList.remove("hidden");
}
if (pageValue === "secondary") {
  document.getElementById("login").classList.add("hidden");
}

if (adminSave) {
  document.getElementById("login").classList.add("hidden");
}

if (
  (pageName === "allProducts.html" || pageName === "admin.html") &&
  adminSave
) {
  document.getElementById("administration").classList.remove("hidden");
}
