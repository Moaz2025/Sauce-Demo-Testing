describe("", () => {
  before(() => {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
    cy.userName().type(data.testData.userName);
    cy.password().type(data.testData.password);
    cy.loginButton();
    cy.url().should("include", data.urls.inventoryPageUrl);
    cy.productLabel().should("contains.text", data.labels.productLabelText);
  });

  it("Check that the user can't checkout with an empty cart", () => {
    cy.cartButton();
    cy.checkoutButton();
  });

  it("Check that the user can't checkout with empty personal details", () => {
    cy.addToCartButton().first().click();
    cy.cartButton();
    cy.checkoutButton();
    cy.url().should("include", data.urls.checkoutPageUrl);
    cy.continueButton();
    cy.checkoutInformationErrorLabel().should(
      "contains.text",
      data.messages.missingFirstNameMessage
    );
  });

  it("Check that the user can't checkout with an empty first name field", () => {
    cy.addToCartButton().first().click();
    cy.cartButton();
    cy.checkoutButton();
    cy.url().should("include", data.urls.checkoutPageUrl);
    cy.lastNameTextbox().type(data.testData.lastName);
    cy.postalCodeTextbox().type(data.testData.postalCode);
    cy.continueButton();
    cy.checkoutInformationErrorLabel().should(
      "contains.text",
      data.messages.missingFirstNameMessage
    );
  });

  it("Check that the user can't checkout with an empty last name field", () => {
    cy.addToCartButton().first().click();
    cy.cartButton();
    cy.checkoutButton();
    cy.url().should("include", data.urls.checkoutPageUrl);
    cy.firstNameTextbox().type(data.testData.firstName);
    cy.postalCodeTextbox().type(data.testData.postalCode);
    cy.continueButton();
    cy.checkoutInformationErrorLabel().should(
      "contains.text",
      data.messages.missingLastNameMessage
    );
  });

  it("Check that the user can't checkout with an empty zip/postal code field", () => {
    cy.addToCartButton().first().click();
    cy.cartButton();
    cy.checkoutButton();
    cy.url().should("include", data.urls.checkoutPageUrl);
    cy.firstNameTextbox().type(data.testData.firstName);
    cy.lastNameTextbox().type(data.testData.lastName);
    cy.continueButton();
    cy.checkoutInformationErrorLabel().should(
      "contains.text",
      data.messages.missingPostalCodeMessage
    );
  });
});
