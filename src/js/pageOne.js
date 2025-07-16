const url = "http://localhost:4000/products";
const containerProducts = document.querySelectorAll(".containerProducts");

fetch(url)
  .then((response) => response.json())
  .then((productsList) => showProducts(productsList))
  .catch((erro) => console.log("Erro:", erro));

function showProducts(productsList) {
  containerProducts.forEach((container) => {
    container.innerHTML = "";
    const section = container.id;

    const categoryObject = productsList.find((object) => object[section]);
    if (!categoryObject) return;

    categoryObject[section].forEach((product) => {
      container.innerHTML += `<div class="product">
                                <img src="${product.image}" />
                                <h3>${product.name}</h3>
                                <p>R$ ${product.price.toFixed(2)}</p>
                                <a id="${product.id}" 
                                  href="products.html?name=${encodeURIComponent(
                                    product.name
                                  )}&id=${product.id}">
                                  Ver Produto
                                </a>                              
                              </div>`;
    });
  });
}

function goToConsoleSection() {
  document
    .getElementById("consolesSection")
    .scrollIntoView({ behavior: "smooth" });
}
