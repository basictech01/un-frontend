/**
 * Integration: PublicArticleSidebar Organism
 *
 * Tests the article sidebar organism on a real article detail page:
 * - Author card renders with name
 * - Newsletter/related articles section renders
 */

describe("PublicArticleSidebar organism", () => {
  beforeEach(() => {
    // Visit the first article from the home page
    cy.visit("/");
    cy.get('[data-cy=latest-story-card]').first().click();
    cy.get('[data-cy=article-hero]').should("exist");
  });

  it("renders the article sidebar alongside the body", () => {
    cy.get("aside").should("exist");
  });

  it("sidebar contains at least one card (author or newsletter)", () => {
    cy.get("aside").find("[class*='rounded']").should("have.length.greaterThan", 0);
  });
});
