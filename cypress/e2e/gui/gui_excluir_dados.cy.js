describe('Excluir via graphical user interface — produtos e usuários', () => {
    it("Deve deletar todos os produtos cujo nome contenha 'dell'", () => {
        cy.deletarProdutosPeloNome();
    });

    it("Deve deletar todos os usuários cujo nome contenha 'alice'", () => {
        cy.deletarUsuariosPeloNome();
    });
});
