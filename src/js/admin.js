const url = "http://localhost:4000/products";

const sectionContainer = document.getElementById("sectionContainer");
const btnAddNewProduct = document.getElementById("addNewProduct");

fetch(url)
  .then((response) => response.json())
  .then((productsList) => addNewProduct(productsList))
  .catch((erro) => console.log("Erro:", erro));

sectionContainer.innerHTML = ` 
                                <h4>Categoria</h4>
                                <select id="category">
                                    <option value="" disabled selected>Escolha a categoria</option>
                                    <option value="starWars">Star Wars</option>
                                    <option value="consoles">Consoles</option>
                                    <option value="diversos">Diversos</option>
                                </select>
                                `;

function addNewProduct(productsList) {
  const allId = productsList.map((product) => product.id);
  const lastId = allId[allId.length - 1];
  const regexPrice = /^[0-9,]+$/;

  btnAddNewProduct.onclick = async () => {
    const newImage = document.getElementById("imageUrl").value;
    const newCategory = document.getElementById("category").value;
    const newName = document.getElementById("name").value;
    const newPrice = document.getElementById("price").value;
    const newDescription = document.getElementById("description").value;

    if (!regexPrice.test(newPrice)) {
      alert("Preço inválido! Use apenas números e vírgulas. Ex: 12,99");
      return;
    }

    if (
      newImage == "" ||
      newCategory == "" ||
      newName == "" ||
      newPrice == "" ||
      newDescription == ""
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const newProduct = {
      id: lastId + 1,
      name: newName,
      image: newImage,
      price: Number(newPrice.replace(",", ".")),
      description: newDescription,
      category: newCategory,
    };

    updateProduct(newProduct);
  };
}

async function updateProduct(product) {
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  } else {
    alert("Produto adicionado com sucesso");
  }
}
