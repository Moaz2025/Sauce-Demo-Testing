import Login from "../support/POM/login-pom";
const login = new Login();

describe("login", () => {
  before(() => {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    login.loginPage();
  });

  it("Check that the user can't login with an empty username field", () => {
    login.password();
    login.loginButton();
    login.loginErrorLabel(data.messages.missingUserNameMessage);
  });

  it("Check that the user can't login with an empty password field", () => {
    login.userName();
    login.loginButton();
    login.loginErrorLabel(data.messages.missingPasswordMessage);
  });

  it("Check that the user can't login with empty username and password fields", () => {
    login.loginButton();
    login.loginErrorLabel(data.messages.missingUserNameMessage);
  });

  it("Check that the user can't login with a username that doesn't exist", () => {
    login.nonExistingUserName();
    login.password();
    login.loginButton();
    login.loginErrorLabel(data.messages.wrongUserNameOrPasswordMessage);
  });

  it("Check that the user can't login with a wrong password", () => {
    login.userName();
    cy.passwordTextbox().type(data.testData.wrongPassword);
    login.loginButton();
    login.loginErrorLabel(data.messages.wrongUserNameOrPasswordMessage);
  });

  it("Check that the user can't login with a locked username", () => {
    login.lockedUserName();
    login.password();
    login.loginButton();
    login.loginErrorLabel(data.messages.lockedUserNameMessage);
  });

  it("Check that the user can login with valid credentials", () => {
    login.userName();
    login.password();
    login.loginButton();
    login.inventoryPageCheck();
  });
});
