// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", username => {
  // Visit the login page.
  cy.visit("/login");

  // Focus on the username input and type username.
  cy.get("input").type(username);

  // Focus the submit button and submit the form.
  cy.contains("Enter").click();
})
