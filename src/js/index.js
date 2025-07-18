const url = "http://localhost:4000/products";
const containerProducts = document.querySelectorAll(".containerProducts");
const isAdmin = sessionStorage.getItem("admin");

fetch(url)
  .then((response) => response.json())
  .then((productsList) => showProducts(productsList))
  .catch((erro) => console.log("Erro:", erro));

if (document.getElementById("geral")) {
  fetch(url)
    .then((response) => response.json())
    .then((allProducts) => {
      pageAllProducts(allProducts);
    })
    .catch((erro) => console.log("Erro:", erro));
}

function showProducts(productsList) {
  containerProducts.forEach((container) => {
    container.innerHTML = "";
    const section = container.id;

    const filtered = productsList.filter((p) => p.category === section);

    filtered.forEach((product) => {
      container.innerHTML += `<div class="product">
                                <img src="${product.image}" 
                                    onerror="this.classList.add('no-image'); this.src='../assets/icons/no-image.jpg';" 
                                />
                                <h3>${product.name}</h3>
                                <p>R$ ${product.price.toFixed(2)}</p>
                                <a id="${product.id}" 
                                  href="src/pages/products.html?name=${encodeURIComponent(
                                    product.name
                                  )}&id=${product.id}">
                                  Ver Produto
                                </a>                              
                              </div>`;
    });
  });
}

function pageAllProducts(allProducts) {
  const geral = document.getElementById("geral");

  let productsToShow;

  if (isAdmin === "true") {
    productsToShow = allProducts.slice().sort((a, b) => a.id - b.id);
  } else {
    productsToShow = allProducts.slice().sort(() => Math.random() - 0.5);
  }

  geral.innerHTML = "";

  productsToShow.forEach((product) => {
    geral.innerHTML += `<div class="allProduct ${product.id}">
                                <div class="containerIcons hidden">
                                  <img class="icon delete" src="/src/assets/icons/Trash.png" />
                                  <img class="icon edit" src="/src/assets/icons/Pencil.png" />
                                </div>
                                <img src="${product.image}" 
                                    onerror="this.classList.add('no-image'); this.src='../assets/icons/no-image.jpg';" 
                                />
                                <h3>${product.name}</h3>
                                <p>R$ ${product.price.toFixed(2)}</p>
                                <h6 class="hidden">#${product.id}</h6>
                                <a class="link" id="${product.id}"
                                  href="products.html?name=${encodeURIComponent(
                                    product.name
                                  )}&id=${product.id}">
                                  Ver Produto
                                </a>                              
                              </div>`;
  });

  findId(productsToShow);
  admin();
}

function findId(allProducts) {
  document.querySelectorAll(".delete").forEach((iconDel) => {
    iconDel.onclick = async () => {
      const allProductDiv = iconDel.closest(".allProduct");
      const targetClass = allProductDiv.classList[1];

      const productFound = allProducts.find(
        (p) => String(p.id) === String(targetClass)
      );

      if (!productFound) {
        alert("Produto não encontrado.");
        return;
      }

      await del(productFound);
    };
  });

  document.querySelectorAll(".edit").forEach((iconEdi) => {
    iconEdi.onclick = async () => {
      const allProductDiv = iconEdi.closest(".allProduct");
      const targetClass = allProductDiv.classList[1];

      const productFound = allProducts.find(
        (p) => String(p.id) === String(targetClass)
      );

      if (!productFound) {
        alert("Produto não encontrado.");
        return;
      }

      await edit(productFound);
    };
  });
}

async function del(product) {
  const confirmed = confirm(`Deseja excluir o produto ${product.name}?`);

  if (!confirmed) return;

  try {
    const response = await fetch(`${url}/${product.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const productDiv = document.querySelector(
        `.allProduct[data-id="${product.id}"]`
      );
      if (productDiv) productDiv.remove();
      alert("Produto excluído com sucesso!");
    }
  } catch (error) {
    alert("Erro ao deletar o produto.");
    console.error(error);
  }
}

async function edit(product) {
  const name = prompt("Nome do produto:", product.name);
  if (name === null) return;

  const image = prompt("URL da imagem:", product.image);
  if (image === null) return;

  const priceStr = prompt("Preço (somente números):", product.price.toFixed(2));
  if (priceStr === null) return;
  const price = parseFloat(priceStr.replace(",", "."));
  if (isNaN(price)) {
    alert("Preço inválido.");
    return;
  }

  const description = prompt("Descrição:", product.description);
  if (description === null) return;

  const category = prompt("Categoria:", product.category || "");
  if (category === null) return;

  const updatedProduct = {
    ...product,
    name,
    image,
    price,
    description,
    category,
  };

  try {
    await updateProduct(updatedProduct);
    alert("Produto atualizado!");
  } catch (error) {
    alert("Erro ao atualizar produto.");
    console.error(error);
  }
}

async function updateProduct(product) {
  const response = await fetch(`${url}/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  }
}

function goToConsoleSection() {
  document
    .getElementById("consolesSection")
    .scrollIntoView({ behavior: "smooth" });
}

function admin() {
  const buttonAdd = document.getElementById("add");
  const containerIcons = document.querySelectorAll(".containerIcons");
  const id = document.querySelectorAll("h6");
  const link = document.querySelectorAll(".link");

  buttonAdd.addEventListener(
    "click",
    () => (window.location.href = "admin.html")
  );

  if (isAdmin === "true") {
    buttonAdd.classList.remove("hidden");
    containerIcons.forEach((icon) => {
      icon.classList.remove("hidden");
    });
    id.forEach((h6) => {
      h6.classList.remove("hidden");
    });

    link.forEach((a) => {
      a.classList.add("hidden");
    });
  } else {
    buttonAdd.classList.add("hidden");
    containerIcons.forEach((icon) => {
      icon.classList.add("hidden");
    });
    id.forEach((h6) => {
      h6.classList.add("hidden");
    });

    link.forEach((a) => {
      a.classList.remove("hidden");
    });
  }
}
