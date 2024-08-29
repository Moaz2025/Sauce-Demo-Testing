describe("filter", () => {
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

  it('Check that the "Name (A to Z)" filter sorts the products from A to Z', () => {
    cy.filterSelector().select(data.testData.nameAZ);
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
              -1
            );
          });
      });
  });

  it('Check that the "Name (Z to A)" filter sorts the products from Z to A', () => {
    cy.filterSelector().select(data.testData.nameZA);
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
            expect(firstProductName.localeCompare(lastProductName)).to.equal(1);
          });
      });
  });

  it('Check that the "Price (low to high)" filter sorts the products from the lowest price to the highest price', () => {
    cy.filterSelector().select(data.testData.priceLowToHigh);
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
            expect(firstProductPrice).to.be.lessThan(lastProductPrice);
          });
      });
  });

  it('Check that the "Price (high to low)" filter sorts the products from the highest price to the lowest price', () => {
    cy.filterSelector().select(data.testData.priceHighToLow);
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
            expect(firstProductPrice).to.be.greaterThan(lastProductPrice);
          });
      });
  });
});
