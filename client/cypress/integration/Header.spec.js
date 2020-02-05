describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
    cy.login("Andy");
  });

  it("has a view toggle facility", () => {
    cy.visit("/");
    cy.get(".header");
    cy.get(".fa-file-alt").should("be.visible");
    cy.get(".fa-edit").should("be.hidden");

    cy.get(".fa-file-alt").click();
    cy.get(".fa-file-alt").should("be.hidden");
    cy.get(".fa-edit").should("be.visible");
  });
});
