/**
 * Integration: PublicNavbar + NavSearch Organisms
 *
 * Tests the navbar and search organisms:
 * - Logo renders and links to home
 * - Section nav links render (desktop xl viewport)
 * - NavSearch opens, accepts input, shows results
 * - NavSearch closes with X button
 */

describe("PublicNavbar organism", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("logo is visible and links to home", () => {
    cy.get('nav a[href="/"]').should("exist");
  });

  it("renders section navigation links on desktop", () => {
    // At 1280px (xl) the desktop nav links are visible
    cy.get('nav a[href*="/section/"]').should("have.length.greaterThan", 0);
  });

  it("section nav links have valid href patterns", () => {
    cy.get('nav a[href*="/section/"]').each(($link) => {
      cy.wrap($link)
        .should("have.attr", "href")
        .and("match", /^\/section\/.+$/);
    });
  });
});

describe("NavSearch organism", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("search toggle button is visible", () => {
    cy.get('[data-cy=search-toggle]').should("exist").and("be.visible");
  });

  it("clicking toggle shows the search input", () => {
    cy.get('[data-cy=search-toggle]').click();
    cy.get('[data-cy=search-input]').should("be.visible");
  });

  it("typing shows results dropdown", () => {
    cy.get('[data-cy=search-toggle]').click();
    cy.get('[data-cy=search-input]').type("news", { delay: 80 });
    cy.get('[data-cy=search-results]').should("exist");
  });

  it("typing a non-existent query shows no results message", () => {
    cy.get('[data-cy=search-toggle]').click();
    cy.get('[data-cy=search-input]').type("uttarakhandsss", { delay: 80 });
    cy.contains("No articles found").should("exist");
  });

  it("X button closes the search input", () => {
    cy.get('[data-cy=search-toggle]').click();
    cy.get('[data-cy=search-input]').should("be.visible");
    cy.get('[data-cy=search-close]').click();
    cy.get('[data-cy=search-input]').should("not.exist");
  });
});
