describe('Cadastro de usuários via API', () => {
    it('deve cadastrar um usuário', () => {
        cy.apiCadastrarUsuario();
    });
});
