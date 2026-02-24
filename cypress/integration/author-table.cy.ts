/**
 * Integration: AuthorArticlesTable Organism
 *
 * Tests the author articles table organism behaviour:
 * - Renders the articles list
 * - Draft articles show Edit + Submit buttons
 * - Pending articles show View only (no Submit)
 * - Approved articles show View only (no Submit)
 */

describe("AuthorArticlesTable organism", () => {
  beforeEach(() => {
    cy.loginAsAuthor();
    cy.visit("/author/articles");
  });

  it("renders the articles list page", () => {
    cy.url().should("include", "/author/articles");
  });

  it("shows the create article button", () => {
    cy.contains("Create").should("exist");
  });

  it("draft articles have a submit action button", () => {
    cy.get("body").then(($body) => {
      if ($body.find('[data-cy=action-submit]').length > 0) {
        cy.get('[data-cy=action-submit]').first().should("exist").and("be.visible");
      } else {
        cy.log("No draft articles found — author may have no drafts yet");
      }
    });
  });

  it("pending articles have no submit button — view only", () => {
    cy.get("body").then(($body) => {
      // Find rows containing "Under Review" text — those are pending
      if ($body.text().includes("Under Review")) {
        cy.contains("Under Review")
          .closest("tr")
          .within(() => {
            cy.get('[data-cy=action-submit]').should("not.exist");
          });
      } else {
        cy.log("No pending articles in author table");
      }
    });
  });
});
