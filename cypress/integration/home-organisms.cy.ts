/**
 * Integration: Home Page Organisms
 *
 * Tests each organism on the home page in isolation:
 * - HeroSection: renders title + CTA
 * - ContentUniverseSection: renders section cards
 * - LatestStoriesSidebar: renders story cards
 */

describe("HomePageContent Organisms", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("HeroSection organism", () => {
    it("renders the hero section with a title", () => {
      cy.get('[data-cy=hero-section]').should("exist");
      cy.get('[data-cy=hero-title]').should("exist").and("not.be.empty");
    });

    it("hero CTA links to an article or section", () => {
      cy.get('[data-cy=hero-cta]')
        .should("exist")
        .and("have.attr", "href")
        .and("match", /^\/(articles\/\d+|section\/.+)$/);
    });
  });

  describe("ContentUniverseSection organism", () => {
    it("renders at least one section card", () => {
      cy.get('[data-cy=section-card]').should("have.length.greaterThan", 0);
    });

    it("each section card has a valid href", () => {
      cy.get('[data-cy=section-card]').each(($card) => {
        cy.wrap($card)
          .should("have.attr", "href")
          .and("match", /^\/(articles\/\d+|section\/.+)$/);
      });
    });
  });

  describe("LatestStoriesSidebar organism", () => {
    it("renders at least one latest story card", () => {
      cy.get('[data-cy=latest-story-card]').should("have.length.greaterThan", 0);
    });

    it("each story card links to an article", () => {
      cy.get('[data-cy=latest-story-card]').each(($card) => {
        cy.wrap($card)
          .should("have.attr", "href")
          .and("match", /^\/articles\/\d+$/);
      });
    });
  });
});
