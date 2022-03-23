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

  it('should have two login form inputs', () => {
    cy.visit('/');

    cy.get('form').find('input').should('have.length', 2);
  });

  it('should display the login form inputs (which we find via data-test-id)', () => {
    cy.visit('/');

    cy.get('form').within(() => {
      cy.get('input[data-test-id="usernameInput"]').should('be.visible');
      cy.get('input[data-test-id="passwordInput"]').should('be.visible');
    });
  });

  it('should log the user in when providing valid credentials', () => {
    const username = 'Admin';
    const password = 'password';
    cy.visit('/');

    cy.get('bco-login-form').within(() => {
      cy.get('[data-test-id="usernameInput"]').type(username);
      cy.get('[data-test-id="passwordInput"]').type(password);
      cy.get('[data-test-id="loginButton"]').click();
    });
  });

  it('should log the user in when providing valid credentials, but debug before the click', () => {
    const username = 'Admin';
    const password = 'password';
    cy.visit('/');

    cy.get('bco-login-form').within(() => {
      cy.get('[data-test-id="usernameInput"]').type(username);
      cy.get('[data-test-id="passwordInput"]').type(password);
      cy.get('[data-test-id="loginButton"]').debug().click();
    });
  });
});
