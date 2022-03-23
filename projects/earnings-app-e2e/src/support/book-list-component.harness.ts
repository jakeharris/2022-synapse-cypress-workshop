export default true;

export const getBook = (id: string) => cy.get(`[data-test-id="book-${id}"`);
