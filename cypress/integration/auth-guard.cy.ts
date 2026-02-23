/**
 * Integration: Auth Guard
 *
 * Tests that protected routes redirect to login when unauthenticated.
 */

describe("Auth Guard", () => {
  it("redirects unauthenticated user from /admin to /login", () => {
    cy.visit("/admin");
    cy.url().should("include", "/login");
  });

  it("redirects unauthenticated user from /author to /login", () => {
    cy.visit("/author");
    cy.url().should("include", "/login");
  });
});
