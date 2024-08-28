describe("logout", () => {
  before(() => {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.visit(data.urls.baseUrl);
    cy.title().should("eq", data.titles.loginPageTitle);
  });

  it("Check that the user can logout successfully", () => {
    cy.userName().type(data.testData.userName);
    cy.password().type(data.testData.password);
    cy.loginButton();
    cy.url().should("include", data.urls.inventoryPageUrl);
    cy.productLabel().should("contains.text", data.labels.productLabelText);
    cy.menuButton();
    cy.logoutButton();
    cy.url().should("include", data.urls.loginPageUrl);
  });
});
