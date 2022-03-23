describe('Login Page', () => {
  it('should display', () => {
    cy.visit('/');

    cy.get('h3').contains('Login');
  });
});
