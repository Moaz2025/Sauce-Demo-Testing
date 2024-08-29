Cypress.Commands.add("userNameTextbox", () => {
  cy.get(data.textboxes.userNameTextbox);
});

Cypress.Commands.add("passwordTextbox", () => {
  cy.get(data.textboxes.passwordTextbox);
});

Cypress.Commands.add("loginButton", () => {
  cy.get(data.buttons.loginButton).click();
});

Cypress.Commands.add("loginErrorLabel", () => {
  cy.get(data.labels.loginErrorLabel);
});
