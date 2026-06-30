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
  cy.get('[data-testid="email"]').type('alice_ss_@avengers.com.br')
  cy.get('[data-testid="password"]').type('@V3ng3rs')
  cy.get('[data-testid="cadastrarUsuario"]').click()

  cy.contains('h1', 'Lista dos usuários')
});

Cypress.Commands.add('cadastrarProduto', () => {

  cy.get('[data-testid="cadastrarProdutos"]').click()
  cy.contains('h1', 'Cadastro de Produtos')

  cy.get('[data-testid="nome"]').type('Notebook Dell XPS 14')
  cy.get('[data-testid="preco"]').type('3999')
  cy.get('[data-testid="descricao"]').type('Produto de teste para o desafio da Empresa xyz')
  cy.get('[data-testid="quantity"]').type('10')
  cy.get('[data-testid="imagem"]').attachFile('Bordado_Passaro.jpeg')

  cy.get('[data-testid="cadastarProdutos"]').click()

  cy.contains('h1', 'Lista dos Produtos')
});