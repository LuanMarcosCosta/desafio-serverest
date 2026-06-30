# Projeto: Testes Cypress — Desafio

Resumo
- Suite de testes Cypress para a API e interface do demo Serverest (front.serverest.dev / serverest.dev).
- Contém testes API (cadastro/remoção de usuários e produtos) e testes de GUI para cadastro.

Pré-requisitos
- Node.js 16+ (ou versão compatível com Cypress 13)
- npm ou yarn

Instalação
```bash
# instala dependências conforme package.json
npm ci
# ou
npm install
```

Scripts úteis (package.json)
- `npm run open` — abre o Cypress Test Runner (usa `npx cypress open`).
- `npm run cypress` — executa os specs em modo headless (usa `npx cypress run --quiet`).
- `npm run setup` — instala dependências e abre o Cypress.

Configurações de ambiente
- Variáveis utilizadas em `cypress.env.json`:
  - `user_email` — email de login (ex.: `fulano@qa.com`)
  - `user_password` — senha de login
  - `access_token` — campo disponível para uso, não é preenchido automaticamente

Observações sobre `Cypress.env`
- `Cypress.env('key', value)` armazena em runtime apenas para a sessão atual do runner. Não altera `cypress.env.json` permanentemente.
- Para persistir dados entre execuções, use `cy.writeFile('cypress.env.json', ...)` com cuidado.

Importante: plugin de upload
- O projeto usa `cypress-file-upload`. Ele é importado em [cypress/support/e2e.js](cypress/support/e2e.js).
- Se tiver erro `attachFile is not a function`, verifique se `import 'cypress-file-upload'` está presente nesse arquivo.

Estrutura principal
- `cypress/e2e/gui/` — testes de interface (frontend).
- `cypress/e2e/api/` — testes de API (cadastro, exclusão, etc.).
- `cypress/fixtures/` — fixtures e arquivos de imagem usados nos testes.
- `cypress/support/commands.js` — comandos customizados para GUI.
- `cypress/support/api_commands.js` — comandos customizados para APIs (login, create, delete).

Comandos customizados relevantes
- `cy.apiLogin()` — faz login via `POST /login` e retorna `authorization`.
- `cy.apiCadastrarUsuario(user)` — `POST /usuarios` com o payload de usuário.
- `cy.apiCadastrarProduto(token)` — `POST /produtos` usando o `authorization`.
- `cy.apiDeleteProduct(productId, token)` — `DELETE /produtos/{_id}`.
- `cy.apiDeleteProductByName(productName, token)` — busca por nome e exclui os registros retornados.

Principais specs de exemplo
- `cypress/e2e/api/cadastrar_usuario.cy.js` — cadastro de usuário via API.
- `cypress/e2e/api/cadastrar_produto.cy.js` — cadastro de produto via API (usa `cy.apiLogin`).
- `cypress/e2e/api/cadastrar_usuario_produto.cy.js` — fluxo: cria usuário, faz login, cria produto.
- `cypress/e2e/api/excluir_dados.cy.js` — deleta produto(s) pelo nome `Produto Teste - Fortrek`.
- `cypress/e2e/gui/cadastrar_Produto.cy.js` — exemplo de cadastro pela interface.

Como rodar um spec específico
```bash
# rodar um spec em modo headless
npx cypress run --spec "cypress/e2e/api/cadastrar_produto.cy.js"

# abrir runner e selecionar spec
npx cypress open
```
