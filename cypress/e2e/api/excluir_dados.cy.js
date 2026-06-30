describe('Excluir dados pelo nome via API', () => {
    it("remove todos os usuários cujo nome contenha 'alice'", () => {
        cy.apiLogin().then((loginResponse) => {
            const token = loginResponse.body.authorization;
            expect(token).to.match(/^Bearer\s+/);

            cy.apiDeletarPeloNome('alice', token).then((results) => {
                expect(results).to.be.an('array');
                cy.log(`Usuários deletados: ${results.length}`);

                if (results.length > 0) {
                    results.forEach((res) => {
                        expect([200, 204]).to.include(res.status);
                    });
                }
            });
        });
    });

    it("remove todos os produtos cujo nome contenha 'dell'", () => {
        cy.apiLogin().then((loginResponse) => {
            const token = loginResponse.body.authorization;
            expect(token).to.match(/^Bearer\s+/);

            cy.apiDeletarProdutoPeloNome('dell', token).then((results) => {
                expect(results).to.be.an('array');
                cy.log(`Produtos deletados: ${results.length}`);

                if (results.length > 0) {
                    results.forEach((res) => {
                        expect([200, 204]).to.include(res.status);
                    });
                }
            });
        });
    });
});
