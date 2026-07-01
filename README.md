# Projeto: Testes Cypress — Desafio

## Visão geral
Uma suíte de testes Cypress para o front e API do Serverest. O projeto cobre:
- testes de API para cadastro e exclusão de usuários e produtos;
- testes de interface para cadastro e exclusão via GUI;
- configuração de CI usando GitHub Actions.

## Pré-requisitos
- Node.js 16+ (recomendado 18)
- npm

## Instalação
```bash
npm ci
```

Se o projeto ainda não tiver `package-lock.json`, use:
```bash
npm install
```

## Scripts disponíveis
- `npm run open` — abre o Cypress Test Runner.
- `npm run cypress` — executa todos os testes em modo headless.
- `npm run setup` — instala dependências e abre o Cypress.
- `npm run serverSetup` — instala dependências.

## Configuração de ambiente
O arquivo `cypress.env.json` contém os dados de login usados pelos testes:
```json
{
  "user_email": "fulano@qa.com",
  "user_password": "teste"
}
```

### Variáveis de ambiente do GitHub Actions
No repositório GitHub, defina os secrets:
- `CYPRESS_USER_EMAIL`
- `CYPRESS_USER_PASSWORD`

Esses valores são usados no workflow CI.

## Estrutura do projeto
- `cypress/e2e/api/` — specs de API.
- `cypress/e2e/gui/` — specs de interface.
- `cypress/support/api_commands.js` — comandos customizados de API.
- `cypress/support/gui_commands.js` — comandos customizados de GUI.
- `cypress/support/e2e.js` — arquivo de suporte carregado pelo Cypress.
- `cypress/fixtures/` — arquivos de fixture e imagens usadas nos testes.
- `.github/workflows/ci.yml` — workflow de CI do GitHub Actions.

## Comandos customizados principais
### API
- `cy.apiLogin()` — faz login em `POST /login` usando `cypress.env.json`.
- `cy.apiCadastrarUsuario(user)` — cadastra usuário em `POST /usuarios` com email aleatório quando não passa `user.email`.
- `cy.apiCadastrarProduto(token, product)` — cadastra produto em `POST /produtos` usando token e aceita overrides de payload.
- `cy.apiDeletarUsuario(userId, token)` — exclui usuário via `DELETE /usuarios/{_id}`.
- `cy.apiDeletarPeloNome(userName, token)` — busca usuários por nome e exclui todos encontrados.
- `cy.apiDeletarProduto(productId, token)` — exclui produto via `DELETE /produtos/{_id}`.
- `cy.apiDeletarProdutoPeloNome(productName, token)` — busca produtos por nome e exclui todos encontrados.

### GUI
- `cy.login()` — realiza login pela interface.
- `cy.cadastrarUsuario()` — cadastra usuário pela interface.
- `cy.cadastrarProduto()` — cadastra produto pela interface com nome randômico.
- `cy.deletarProdutosPeloNome()` — remove produtos pelo nome com regex `dell`.
- `cy.deletarUsuariosPeloNome()` — remove usuários pelo nome com regex `alice`.

## Principais testes
### API
- `cypress/e2e/api/api_cadastrar_usuario.cy.js` — cadastro de usuário via API.
- `cypress/e2e/api/api_cadastrar_produto.cy.js` — cadastro de produto via API.
- `cypress/e2e/api/api_excluir_dados.cy.js` — exclusão em massa de usuários e produtos por nome.

### GUI
- `cypress/e2e/gui/gui_cadastrar_usuario.cy.js` — cadastro de usuário pela interface.
- `cypress/e2e/gui/gui_cadastrar_produto.cy.js` — cadastro de produto pela interface.
- `cypress/e2e/gui/gui_excluir_dados.cy.js` — exclusão pela interface.

## GitHub Actions
O workflow está em `.github/workflows/ci.yml` e roda em:
- `push` para a branch `main`
- `pull_request` para a branch `main`

Ele executa:
- checkout do repositório
- configuração do Node.js 18
- instalação de dependências
- execução dos testes com `npm run cypress`

## Como executar testes localmente
Executar toda a suite:
```bash
npm run cypress
```

Executar um teste específico:
```bash
npx cypress run --spec "cypress/e2e/api/api_cadastrar_produto.cy.js"
```

Abrir o runner:
```bash
npx cypress open
```
