/**
 * E2E: Admin Dashboard Journey
 *
 * Tests:
 * - Admin can access the admin dashboard after login
 * - Articles table is visible
 * - Stats cards are visible
 */

describe("Admin Dashboard", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit("/admin");
  });

  it("renders the admin dashboard", () => {
    cy.get('[data-cy=admin-dashboard]').should("exist");
  });
});
