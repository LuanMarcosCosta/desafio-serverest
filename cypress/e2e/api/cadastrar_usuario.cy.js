describe('Cadastro de usuários via API', () => {
    it('deve cadastrar um usuário novo com dados do cypress.env', () => {
        cy.apiCadastrarUsuario().then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
            expect(response.body).to.have.property('_id');
        });
    });
});
