/**
 * Integration: Article Grid
 *
 * Tests article grid rendering on the section page.
 * Focused on one feature: the grid loads and displays cards.
 */

describe("Article Grid", () => {
  it("renders grid cards on the section page", () => {
    cy.visit("/section/voices_and_visionaries");
    cy.get('[data-cy=article-grid-card]').should("have.length.greaterThan", 0);
  });

  it("grid cards have valid href links", () => {
    cy.visit("/section/voices_and_visionaries");
    cy.get('[data-cy=article-grid-card]').first().should("have.attr", "href").and("match", /^\/articles\/\d+$/);
  });
});
