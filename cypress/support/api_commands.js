/// <reference types="cypress" />

Cypress.Commands.add('apiLogin', () => {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: {
            email: Cypress.env('user_email'),
            password: Cypress.env('user_password'),
        },
    }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('authorization');
        return response;
    });
});

Cypress.Commands.add('apiCadastrarUsuario', (user) => {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: {
            "nome": 'Alice schrödinger Stark',
            "email": 'alice_ss_api@avengers.com.br',
            "password": 'teste',
            "administrador": 'true'
        }
    }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        return response;
    });
});

Cypress.Commands.add('apiCadastrarProduto', (token) => {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: {
            "nome": 'Notebook Dell XPS 13',
            "preco": 1999,
            "descricao": 'Produto cadastrado via API Cypress',
            "quantidade": 7,
        }
    }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        Cypress.env('produtoId', response.body._id);
        return response;
    });
});

Cypress.Commands.add('apiDeletarUsuario', (userId, token) => {
    return cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${userId}`,
        headers: {
            accept: 'application/json',
            Authorization: token,
        },
        failOnStatusCode: false,
    }).then((response) => {
        expect([200, 204]).to.include(response.status);
        return response;
    });
});

Cypress.Commands.add('apiDeletarPeloNome', (userName, token) => {
    return cy.request({
        method: 'GET',
        url: `https://serverest.dev/usuarios?nome=${encodeURIComponent(userName)}`,
        headers: {
            accept: 'application/json',
        },
    }).then((response) => {
        expect(response.status).to.equal(200);
        const users = response.body.usuarios || [];
        if (users.length === 0) {
            return [];
        }

        const results = [];
        return cy.wrap(users).each((u) => {
            cy.apiDeletarUsuario(u._id, token).then((res) => {
                results.push(res);
            });
        }).then(() => results);
    });
});

Cypress.Commands.add('apiDeletarProduto', (productId, token) => {
    return cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/produtos/${productId}`,
        headers: {
            accept: 'application/json',
            Authorization: token,
        },
        failOnStatusCode: false,
    }).then((response) => {
        expect([200, 204]).to.include(response.status);
        return response;
    });
});

Cypress.Commands.add('apiDeletarProdutoPeloNome', (productName, token) => {
    return cy.request({
        method: 'GET',
        url: `https://serverest.dev/produtos?nome=${encodeURIComponent(productName)}`,
        headers: {
            accept: 'application/json',
        },
    }).then((response) => {
        expect(response.status).to.equal(200);
        const products = response.body.produtos || [];
        if (products.length === 0) {
            return [];
        }

        const results = [];
        return cy.wrap(products).each((p) => {
            cy.apiDeletarProduto(p._id, token).then((res) => {
                results.push(res);
            });
        }).then(() => results);
    });
});

