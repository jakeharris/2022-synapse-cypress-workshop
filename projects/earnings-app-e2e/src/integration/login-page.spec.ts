describe('Login Page', () => {
  it('should display', () => {
    cy.visit('/');

    cy.get('h3').contains('Login');
  });

  it('should display the login form', () => {
    cy.visit('/');

    cy.get('form').should('be.visible');
  });
});
