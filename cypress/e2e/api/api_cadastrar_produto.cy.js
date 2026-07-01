describe('Cadastro de produtos via API', () => {
    it('deve cadastrar produto usando token de login', () => {
        cy.apiLogin().then((loginResponse) => {
            const token = loginResponse.body.authorization;

            cy.apiCadastrarProduto(token);
        });
    });
});