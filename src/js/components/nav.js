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
            <input type="text" placeholder="O que deseja encontrar?" id="search" />
            <img src="/src/assets/icons/Icone.png" />
            <div class="containerSearch"></div>
          </div>
        </div>
        <button id="login">Login</button>
        <button id="administration" class="hidden">Menu administrador</button>
        <div class="menu">
          <img src="/src/assets/icons/Menu.png" />
        </div>  
  `;
document.getElementById("login").addEventListener("click", () => {
  const currentPath = window.location.pathname;

  if (!currentPath.includes("/src/pages/")) {
    window.location = "src/pages/login.html";
  } else {
    window.location = "login.html";
  }
});

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

function requestApi(searchTerm) {
  fetch(`http://localhost:4000/products?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((productsList) => showSearchResults(productsList))
    .catch((erro) => console.log("Erro:", erro));
}

const containerSearch = document.querySelector(".containerSearch");
const search = document.querySelector("#search");

function showSearchResults(productsList) {
  containerSearch.innerHTML = "";

  productsList.forEach((product) => {
    containerSearch.innerHTML += `
                              <div class="resultSearch" data-name="${product.name}" data-id="${product.id}">
                                <img src="${product.image}" />
                                <h4>${product.name}</h4>
                              </div>
                            `;
  });
  containerSearch.addEventListener("click", (e) => {
    const result = e.target.closest(".resultSearch");
    if (!result) return;

    const name = result.dataset.name;
    const id = result.dataset.id;

    let basePath = "";
    if (!window.location.pathname.includes("/src/pages/")) {
      basePath = "src/pages/";
    }

    window.location.href = `${basePath}products.html?name=${encodeURIComponent(
      name
    )}&id=${id}`;
  });
}

document.addEventListener("input", () => {
  const searchTerm = search.value.toLowerCase();
  if (searchTerm === "") {
    containerSearch.classList.add("hidden");
  } else {
    containerSearch.classList.remove("hidden");
    requestApi(searchTerm);
  }
});
