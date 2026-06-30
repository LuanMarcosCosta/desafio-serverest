describe('Cadastro de produtos via API', () => {
    it('deve cadastrar produto usando token de login', () => {
        cy.apiLogin().then((loginResponse) => {
            const token = loginResponse.body.authorization;
            expect(token).to.match(/^Bearer\s+/);

            cy.apiCadastrarProduto(token).then((response) => {
                expect(response.status).to.equal(201);
                expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
                expect(response.body).to.have.property('_id');
            });
        });
    });
});