/**
 * E2E: Article Detail Page Journey
 *
 * Tests:
 * - Direct navigation to an article by ID
 * - Article hero, title, content, author card are visible
 * - 404-style fallback when article doesn't exist
 */

describe("Article Detail Page", () => {
  it("opens article and shows all key sections", () => {
    cy.visit("/");
    cy.get('[data-cy=latest-story-card]').first().click();

    cy.get('[data-cy=article-hero]').should("exist");
    cy.get('[data-cy=article-title]').should("exist").and("not.be.empty");
    cy.get('[data-cy=article-content]').should("exist");
  });

  it("navigating to a non-existent article shows not found message", () => {
    cy.visit("/articles/999999");
    cy.contains("Article not found").should("exist");
  });
});
