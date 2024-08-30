import Login from "../support/POM/login-pom";
import Cart from "../support/POM/cart-pom";

const login = new Login();
const cart = new Cart();

describe("add to cart", () => {
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

  it("Check that the user can add a product to the cart", () => {
    cart.addToCartAndCheckDetails(1);
  });

  it("Check that the user can add a product to the cart (from product details page)", () => {
    cart.addToCartAndCheckDetails(2);
  });

  it("Check that the user can remove a product from the cart", () => {
    cart.addToCartAndCheckDetails(1);
    cy.removeProductButton();
  });

  it("Check that the continue shopping button at the cart is working properly", () => {
    cart.viewCart();
    cart.continueShopping();
    login.inventoryPageCheck();
  });
});
