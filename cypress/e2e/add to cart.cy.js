describe("add to cart", () => {
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

  it("Check that the user can add a product to the cart", () => {
    let firstProductName, firstProductPrice, firstProductDescription;
    let firstproductNameAtCart,
      firstproductPriceAtCart,
      firstproductDescriptionAtCart;
    cy.productsList()
      .product()
      .first()
      .productName()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductName = text.trim();
      });
    cy.productsList()
      .product()
      .first()
      .productPrice()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductPrice = parseFloat(text.replace("$", "").trim());
      });
    cy.productsList()
      .product()
      .first()
      .productDescription()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductDescription = text.trim();
      });
    cy.addToCartButton().first().click();
    cy.cartButton();
    cy.productName()
      .invoke("text")
      .then((text) => {
        firstproductNameAtCart = text.trim();
        expect(firstProductName).to.be.eq(firstproductNameAtCart);
      });
    cy.productPrice()
      .invoke("text")
      .then((text) => {
        firstproductPriceAtCart = parseFloat(text.replace("$", "").trim());
        expect(firstProductPrice).to.be.eq(firstproductPriceAtCart);
      });
    cy.productDescription()
      .invoke("text")
      .then((text) => {
        firstproductDescriptionAtCart = text.trim();
        expect(firstProductDescription).to.be.eq(firstproductDescriptionAtCart);
      });
  });

  it("Check that the user can add a product to the cart (from product details page)", () => {
    let firstProductName, firstProductPrice, firstProductDescription;
    let firstproductNameAtCart,
      firstproductPriceAtCart,
      firstproductDescriptionAtCart;
    cy.productsList()
      .product()
      .first()
      .productName()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductName = text.trim();
      });
    cy.productsList()
      .product()
      .first()
      .productPrice()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductPrice = parseFloat(text.replace("$", "").trim());
      });
    cy.productsList()
      .product()
      .first()
      .productDescription()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductDescription = text.trim();
      });
    cy.productButton().first().click();
    cy.url().should("include", data.urls.productUrl);
    cy.addToCartButton().first().click();
    cy.cartButton();
    cy.productName()
      .invoke("text")
      .then((text) => {
        firstproductNameAtCart = text.trim();
        expect(firstProductName).to.be.eq(firstproductNameAtCart);
      });
    cy.productPrice()
      .invoke("text")
      .then((text) => {
        firstproductPriceAtCart = parseFloat(text.replace("$", "").trim());
        expect(firstProductPrice).to.be.eq(firstproductPriceAtCart);
      });
    cy.productDescription()
      .invoke("text")
      .then((text) => {
        firstproductDescriptionAtCart = text.trim();
        expect(firstProductDescription).to.be.eq(firstproductDescriptionAtCart);
      });
  });

  it("Check that the user can remove a product from the cart", () => {
    let firstProductName, firstProductPrice, firstProductDescription;
    let firstproductNameAtCart,
      firstproductPriceAtCart,
      firstproductDescriptionAtCart;
    cy.productsList()
      .product()
      .first()
      .productName()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductName = text.trim();
      });
    cy.productsList()
      .product()
      .first()
      .productPrice()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductPrice = parseFloat(text.replace("$", "").trim());
      });
    cy.productsList()
      .product()
      .first()
      .productDescription()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductDescription = text.trim();
      });
    cy.addToCartButton().first().click();
    cy.cartButton();
    cy.productName()
      .invoke("text")
      .then((text) => {
        firstproductNameAtCart = text.trim();
        expect(firstProductName).to.be.eq(firstproductNameAtCart);
      });
    cy.productPrice()
      .invoke("text")
      .then((text) => {
        firstproductPriceAtCart = parseFloat(text.replace("$", "").trim());
        expect(firstProductPrice).to.be.eq(firstproductPriceAtCart);
      });
    cy.productDescription()
      .invoke("text")
      .then((text) => {
        firstproductDescriptionAtCart = text.trim();
        expect(firstProductDescription).to.be.eq(firstproductDescriptionAtCart);
      });
    cy.removeProductButton();
  });

  it("Check that the continue shopping button at the cart is working properly", () => {
    cy.cartButton();
    cy.continueShoppingButton();
    cy.url().should("include", data.urls.inventoryPageUrl);
    cy.productLabel().should("contains.text", data.labels.productLabelText);
  });
});
