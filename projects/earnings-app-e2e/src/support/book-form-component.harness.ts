import { BookModel, BookRequiredProps } from '@book-co/shared-models';

const getForm = () => cy.get('bco-book-detail');
const getNameInput = () => getForm().find('[data-test-id="nameInput"]');
const getEarningsInput = () => getForm().find('[data-test-id="earningsInput"]');
const getDescriptionInput = () =>
  getForm().find('[data-test-id="descriptionInput"]');
const getSaveButton = () => getForm().find('[data-test-id="saveButton"]');

export const fillForm = (
  name: string,
  earnings: string,
  description: string
) => {
  getNameInput().type(name);
  getEarningsInput().type(earnings);
  getDescriptionInput().type(description);
};

export const saveForm = () => {
  getSaveButton().click();
};
