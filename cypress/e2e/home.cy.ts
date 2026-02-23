/**
 * E2E: Home Page Journey
 *
 * Tests the full home page user journey:
 * - Page loads with hero, content universes, latest stories
 * - Clicking a section card opens the article
 * - Clicking a latest story opens the article
 */

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the hero section after loading", () => {
    cy.get('[data-cy=hero-section]').should("exist");
    cy.get('[data-cy=hero-title]').should("exist").and("not.be.empty");
  });

  it("shows the hero CTA button linking to an article", () => {
    cy.get('[data-cy=hero-cta]')
      .should("exist")
      .and("have.attr", "href")
      .and("match", /^\/(articles\/\d+|#)$/);
  });

  it("renders content universe section cards", () => {
    cy.get('[data-cy=section-card]').should("have.length.greaterThan", 0);
  });

  it("clicking a section card navigates to the linked page", () => {
    cy.get('[data-cy=section-card]').first().then(($card) => {
      const href = $card.attr("href") ?? "";
      cy.wrap($card).click();
      if (href.startsWith("/articles/")) {
        cy.get('[data-cy=article-hero]').should("exist");
      } else {
        // section page
        cy.url().should("include", "/section/");
      }
    });
  });

  it("renders latest stories sidebar", () => {
    cy.get('[data-cy=latest-story-card]').should("have.length.greaterThan", 0);
  });

  it("clicking a latest story navigates to the article detail", () => {
    cy.get('[data-cy=latest-story-card]').first().click();
    cy.get('[data-cy=article-hero]').should("exist");
    cy.get('[data-cy=article-title]').should("exist").and("not.be.empty");
  });
});
