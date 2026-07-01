describe('Cadastro de usuários via graphical user interface', () => {
  it('Deve realizar um novo cadastro de usuário', () => {
    cy.login();
    cy.cadastrarUsuario();
  });
})