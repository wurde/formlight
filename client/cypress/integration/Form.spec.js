describe.only("Form", () => {
  beforeEach(() => {
    localStorage.clear();
    cy.login("Andy");
  });

  it("has the ability to add new forms", () => {
    cy.url().should("include", "/forms");
    cy.get("input[name='title']").type("New Form");
    cy.get("button[type='submit']").click();
    cy.contains("New Form").click();
    cy.wait(500);

    cy.get("h1").contains("New Form");
    cy.get("input").type("Favorite color?");
    cy.get("button[type='submit']").click();

    // Remove form
    cy.get("button.btn-remove").click();
  });
});
