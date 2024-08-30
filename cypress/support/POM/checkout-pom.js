class Checkout {
  infoPageUrl() {
    cy.url().should("include", data.urls.checkoutInformationPageUrl);
  }

  firstName() {
    cy.firstNameTextbox().type(data.testData.firstName);
  }

  lastName() {
    cy.lastNameTextbox().type(data.testData.lastName);
  }

  postalCode() {
    cy.postalCodeTextbox().type(data.testData.postalCode);
  }

  continue() {
    cy.continueButton();
  }

  checkoutInformationErrorLabel(message) {
    cy.checkoutInformationErrorLabel().should("contains.text", message);
  }

  finish() {
    cy.finishButton();
    cy.url().should("include", data.urls.checkoutCompletePageUrl);
    cy.checkoutSuccessLabel().should(
      "contains.text",
      data.messages.checkoutSuccessMessage
    );
  }

  checkProductDetailsAndContinue() {
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
  }
}
export default Checkout;
