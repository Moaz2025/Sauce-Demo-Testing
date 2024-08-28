Cypress.Commands.add("userName", () => {
  cy.get(data.textboxes.userNameTextbox);
});

Cypress.Commands.add("password", () => {
  cy.get(data.textboxes.passwordTextBox);
});

Cypress.Commands.add("loginButton", () => {
  cy.get(data.buttons.loginButton).click();
});

Cypress.Commands.add("loginErrorLabel", () => {
  cy.get(data.labels.loginErrorLabel);
});
