const footer = document.querySelector("footer");
const body = document.querySelector("body");

footer.innerHTML = `
    <div class="containerFoot">
        <div class="containerImgAndInfos">
          <img src="/src/assets/icons/Logo.png" />
          <div class="infos">
            <p>Quem somos nós</p>
            <p>Política de privacidade</p>
            <p>Programa fidelidade</p>
            <p>Nossas lojas</p>
            <p>Quero ser franqueado</p>
            <p>Anuncie aqui</p>
          </div>
        </div>
        <div class="messageContainer">
          <h2>Fale conosco</h2>
          <div class="message">
            <div class="messageWrapper">
              <p>Nome</p>
              <input type="text" />
            </div>
            <div class="messageWrapper">
              <textarea placeholder="Escreva sua Mensagem"></textarea>
            </div>
          </div>
          <button>Enviar menssagem</button>
        </div>
    </div>
`;

const credits = document.createElement("span");
credits.innerHTML = `Desenvolvido por Cauê Batista Chieratto <br /> 2025`;

body.appendChild(credits);
