/**
 * E2E: Admin Moderation Workflow
 *
 * Full admin journey:
 * 1. Login → admin dashboard
 * 2. View all articles table
 * 3. Filter by PENDING status
 * 4. Approve a pending article from the table
 * 5. Reject a pending article with a reason from the detail page
 * 6. View users list
 */

describe("Admin Moderation Workflow", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });

  // ── Dashboard ──────────────────────────────────────────────────────────────

  it("renders the admin dashboard after login", () => {
    cy.get('[data-cy=admin-dashboard]').should("exist");
  });

  // ── Articles table ─────────────────────────────────────────────────────────

  it("shows the articles table with rows", () => {
    cy.visit("/admin/articles");
    cy.get('[data-cy=article-row]').should("have.length.greaterThan", 0);
  });

  it("can filter articles by PENDING status", () => {
    cy.visit("/admin/articles");

    // Status filter select
    cy.get('[data-cy=article-row]').its("length").then((total) => {
      // Open status select (Radix UI)
      cy.get('[aria-label="Filter by status"]').click();
      cy.get('[role="option"]').contains("Pending").click();

      // Either fewer rows (only pending) or the empty state
      cy.get("body").then(($body) => {
        if ($body.find('[data-cy=article-row]').length > 0) {
          cy.get('[data-cy=article-row]').its("length").should("be.lte", total);
        } else {
          cy.contains("No articles found").should("exist");
        }
      });
    });
  });

  // ── Approve from table ─────────────────────────────────────────────────────

  it("approves a pending article directly from the articles table", () => {
    cy.visit("/admin/pending");

    // If there are pending articles, approve the first one
    cy.get("body").then(($body) => {
      if ($body.find('[data-cy=approve-btn]').length > 0) {
        cy.get('[data-cy=approve-btn]').first().click();

        // The approve button should disappear (article is no longer pending)
        cy.get('[data-cy=approve-btn]').should("have.length.lessThan", $body.find('[data-cy=approve-btn]').length);
      } else {
        cy.log("No pending articles found — skipping approve test");
      }
    });
  });

  // ── Reject from detail page ────────────────────────────────────────────────

  it("rejects a pending article with a reason from the article detail page", () => {
    cy.visit("/admin/articles");

    // Find a row that has a reject button (PENDING article)
    cy.get("body").then(($body) => {
      if ($body.find('[data-cy=reject-btn]').length > 0) {
        // Navigate to that article's detail page via the title link
        cy.get('[data-cy=article-row]')
          .filter(':has([data-cy=reject-btn])')
          .first()
          .find("a")
          .first()
          .click();

        // Now on the admin article detail page — click reject
        cy.get('[data-cy=article-detail-reject]').should("exist").click();

        // Rejection dialog appears
        cy.get('[data-cy=rejection-reason]').should("exist");
        cy.get('[data-cy=rejection-submit]').should("be.disabled");

        // Type rejection reason
        cy.get('[data-cy=rejection-reason]').type("Content does not meet editorial standards.");
        cy.get('[data-cy=rejection-submit]').should("not.be.disabled");
        cy.get('[data-cy=rejection-submit]').click();

        // After rejection, article status should reflect rejected
        cy.contains("rejected", { matchCase: false }).should("exist");
      } else {
        cy.log("No pending articles available for rejection test — skipping");
      }
    });
  });

  // ── Bulk approve ───────────────────────────────────────────────────────────

  it("can bulk-approve selected pending articles", () => {
    cy.visit("/admin/pending");

    cy.get("body").then(($body) => {
      if ($body.find('[data-cy=article-row]').length > 0) {
        // Select the first article checkbox
        cy.get('[data-cy=article-row]').first().find('[role="checkbox"]').click();

        // Bulk action bar appears
        cy.get('[data-cy=bulk-approve-btn]').should("exist").click();

        // Bulk bar should disappear (selection cleared after action)
        cy.get('[data-cy=bulk-approve-btn]').should("not.exist");
      } else {
        cy.log("No articles in pending page — skipping bulk approve test");
      }
    });
  });

  // ── Users list ─────────────────────────────────────────────────────────────

  it("shows the users management page with at least one user", () => {
    cy.visit("/admin/users");
    cy.url().should("include", "/admin/users");
    // At minimum our two Cypress test users should exist
    cy.contains("admin@hillsquills.com").should("exist");
    cy.contains("author@hillsquills.com").should("exist");
  });

  // ── Admin create article ───────────────────────────────────────────────────

  it("admin can access the create article page", () => {
    cy.visit("/admin/articles/create");
    cy.get('[data-cy=article-form-title]').should("exist");
    cy.get('[data-cy=article-form-section]').should("exist");
  });
});
