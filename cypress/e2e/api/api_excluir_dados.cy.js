describe('Excluir via API — produtos e usuários', () => {
    it("Deve deletar todos os usuários cujo nome contenha 'alice'", () => {
        cy.apiLogin().then((loginResponse) => {
            const token = loginResponse.body.authorization;

            cy.apiDeletarUsuarioPeloNome('alice', token).then((results) => {
            });
        });
    });

    it("Deve deletar todos os produtos cujo nome contenha 'dell'", () => {
        cy.apiLogin().then((loginResponse) => {
            const token = loginResponse.body.authorization;

            cy.apiDeletarProdutoPeloNome('dell', token).then((results) => {
                cy.log(`Produtos deletados: ${results.length}`);
            });
        });
    });
});
