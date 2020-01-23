/**
 * Assertions
 */

describe("Toolbar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has a set of Controls", () => {
    cy.get(".toolbar");
    cy.get("#create-form").should("be.visible");
  });
});
