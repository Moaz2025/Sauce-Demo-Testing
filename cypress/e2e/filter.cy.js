import Login from "../support/POM/login-pom";
import Filter from "../support/POM/filter-pom";

const login = new Login();
const filter = new Filter();

describe("filter", () => {
  before(() => {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    login.loginPage();
    login.userName();
    login.password();
    login.loginButton();
    login.inventoryPageCheck();
  });

  it('Check that the "Name (A to Z)" filter sorts the products from A to Z', () => {
    filter.filterSelect(data.testData.nameAZ);
    filter.checkNameFilter(-1);
  });

  it('Check that the "Name (Z to A)" filter sorts the products from Z to A', () => {
    filter.filterSelect(data.testData.nameZA);
    filter.checkNameFilter(1);
  });

  it('Check that the "Price (low to high)" filter sorts the products from the lowest price to the highest price', () => {
    filter.filterSelect(data.testData.priceLowToHigh);
    filter.checkPriceFilter(-1);
  });

  it('Check that the "Price (high to low)" filter sorts the products from the highest price to the lowest price', () => {
    filter.filterSelect(data.testData.priceHighToLow);
    filter.checkPriceFilter(1);
  });
});
