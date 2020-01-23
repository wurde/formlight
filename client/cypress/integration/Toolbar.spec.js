/**
 * Assertions
 */

describe("Toolbar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has a set of Controls", () => {
    cy.get(".controls-toolbar");
    cy.get("#create-form").should("be.visible");
  });
});
