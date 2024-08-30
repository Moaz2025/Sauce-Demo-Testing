import Login from "../support/POM/login-pom";
import ProductDetails from "../support/POM/product details-pom";

const login = new Login();
const productDetails = new ProductDetails();

describe("", () => {
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

  it("Check that the product title, description, and price match with the card on the products page", () => {
    productDetails.checkProductDetails();
  });

  it("Check that the back button at the product details page is working properly", () => {
    productDetails.ProductDetailsPage();
    cy.go("back");
    login.inventoryPageCheck();
  });
});
