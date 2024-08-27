describe("login", () => {
  before(() => {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  it("Check that the user can't login with an empty username field", () => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
    cy.password().type(data.testData.password);
    cy.loginButton();
    cy.loginErrorLabel().should(
      "contains.text",
      data.messages.missingUserNameMessage
    );
  });

  it("Check that the user can't login with an empty password field", () => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
    cy.userName().type(data.testData.userName);
    cy.loginButton();
    cy.loginErrorLabel().should(
      "contains.text",
      data.messages.missingPasswordMessage
    );
  });

  it("Check that the user can't login with empty username and password fields", () => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
    cy.loginButton();
    cy.loginErrorLabel().should(
      "contains.text",
      data.messages.missingUserNameMessage
    );
  });

  it("Check that the user can't login with a username that doesn't exist", () => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
    cy.userName().type(data.testData.nonExistingUserName);
    cy.password().type(data.testData.password);
    cy.loginButton();
    cy.loginErrorLabel().should(
      "contains.text",
      data.messages.wrongUserNameOrPasswordMessage
    );
  });

  it("Check that the user can't login with a wrong password", () => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
    cy.userName().type(data.testData.userName);
    cy.password().type(data.testData.wrongPassword);
    cy.loginButton();
    cy.loginErrorLabel().should(
      "contains.text",
      data.messages.wrongUserNameOrPasswordMessage
    );
  });

  it("Check that the user can login with valid credentials", () => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
    cy.userName().type(data.testData.userName);
    cy.password().type(data.testData.password);
    cy.loginButton();
    cy.url().should("include", data.urls.inventoryUrl);
    cy.productLabel().should("contains.text", data.labels.productLabelText);
  });
});
