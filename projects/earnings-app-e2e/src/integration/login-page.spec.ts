describe('Login Page', () => {
  it('should display', () => {
    cy.visit('/');

    cy.get('h3').contains('Login');
  });

  it('should display the login form', () => {
    cy.visit('/');

    cy.get('form').should('be.visible');
  });

  it('should display the login form inputs', () => {
    cy.visit('/');

    cy.get('form').within(() => {
      cy.get('input[formcontrolname="username"]').should('be.visible');
      cy.get('input[formcontrolname="password"]').should('be.visible');
    });
  });
});
