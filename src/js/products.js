const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const urlLocal = "http://localhost:4000/products";
const urlVercel = "https://api-alura-geek-gules.vercel.app/api/products";

let useUrl = urlVercel;

async function checkLocalApi() {
  try {
    const response = await fetch(urlLocal, { method: "GET" });
    if (response.ok) {
      useUrl = urlLocal;
      console.log("Usando API local (JSON Server)");
    } else {
      console.log("API local respondeu com erro, usando Vercel");
    }
  } catch (error) {
    console.log("API local indisponível, usando Vercel");
  }
}

async function start() {
  await checkLocalApi();

  fetch(useUrl)
    .then((res) => res.json())
    .then((productsList) => {
      const foundProduct = productsList.find(
        (p) => String(p.id) === String(id)
      );

      if (foundProduct) {
        pageTitle(foundProduct);
        showProduct(foundProduct);
        showSimilarProducts(productsList, foundProduct.id);
      }
    })
    .catch((err) => {
      console.error("Erro no fetch ou processamento:", err);
    });
}

start();

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
  const imageUrl = foundProduct.image;

  image.style.backgroundImage = `url(${imageUrl})`;

  const testImage = new Image();
  testImage.onerror = () => {
    image.classList.add("no-image");
    image.style.backgroundImage = "url(../assets/icons/no-image.jpg)";
  };
  testImage.src = imageUrl;
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
        <img src="${
          product.image
        }" onerror="this.classList.add('no-image'); this.src='../assets/icons/no-image.jpg';" />
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
