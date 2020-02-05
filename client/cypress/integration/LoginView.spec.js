describe("LoginView", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Redirects users to login.", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
    cy.get("h1").contains("Login")
    cy.get("input").type("Bob");
    cy.contains("Enter").click();
    cy.url().should("not.include", "/login");
    cy.contains("Welcome Bob!");
    cy.contains("Sign out");
  });
});
