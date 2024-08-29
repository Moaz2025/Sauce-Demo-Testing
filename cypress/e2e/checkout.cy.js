describe("", () => {
  before(() => {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
    cy.userNameTextbox().type(data.testData.userName);
    cy.passwordTextbox().type(data.testData.password);
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
    cy.url().should("include", data.urls.checkoutInformationPageUrl);
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
    cy.url().should("include", data.urls.checkoutInformationPageUrl);
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
    cy.url().should("include", data.urls.checkoutInformationPageUrl);
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
    cy.url().should("include", data.urls.checkoutInformationPageUrl);
    cy.firstNameTextbox().type(data.testData.firstName);
    cy.lastNameTextbox().type(data.testData.lastName);
    cy.continueButton();
    cy.checkoutInformationErrorLabel().should(
      "contains.text",
      data.messages.missingPostalCodeMessage
    );
  });

  it.only("Check that the products, their quantities, and their prices at the checkout overview page match with the cart", () => {
    cy.addToCartButton().first().click();
    cy.cartButton();
    let firstproductNameAtCart,
      firstproductPriceAtCart,
      firstproductDescriptionAtCart;
    cy.productName()
      .invoke("text")
      .then((text) => {
        firstproductNameAtCart = text.trim();
      });
    cy.productPrice()
      .invoke("text")
      .then((text) => {
        firstproductPriceAtCart = parseFloat(text.replace("$", "").trim());
      });
    cy.productDescription()
      .invoke("text")
      .then((text) => {
        firstproductDescriptionAtCart = text.trim();
      });
    cy.checkoutButton();
    cy.url().should("include", data.urls.checkoutInformationPageUrl);
    cy.firstNameTextbox().type(data.testData.firstName);
    cy.lastNameTextbox().type(data.testData.lastName);
    cy.postalCodeTextbox().type(data.testData.postalCode);
    cy.continueButton();
    cy.url().should("include", data.urls.checkoutOverviewPageUrl);
    let firstProductNameAtOverview,
      firstProductPriceAtOverview,
      firstProductDescriptionAtOverview;
    cy.productName()
      .invoke("text")
      .then((text) => {
        firstProductNameAtOverview = text.trim();
        expect(firstProductNameAtOverview).to.be.eq(firstproductNameAtCart);
      });
    cy.productPrice()
      .invoke("text")
      .then((text) => {
        firstProductPriceAtOverview = parseFloat(text.replace("$", "").trim());
        expect(firstProductPriceAtOverview).to.be.eq(firstproductPriceAtCart);
      });
    cy.productDescription()
      .invoke("text")
      .then((text) => {
        firstProductDescriptionAtOverview = text.trim();
        expect(firstProductDescriptionAtOverview).to.be.eq(
          firstproductDescriptionAtCart
        );
      });
    cy.finishButton();
    cy.url().should("include", data.urls.checkoutCompletePageUrl);
    cy.checkoutSuccessLabel().should(
      "contains.text",
      data.messages.checkoutSuccessMessage
    );
  });
});
