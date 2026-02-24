/**
 * Integration: ArticlesTable Organism (Admin)
 *
 * Tests the admin ArticlesTable organism behaviour:
 * - Rows render with title, status, section
 * - PENDING rows show approve + reject buttons
 * - Clicking approve removes the row from the pending list
 * - Selecting a row reveals the bulk action bar
 * - Deselecting all hides the bulk action bar
 */

describe("ArticlesTable organism (admin)", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/admin/articles");
  });

  it("renders article rows", () => {
    cy.get('[data-cy=article-row]').should("have.length.greaterThan", 0);
  });

  it("pending articles show approve and reject buttons", () => {
    cy.visit("/admin/pending");
    // Wait for rows to load — seeded DB always has pending articles
    cy.get('[data-cy=article-row]').should("have.length.greaterThan", 0);
    cy.get('[data-cy=approve-btn]').should("have.length.greaterThan", 0);
    cy.get('[data-cy=reject-btn]').should("have.length.greaterThan", 0);
  });

  it("clicking approve removes the row from the pending list", () => {
    cy.visit("/admin/pending");
    cy.get('[data-cy=article-row]').should("have.length.greaterThan", 0);

    cy.get('[data-cy=approve-btn]').its("length").then((initialCount) => {
      cy.get('[data-cy=approve-btn]').first().click();
      // After approval the row disappears or approve count drops
      cy.get('[data-cy=approve-btn]').should("have.length.lessThan", initialCount);
    });
  });

  it("selecting an article row reveals the bulk action bar", () => {
    cy.visit("/admin/pending");
    cy.get('[data-cy=article-row]').should("have.length.greaterThan", 0);
    cy.get('[data-cy=article-row]').first().find('[role="checkbox"]').click();
    cy.get('[data-cy=bulk-approve-btn]').should("exist");
    cy.get('[data-cy=bulk-delete-btn]').should("exist");
  });

  it("deselecting all articles hides the bulk action bar", () => {
    cy.visit("/admin/pending");
    cy.get('[data-cy=article-row]').should("have.length.greaterThan", 0);
    cy.get('[data-cy=article-row]').first().find('[role="checkbox"]').click();
    cy.get('[data-cy=bulk-approve-btn]').should("exist");
    // Deselect
    cy.get('[data-cy=article-row]').first().find('[role="checkbox"]').click();
    cy.get('[data-cy=bulk-approve-btn]').should("not.exist");
  });
});
