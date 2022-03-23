import { BookModel, BookRequiredProps } from '@book-co/shared-models';

const getForm = () => cy.get('bco-book-detail');
const getNameInput = () => getForm().find('[data-test-id="nameInput"]');
const getEarningsInput = () => getForm().find('[data-test-id="earningsInput"]');
const getDescriptionInput = () =>
  getForm().find('[data-test-id="descriptionInput"]');
const getSaveButton = () => getForm().find('[data-test-id="saveButton"]');

export const fillForm = ({
  name,
  earnings,
  description,
}: {
  name: string;
  earnings: string;
  description: string;
}) => {
  getNameInput().clear().type(name);
  getEarningsInput().clear().type(earnings);
  getDescriptionInput().clear().type(description);
};

export const saveForm = () => {
  getSaveButton().click();
};
