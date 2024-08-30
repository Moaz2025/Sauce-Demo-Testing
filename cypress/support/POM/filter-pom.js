class Filter {
  filterSelect(filter) {
    cy.filterSelector().select(filter);
  }

  checkNameFilter(value) {
    let firstProductName, lastProductName;
    cy.productName()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductName = text.trim();
      })
      .then(() => {
        cy.productName()
          .last()
          .invoke("text")
          .then((text) => {
            lastProductName = text.trim();
            expect(firstProductName.localeCompare(lastProductName)).to.equal(
              value
            );
          });
      });
  }

  checkPriceFilter(value) {
    let firstProductPrice, lastProductPrice;
    cy.productPrice()
      .first()
      .invoke("text")
      .then((text) => {
        firstProductPrice = parseFloat(text.replace("$", "").trim());
      })
      .then(() => {
        cy.productPrice()
          .last()
          .invoke("text")
          .then((text) => {
            lastProductPrice = parseFloat(text.replace("$", "").trim());
            if (value == -1) {
              expect(firstProductPrice).to.be.lessThan(lastProductPrice);
            } else if (value == 1) {
              expect(firstProductPrice).to.be.greaterThan(lastProductPrice);
            }
          });
      });
  }
}
export default Filter;
