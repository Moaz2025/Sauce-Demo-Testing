Cypress.Commands.add("checkoutButton", () => {
  cy.get(data.buttons.checkoutButton).click();
});

Cypress.Commands.add("continueButton", () => {
  cy.get(data.buttons.continueButton).click();
});

Cypress.Commands.add("checkoutInformationErrorLabel", () => {
  cy.get(data.labels.checkoutInformationErrorLabel);
});

Cypress.Commands.add("firstNameTextbox", () => {
  cy.get(data.textboxes.firstNameTextbox);
});

Cypress.Commands.add("lastNameTextbox", () => {
  cy.get(data.textboxes.lastNameTextbox);
});

Cypress.Commands.add("postalCodeTextbox", () => {
  cy.get(data.textboxes.postalCodeTextbox);
});

Cypress.Commands.add("finishButton", () => {
  cy.get(data.buttons.finishButton).click();
});

Cypress.Commands.add("checkoutSuccessLabel", () => {
  cy.get(data.labels.checkoutSuccessLabel);
});
