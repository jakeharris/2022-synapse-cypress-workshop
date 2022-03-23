import { BookModel, BookRequiredProps } from '@book-co/shared-models';
import * as uuid from 'uuid';
import * as BooksApi from '../support/books.api';
import * as AuthApi from '../support/auth.api';
import * as BookListComponent from '../support/book-list-component.harness';
import * as BookFormComponent from '../support/book-form-component.harness';
import * as BooksPage from '../support/books-page.harness';

function setup(options?: { throwErrorWhenLoadingBooks?: boolean }) {
  const book = {
    id: uuid.v4(),
    name: 'The Lord of the Rings',
    earnings: '100',
    description:
      'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien.',
  };

  BooksApi.deleteAllBooks();
  BooksApi.createBook(book);

  AuthApi.login('Admin', 'password');

  if (options?.throwErrorWhenLoadingBooks) {
    cy.intercept('GET', 'http://localhost:3000/books', {
      statusCode: 500,
    }).as('getBooks');
  } else {
    cy.intercept('GET', 'http://localhost:3000/books').as('getBooks');
  }

  cy.intercept('POST', 'http://localhost:3000/books').as('createBook');
  cy.intercept('PATCH', 'http://localhost:3000/books/*').as('updateBook');

  cy.visit('/');
  cy.wait('@getBooks');

  return book;
}
describe('Books Page', () => {
  it('should show a list all of the books', () => {
    const book = setup();

    BookListComponent.getBook(book.id).contains(book.name);
  });

  it('should gracefully show an error message when loading the books fails', () => {
    setup({ throwErrorWhenLoadingBooks: true });

    BooksPage.getError().should('contain', 'Error');
  });

  it('should let you create a book', () => {
    const book = setup();

    BookFormComponent.fillForm({
      name: 'Gotta Go Fast: A Memoir',
      earnings: '420069',
      description:
        "From collecting rings to putting a ring on it -- this compelling memoir details one of the world's pluckiest heroes and his fascinating ride through stardom.",
    });
    BookFormComponent.saveForm();
    cy.wait('@createBook');

    BooksApi.getBooks()
      .its('body')
      .should(
        (books) =>
          expect(books.some((createdBook) => createdBook.name === book.name)).to
            .exist
      );
  });

  it('should let you edit a book', () => {
    const book = setup();
    const newBookDetails = {
      name: 'Anything Else',
      earnings: '471',
      description:
        "A desperate plea that we could stop seeing weird, Sonic-related test data in Jake's tests.",
    };

    BookListComponent.clickEditButtonOnBook(book.id);
    BookFormComponent.fillForm(newBookDetails);
    BookFormComponent.saveForm();
    cy.wait('@updateBook');

    BooksApi.getBook(book.id)
      .its('body')
      .should('deep.include', newBookDetails);
  });

  // it('should let you delete a book', () => {});
});
