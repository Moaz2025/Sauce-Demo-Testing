Cypress.Commands.add("productLabel", () => {
  cy.get(data.labels.productLabel);
});

Cypress.Commands.add("menuButton", () => {
  cy.get(data.buttons.menuButton).click();
});

Cypress.Commands.add("logoutButton", () => {
  cy.get(data.buttons.logoutButton).click();
});

Cypress.Commands.add("filterSelector", () => {
  cy.get(data.selectors.filterSelector);
});

Cypress.Commands.add("productsList", () => {
  cy.get(data.selectors.productsList);
});

Cypress.Commands.add("product", () => {
  cy.get(data.selectors.product);
});

Cypress.Commands.add("productName", () => {
  cy.get(data.selectors.productName);
});

Cypress.Commands.add("productPrice", () => {
  cy.get(data.selectors.productPrice);
});

Cypress.Commands.add("productDescription", () => {
  cy.get(data.selectors.productDescription);
});

Cypress.Commands.add("productButton", () => {
  cy.get(data.buttons.productButton);
});

Cypress.Commands.add("addToCartButton", () => {
  cy.get(data.buttons.addToCartButton);
});

Cypress.Commands.add("cartButton", () => {
  cy.get(data.buttons.cartButton).click();
});

Cypress.Commands.add("removeProductButton", () => {
  cy.get(data.buttons.removeProductButton).click();
});
