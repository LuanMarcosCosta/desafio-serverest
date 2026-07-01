/// <reference types="cypress" />

Cypress.Commands.add('login', (
  user = Cypress.env('user_email'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  cy.visit('/')
  cy.contains('h1', 'Login')

  cy.get("[data-testid='email']").type(user)
  cy.get("[data-testid='senha']").type(password, { log: false })
  cy.get('[data-testid="entrar"]').click()

  cy.contains('h1', 'Bem Vindo Fulano da Silva')
});

Cypress.Commands.add('cadastrarUsuario', () => {

  cy.get('[data-testid="cadastrarUsuarios"]').click()
  cy.contains('h1', 'Cadastro de usuários')

  cy.get('[data-testid="nome"]').type('Alice schrödinger Stark')
  cy.get('[data-testid="email"]').type(`alice_ss_${Date.now()}@avengers.com.br`)
  cy.get('[data-testid="password"]').type('@V3ng3rs')
  cy.get('[data-testid="cadastrarUsuario"]').click()

  cy.contains('h1', 'Lista dos usuários')
});

Cypress.Commands.add('cadastrarProduto', () => {

  cy.get('[data-testid="cadastrarProdutos"]').click()
  cy.contains('h1', 'Cadastro de Produtos')

  cy.get('[data-testid="nome"]').type(`Notebook Dell XPS ${Date.now()}`)
  cy.get('[data-testid="preco"]').type('3999')
  cy.get('[data-testid="descricao"]').type('Produto de teste para o desafio da Empresa xyz')
  cy.get('[data-testid="quantity"]').type('10')
  cy.get('[data-testid="imagem"]').attachFile('Bordado_Passaro.jpeg')

  cy.get('[data-testid="cadastarProdutos"]').click()

  cy.contains('h1', 'Lista dos Produtos')
});

function deletarRegistrosPeloNome(path, matcher) {
  cy.get('[data-testid="listarProdutos"]').click()

  cy.on('window:confirm', () => true);

  function deleteNext() {
    return cy.get('table tbody tr').then(($rows) => {
      let foundRow = null;
      $rows.each((i, row) => {
        if (matcher(row.innerText)) {
          foundRow = row;
          return false;
        }
      });

      if (!foundRow) {
        return cy.wrap([]);
      }

      return cy.wrap(foundRow).within(() => {
        cy.contains('Excluir').click({ force: true });
      }).then(() => {
        cy.wait(500);
        return deleteNext();
      });
    });
  }

  return deleteNext();
}

beforeEach(() => {
  cy.login();
});

Cypress.Commands.add('deletarProdutosPeloNome', () => {
  const productsPath = 'admin/listarprodutos';
  deletarRegistrosPeloNome(productsPath, (text) => /dell/i.test(text)).then(() => {
    cy.log('Finalizado: exclusão de produtos contendo "dell"');
  });
});

Cypress.Commands.add('deletarUsuariosPeloNome', () => {
  const usersPath = '/admin/listarusuarios';
  deletarRegistrosPeloNome(usersPath, (text) => /alice/i.test(text)).then(() => {
    cy.log('Finalizado: exclusão de usuários contendo "alice"');
  });
});