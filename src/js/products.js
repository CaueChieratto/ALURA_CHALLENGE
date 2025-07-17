const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const url = "http://localhost:4000/products";

fetch(url)
  .then((res) => res.json())
  .then((productsList) => {
    const foundProduct = productsList.find((p) => String(p.id) === String(id));

    if (foundProduct) {
      console.log("Produto encontrado:", foundProduct);
      pageTitle(foundProduct);
      showProduct(foundProduct);

      showSimilarProducts(productsList, foundProduct.id);
    } else {
      console.log("Produto não encontrado para o id:", id);
    }
  })
  .catch((err) => {
    console.error("Erro no fetch ou processamento:", err);
  });

function pageTitle(foundProduct) {
  const linkIcon = document.createElement("link");
  linkIcon.rel = "icon";
  linkIcon.type = "image/png";
  linkIcon.href = foundProduct.image;
  document.head.appendChild(linkIcon);

  document.title = foundProduct.name;
}

function showProduct(foundProduct) {
  const content = document.getElementById("content");
  content.innerHTML = `
        <div id="image"></div>
        <div class="productInfo">
          <h1>${foundProduct.name}</h1>
          <p>R$ ${foundProduct.price.toFixed(2)}</p>
          <section>${foundProduct.description}</section>
        </div> 
  `;

  const image = document.getElementById("image");
  image.style.backgroundImage = `url(${foundProduct.image})`;
}

function showSimilarProducts(allProducts, currentProductId) {
  const similarProductsContainer = document.getElementById("similarProducts");

  const filtered = allProducts.filter((p) => p.id !== currentProductId);

  const shuffled = filtered.sort(() => Math.random() - 0.5);
  const randomProducts = shuffled.slice(0, 6);

  similarProductsContainer.innerHTML = randomProducts
    .map(
      (product) => `
      <div class="productsSimilar">
        <img src="${product.image}" />
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        <a id="${product.id}" href="products.html?name=${encodeURIComponent(
        product.name
      )}&id=${product.id}">
          Ver Produto 
        </a>
      </div>`
    )
    .join("");
}
