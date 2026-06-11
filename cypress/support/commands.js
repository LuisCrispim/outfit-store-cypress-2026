Cypress.Commands.add('login', (
  email = Cypress.env('email'),
  senha = Cypress.env('senha'),
  usuario = Cypress.env('usuario')
) => {

    cy.visit('/');

    cy.contains('Entrar').click();


    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(senha);

    cy.get('button[type="submit"]').click();

    cy.contains(usuario).should('be.visible');

});

Cypress.Commands.add('loginSession', (
  email = Cypress.env('email'),
  senha = Cypress.env('senha'),
  usuario = Cypress.env('usuario')
) => {

  cy.session([email], () => {
    cy.visit('/');

    cy.contains('Entrar').click();

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(senha);

    cy.get('button[type="submit"]').click();

    cy.contains(usuario).should('be.visible');
  });

  cy.visit('/'); 
});

Cypress.Commands.add('logout', ()=> {
    const usuario = Cypress.env('usuario');

    cy.contains(usuario).click();
    cy.get('a[href="/#"]').should('contain.text', 'Sair').click();

    cy.url().should('eq',`${Cypress.config('baseUrl')}/login`);

});


    