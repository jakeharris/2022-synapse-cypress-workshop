export const getBooksPage = () => cy.get('bco-books-page');
export const getError = () => getBooksPage().find('[data-test-id="error"]');
