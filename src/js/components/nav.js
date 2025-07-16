const nav = document.querySelector("nav");
const pageValue = document.documentElement.getAttribute("page");

if (pageValue == "secondary") {
  nav.innerHTML = `
        <div class="logoInputContainer">
          <a href="index.html">
            <img src="/src/assets/icons/Logo.png" />
          </a>
          <div class="containerInput">
            <input type="text" placeholder="O que deseja encontrar?" />
            <img src="/src/assets/icons/Icone.png" />
          </div>
        </div>
        <div class="menu">
          <img src="/src/assets/icons/Menu.png" />
        </div>  
  `;
} else {
  nav.innerHTML = `
        <div class="logoInputContainer">
          <img src="/src/assets/icons/Logo.png" />
          <div class="containerInput">
            <input type="text" placeholder="O que deseja encontrar?" />
            <img src="/src/assets/icons/Icone.png" />
          </div>
        </div>
        <button id="login">Login</button>
        <div class="menu">
          <img src="/src/assets/icons/Menu.png" />
        </div>  
  `;

  document
    .getElementById("login")
    .addEventListener("click", () => (window.location = "login.html"));
}
