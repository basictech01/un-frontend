/**
 * E2E: Search Journey
 *
 * Tests:
 * - Search bar opens on click
 * - Typing a query shows results
 * - Clicking a result navigates to the article
 * - No results state renders correctly
 */

describe("Search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("opens search input when toggle is clicked", () => {
    cy.get('[data-cy=search-toggle]').click();
    cy.get('[data-cy=search-input]').should("be.visible");
  });

  it("typing a query shows search results", () => {
    cy.get('[data-cy=search-toggle]').click();
    cy.get('[data-cy=search-input]').type("uttarakhand");
    cy.get('[data-cy=search-results]').should("exist");
    cy.get('[data-cy=search-result-card]').should("have.length.greaterThan", 0);
  });

  it("clicking a search result navigates to the article detail", () => {
    cy.get('[data-cy=search-toggle]').click();
    cy.get('[data-cy=search-input]').type("uttarakhand");
    cy.get('[data-cy=search-result-card]').first().click();
    cy.get('[data-cy=article-hero]').should("exist");
    cy.get('[data-cy=article-title]').should("exist");
  });

  it("shows no results message for an unknown query", () => {
    cy.get('[data-cy=search-toggle]').click();
    cy.get('[data-cy=search-input]').type("xyzzynonexistentquery12345");
    cy.contains("No articles found").should("exist");
  });
});
