import Login from "../support/POM/login-pom";
const login = new Login();

describe("logout", () => {
  before(() => {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    login.loginPage();
  });

  it("Check that the user can logout successfully", () => {
    login.userName();
    login.password();
    login.loginButton();
    login.inventoryPageCheck();
    login.logout();
  });
});
