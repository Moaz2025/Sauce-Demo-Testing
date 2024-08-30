import Login from "../support/POM/login-pom";
import Cart from "../support/POM/cart-pom";
import Checkout from "../support/POM/checkout-pom";

const login = new Login();
const cart = new Cart();
const checkout = new Checkout();

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

  it("Check that the user can't checkout with an empty cart", () => {
    cart.viewCart();
    cart.checkout();
  });

  it("Check that the user can't checkout with empty personal details", () => {
    cart.addToCart();
    cart.viewCart();
    cart.checkout();
    checkout.infoPageUrl();
    checkout.continue();
    checkout.checkoutInformationErrorLabel(
      data.messages.missingFirstNameMessage
    );
  });

  it("Check that the user can't checkout with an empty first name field", () => {
    cart.addToCart();
    cart.viewCart();
    cart.checkout();
    checkout.infoPageUrl();
    checkout.lastName();
    checkout.postalCode();
    checkout.continue();
    checkout.checkoutInformationErrorLabel(
      data.messages.missingFirstNameMessage
    );
  });

  it("Check that the user can't checkout with an empty last name field", () => {
    cart.addToCart();
    cart.viewCart();
    cart.checkout();
    checkout.infoPageUrl();
    checkout.firstName();
    checkout.postalCode();
    checkout.continue();
    checkout.checkoutInformationErrorLabel(
      data.messages.missingLastNameMessage
    );
  });

  it("Check that the user can't checkout with an empty zip/postal code field", () => {
    cart.addToCart();
    cart.viewCart();
    cart.checkout();
    checkout.infoPageUrl();
    checkout.firstName();
    checkout.lastName();
    checkout.continue();
    checkout.checkoutInformationErrorLabel(
      data.messages.missingPostalCodeMessage
    );
  });

  it("Check that the products, their quantities, and their prices at the checkout overview page match with the cart", () => {
    cart.addToCart();
    cart.viewCart();
    checkout.checkProductDetailsAndContinue();
    checkout.finish();
  });
});
