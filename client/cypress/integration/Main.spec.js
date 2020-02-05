describe("Main", () => {
  beforeEach(() => {
    localStorage.clear();
    cy.login("Andy");
  });

  it("has a view toggle facility", () => {
    cy.visit("/");
    cy.get("main");
    cy.get(".a-see-submissions").should("be.visible");
    cy.get(".a-see-form").should("be.hidden");

    cy.get(".a-see-submissions").click();
    cy.get(".a-see-submissions").should("be.hidden");
    cy.get(".a-see-form").should("be.visible");
  });
});
