/**
 * E2E: Section Page Journey
 *
 * Tests:
 * - Visiting a section page via nav
 * - Featured grid and list cards render
 * - More Stories section appears (infinite scroll)
 * - Clicking an article card navigates to detail
 */

describe("Section Page", () => {
  beforeEach(() => {
    cy.visit("/section/voices_and_visionaries");
  });

  it("renders article cards in the featured grid", () => {
    cy.get('[data-cy=article-grid-card]').should("have.length.greaterThan", 0);
  });

  it("renders article list cards", () => {
    cy.get('[data-cy=article-list-card]').should("have.length.greaterThan", 0);
  });

  it("shows more stories section when overflow articles exist", () => {
    cy.get('[data-cy=more-stories]').should("exist");
  });

  it("clicking an article grid card opens the article detail", () => {
    cy.get('[data-cy=article-grid-card]').first().click();
    cy.get('[data-cy=article-hero]').should("exist");
    cy.get('[data-cy=article-title]').should("exist");
  });

  it("clicking an article list card opens the article detail", () => {
    cy.get('[data-cy=article-list-card]').first().click();
    cy.get('[data-cy=article-hero]').should("exist");
    cy.get('[data-cy=article-title]').should("exist");
  });
});
