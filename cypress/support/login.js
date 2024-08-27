Cypress.Commands.add("userName", () => {
  cy.get("#user-name");
});

Cypress.Commands.add("password", () => {
  cy.get("#password");
});

Cypress.Commands.add("loginButton", () => {
  cy.get("#login-button").click();
});

Cypress.Commands.add("loginErrorLabel", () => {
  cy.get('[data-test="error"]');
});

Cypress.Commands.add("productLabel", () => {
  cy.get(".product_label");
});
