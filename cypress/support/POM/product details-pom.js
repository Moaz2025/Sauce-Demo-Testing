class ProductDetails {
  checkProductDetails() {
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
  }

  ProductDetailsPage() {
    cy.productButton().first().click();
    cy.url().should("include", data.urls.productUrl);
  }
}
export default ProductDetails;
