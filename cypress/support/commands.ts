/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsAdmin(): Chainable<void>;
      loginAsAuthor(): Chainable<void>;
      openArticle(id: number): Chainable<void>;
    }
  }
}

/**
 * Login as admin via the UI login form using env credentials.
 * Credentials are set in cypress.env.json or CYPRESS_* env vars.
 */
Cypress.Commands.add("loginAsAdmin", () => {
  const email = Cypress.env("ADMIN_EMAIL") ?? "admin@hillsquills.com";
  const password = Cypress.env("ADMIN_PASSWORD") ?? "admin123";

  cy.visit("/login");
  cy.get('[data-cy=login-email]').type(email);
  cy.get('[data-cy=login-password]').type(password);
  cy.get('[data-cy=login-submit]').click();
  cy.get('[data-cy=admin-dashboard], [data-cy=author-dashboard]').should("exist");
});

/**
 * Login as author via the UI login form using env credentials.
 */
Cypress.Commands.add("loginAsAuthor", () => {
  const email = Cypress.env("AUTHOR_EMAIL") ?? "author@hillsquills.com";
  const password = Cypress.env("AUTHOR_PASSWORD") ?? "author123";

  cy.visit("/login");
  cy.get('[data-cy=login-email]').type(email);
  cy.get('[data-cy=login-password]').type(password);
  cy.get('[data-cy=login-submit]').click();
  cy.get('[data-cy=author-dashboard]').should("exist");
});

/**
 * Navigate directly to an article detail page by ID.
 */
Cypress.Commands.add("openArticle", (id: number) => {
  cy.visit(`/articles/${id}`);
});

export {};
