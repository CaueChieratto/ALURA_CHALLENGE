function login() {
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");
  const email = "admin@gmail";
  const password = "12345";

  const form = inputEmail.value + inputPassword.value;
  const correct = email + password;

  if (form == correct) {
    sessionStorage.setItem("admin", "true");
    window.location.href = "allProducts.html";
  } else {
    alert("Senha invalida");
  }
}
