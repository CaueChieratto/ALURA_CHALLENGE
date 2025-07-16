const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const url = "http://localhost:4000/products";

fetch(url)
  .then((res) => res.json())
  .then((productsList) => {
    let foundProduct = null;
    productsList.forEach((categoryObject) => {
      const productsArray = Object.values(categoryObject)[0];
      const product = productsArray.find((p) => p.id == id);
      if (product) foundProduct = product;
    });
    if (foundProduct) {
      pageTitle(foundProduct);
      showProduct(foundProduct);

      let allProducts = [];
      productsList.forEach((categoryObject) => {
        allProducts = allProducts.concat(Object.values(categoryObject)[0]);
      });
      showSimilarProducts(allProducts, foundProduct.id);
    }
  })
  .catch((error) => console.log("Error:", error));

function pageTitle(foundProduct) {
  const image = document.createElement("link");
  image.rel = "icon";
  image.type = "image/png";
  image.href = `${foundProduct.image}`;
  document.head.appendChild(image);

  document.querySelector("title").textContent = `${foundProduct.name}`;
}

function showProduct(foundProduct) {
  const content = document.getElementById("content");
  content.innerHTML = `
        <div id="image"></div>
        <div class="productInfo">
          <h1>${foundProduct.name}</h1>
          <p>R\$${foundProduct.price.toFixed(2)}</p>
          <section>
            ${foundProduct.description}
          </section>
        </div> 
  `;

  const image = document.getElementById("image");
  image.style.backgroundImage = `url(${foundProduct.image})`;
}

function showSimilarProducts(allProducts, currentProductId) {
  const similarProductsContainer = document.getElementById("similarProducts");
  const filtered = allProducts.filter((p) => p.id != currentProductId);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  const randomProducts = shuffled.slice(0, 6);

  similarProductsContainer.innerHTML = randomProducts
    .map(
      (product) => `<div class="productsSimilar">
                      <img src="${product.image}" />
                      <h3>${product.name}</h3>
                      <p>R\$ ${product.price.toFixed(2)}</p>
                      <a id="${product.id}" 
                          href="products.html?name=${encodeURIComponent(
                            product.name
                          )}&id=${product.id}">
                          Ver Produto 
                      </a>
                    </div>`
    )
    .join("");
}
