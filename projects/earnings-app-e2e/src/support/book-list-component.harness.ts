export const getBook = (id: string) => cy.get(`[data-test-id="book-${id}"`);
export const getEditBookButton = (id: string) =>
  getBook(id).find('[data-test-id="bookEditButton"]');
export const clickEditButtonOnBook = (id: string) =>
  getEditBookButton(id).click();
export const getDeleteBookButton = (id: string) =>
  getBook(id).find('[data-test-id="bookDeleteButton"]');
export const clickDeleteButtonOnBook = (id: string) =>
  getDeleteBookButton(id).click();
