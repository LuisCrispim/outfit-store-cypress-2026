describe('Logout', ()=> {
    it('Deve fazer logout com sucesso', () => {
        const usuario = Cypress.env('usuario');
        cy.login();

        cy.logout();
    
    });

});





