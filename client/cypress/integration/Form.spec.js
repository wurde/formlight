/**
 * Assertions
 */

describe("Form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has ability to set form title", () => {
    cy.get("main");
    cy.get(".a-see-submissions").should("be.visible");
    cy.get(".a-see-form").should("be.hidden");

    cy.get(".a-see-submissions").click();
    cy.get(".a-see-submissions").should("be.hidden");
    cy.get(".a-see-form").should("be.visible");
  });
});
