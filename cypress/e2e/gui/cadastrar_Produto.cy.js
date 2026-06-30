describe('Cadastro de produtos via graphical user interface', () => {
  it('Deve realizar um novo cadastro de produto', () => {
    cy.login();
    cy.cadastrarProduto();
  }); 
})