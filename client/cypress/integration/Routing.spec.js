describe("Routing", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Redirects users to login.", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
  });
});
