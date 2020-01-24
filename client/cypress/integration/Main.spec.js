/**
 * Assertions
 */

describe("Main", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has a view toggle facility", () => {
    cy.get("main");
    cy.get(".a-see-submissions").should("be.visible");
    cy.get(".a-see-form").should("be.hidden");

    cy.get(".a-see-submissions").click();
    cy.get(".a-see-submissions").should("be.hidden");
    cy.get(".a-see-form").should("be.visible");
  });
});
