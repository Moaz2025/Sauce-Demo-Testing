class Login {
  loginPage() {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
  }

  userName() {
    cy.userNameTextbox().type(data.testData.userName);
  }

  password() {
    cy.passwordTextbox().type(data.testData.password);
  }

  nonExistingUserName() {
    cy.userNameTextbox().type(data.testData.nonExistingUserName);
  }

  lockedUserName() {
    cy.userNameTextbox().type(data.testData.lockedUserName);
  }

  loginButton() {
    cy.loginButton();
  }

  loginErrorLabel(message) {
    cy.loginErrorLabel().should("contains.text", message);
  }

  inventoryPageCheck() {
    cy.url().should("include", data.urls.inventoryPageUrl);
    cy.productLabel().should("contains.text", data.labels.productLabelText);
  }

  logout() {
    cy.menuButton();
    cy.logoutButton();
    cy.url().should("include", data.urls.loginPageUrl);
  }
}
export default Login;
