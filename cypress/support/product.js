Cypress.Commands.add("productNameAtDetailsPage", () => {
  cy.get(data.selectors.productNameAtDetailsPage);
});

Cypress.Commands.add("productPriceAtDetailsPage", () => {
  cy.get(data.selectors.productPriceAtDetailsPage);
});

Cypress.Commands.add("productDescriptionAtDetailsPage", () => {
  cy.get(data.selectors.productDescriptionAtDetailsPage);
});

Cypress.Commands.add("continueShoppingButton", () => {
  cy.get(data.buttons.continueShoppingButton).click();
});

Cypress.Commands.add("checkoutButton", () => {
  cy.get(data.buttons.checkoutButton).click();
});
