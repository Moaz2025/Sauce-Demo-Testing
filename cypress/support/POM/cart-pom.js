class Cart {
  viewCart() {
    cy.cartButton();
  }

  checkout() {
    cy.checkoutButton();
  }

  continueShopping() {
    cy.continueShoppingButton();
  }

  addToCartAndCheckDetails(value) {
    let firstProductName, firstProductPrice, firstProductDescription;
    let firstproductNameAtCart,
      firstproductPriceAtCart,
      firstproductDescriptionAtCart;
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
    if (value == 2) {
      cy.productButton().first().click();
      cy.url().should("include", data.urls.productUrl);
    }
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
  }

  addToCart() {
    cy.addToCartButton().first().click();
  }
}
export default Cart;
