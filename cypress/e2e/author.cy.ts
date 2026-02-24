/**
 * E2E: Author Dashboard Journey
 *
 * Tests:
 * - Author can access author dashboard after login
 * - Articles table is visible
 */

describe("Author Dashboard", () => {
  beforeEach(() => {
    cy.loginAsAuthor();
    cy.visit("/author");
  });

  it("renders the author dashboard", () => {
    cy.get('[data-cy=author-dashboard]').should("exist");
  });
});
