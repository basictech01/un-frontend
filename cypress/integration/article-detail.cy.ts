/**
 * Integration: Article Detail
 *
 * Tests article detail page content rendering.
 * Focused on one feature: the detail page shows the correct sections.
 */

describe("Article Detail Integration", () => {
  it("shows hero, title and content for article id=1", () => {
    cy.visit("/articles/1");
    cy.get('[data-cy=article-hero]').should("exist");
    cy.get('[data-cy=article-title]').should("exist").and("not.be.empty");
    cy.get('[data-cy=article-content]').should("exist");
  });
});
