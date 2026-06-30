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
            "nome": 'Fulano Teste - API Cypress',
            "email": 'fulano_cypress@qa.com.br',
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
            "nome": 'Bordado Superior - API Cypress',
            "preco": 199,
            "descricao": 'Produto cadastrado via API Cypress',
            "quantidade": 2,
        }
    }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        Cypress.env('produtoId', response.body._id);
        return response;
    });
});

