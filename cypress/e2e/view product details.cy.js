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

  it("Check that the product title, description, and price match with the card on the products page", () => {
    let firstProductName, firstProductPrice, firstProductDescription;
    let firstproductNameAtDetailsPage,
      firstproductPriceAtDetailsPage,
      firstproductDescriptionAtDetailsPage;
    cy.productName()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductName = text.trim();
      });
    cy.productPrice()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductPrice = parseFloat(text.replace("$", "").trim());
      });
    cy.productDescription()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductDescription = text.trim();
      });
    cy.productButton().first().click();
    cy.url().should("include", data.urls.productUrl);
    cy.productNameAtDetailsPage()
      .invoke("text")
      .then((text) => {
        firstproductNameAtDetailsPage = text.trim();
        expect(firstProductName).to.be.eq(firstproductNameAtDetailsPage);
      });
    cy.productPriceAtDetailsPage()
      .invoke("text")
      .then((text) => {
        firstproductPriceAtDetailsPage = parseFloat(
          text.replace("$", "").trim()
        );
        expect(firstProductPrice).to.be.eq(firstproductPriceAtDetailsPage);
      });
    cy.productDescriptionAtDetailsPage()
      .invoke("text")
      .then((text) => {
        firstproductDescriptionAtDetailsPage = text.trim();
        expect(firstProductDescription).to.be.eq(
          firstproductDescriptionAtDetailsPage
        );
      });
  });

  it("Check that the back button at the product details page is working properly", () => {
    cy.productButton().first().click();
    cy.url().should("include", data.urls.productUrl);
    cy.go("back");
    cy.url().should("include", data.urls.inventoryPageUrl);
    cy.productLabel().should("contains.text", data.labels.productLabelText);
  });
});
