# Projeto Loja Virtual - Documentação

---

## Descrição Geral

Projeto de uma loja virtual com funcionalidades para exibição de produtos, busca, área administrativa para gerenciar produtos (CRUD), autenticação básica de administrador, e interação com uma API REST simulada localmente. O projeto utiliza HTML, CSS e JavaScript puro, consumindo dados via fetch a partir de uma API REST (exemplo: JSON Server rodando em `http://localhost:4000/products`).

- Uma **API hospedada na Vercel** (apenas para leitura dos produtos via método `GET`), e
- Um **backend local (JSON Server)** para simular as operações de escrita (`POST`, `PUT`, `DELETE`), usadas na área administrativa.

---

## Estrutura e Funcionalidades

### 1. **footer.js**

- Manipula o conteúdo do rodapé da página.
- Insere logo, informações institucionais e um formulário de contato simples (nome + mensagem).
- Insere créditos fixos no final do body com o desenvolvedor e o ano.

---

### 2. **nav.js**

- Controla a barra de navegação principal.
- Inclui logo, campo de busca com autocomplete, botões de login e menu de administração.
- Exibe/esconde botões dependendo do estado de login do administrador (armazenado em `sessionStorage`).
- Faz requisição via API para buscar produtos conforme o texto digitado.
- Exibe os resultados da busca dinamicamente e permite clicar para navegar ao produto correspondente.

---

### 3. **admin.js**

- Página de administração para adicionar novos produtos.
- Busca a lista atual de produtos para obter o último ID.
- Valida campos do formulário para novo produto (imagem, categoria, nome, preço, descrição).
- Valida preço para conter apenas números e vírgulas.
- Envia requisição POST para a API para salvar o novo produto.
- Mostra alertas em caso de sucesso ou erros.

---

### 4. **login.js**

- Validação simples de login para administrador.
- Compara email e senha fixos (`admin@gmail` / `12345`).
- Armazena flag `admin` em `sessionStorage` ao logar com sucesso.
- Redireciona para página de listagem de produtos para administração.
- Alerta em caso de senha inválida.

---

### 5. **index.js**

- Busca todos os produtos via API.
- Exibe os produtos filtrados por categoria (`starWars`, `consoles`, `diversos`) em containers separados.
- Se usuário for administrador, exibe todos os produtos ordenados por ID com opções para editar e excluir.
- Se usuário comum, embaralha a exibição dos produtos.
- Funções para excluir, editar produtos com requisições DELETE e PUT à API.
- Controla visibilidade dos botões de edição/exclusão e botão para adicionar produto conforme o login.
- Função para navegar para a seção de consoles via scroll suave.

---

### 6. **products.js**

- Página de detalhes do produto.
- Lê parâmetro `id` da URL para identificar o produto.
- Busca todos os produtos via API.
- Exibe as informações do produto selecionado (imagem, nome, preço, descrição).
- Atualiza título e favicon da página com dados do produto.
- Exibe até 6 produtos similares (excluindo o atual), escolhidos aleatoriamente.

---

## API Simulada

A aplicação usa dois ambientes para a API:

### 🔹 API na Vercel (somente leitura)

- URL: `https://api-alura-geek-gules.vercel.app/api/products`
- Suporta apenas: `GET /api/products`
- Utilizada para exibir os produtos ao público.

### 🔹 API local (JSON Server)

- URL: `http://localhost:4000/products`
- Suporta operações completas:
  - `GET /products` - lista todos os produtos
  - `GET /products/:id` - busca produto por ID
  - `POST /products` - adiciona novo produto
  - `PUT /products/:id` - atualiza produto existente
  - `DELETE /products/:id` - remove produto

---

## Tecnologias Utilizadas

- HTML, CSS e JavaScript puro (ES6+)
- API REST simulada local com JSON Server ou similar
- Uso de DOM para manipulação dinâmica
- Armazenamento de sessão via `sessionStorage` para autenticação simples

---

## Como Usar

1. Rodar a API local (exemplo: JSON Server) com os dados dos produtos na porta 4000.
2. Abrir os arquivos HTML no navegador.
3. Navegar entre páginas para listar produtos, buscar, visualizar detalhes e, se logado como admin, gerenciar produtos.
4. Para login admin use:
   - Email: `admin@gmail`
   - Senha: `12345`

---

## Autor

Desenvolvido por Cauê Batista Chieratto  
2025

---

## Observações

- O sistema não possui autenticação segura, sendo apenas uma simulação básica.
- As imagens dos produtos são carregadas por URL; caso haja erro, uma imagem padrão é exibida.
- A busca faz requisição conforme o texto digitado, exibindo resultados em tempo real.
- O código permite futura expansão para incluir mais categorias, melhorias visuais e segurança.
- **No ambiente de produção (API na Vercel), somente o método GET está disponível. As operações de criação, atualização e exclusão são executadas localmente via JSON Server.**

---
