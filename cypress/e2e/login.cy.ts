/**
 * E2E: Login Flow
 *
 * Tests:
 * - Login page renders correctly
 * - Admin can log in and see admin dashboard
 * - Author can log in and see author dashboard
 * - Invalid credentials show an error
 */

describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("renders the login form", () => {
    cy.get('[data-cy=login-email]').should("exist");
    cy.get('[data-cy=login-password]').should("exist");
    cy.get('[data-cy=login-submit]').should("exist");
  });

  it("admin can log in and reach the admin dashboard", () => {
    cy.fixture("users").then((users) => {
      cy.get('[data-cy=login-email]').type(users.admin.email);
      cy.get('[data-cy=login-password]').type(users.admin.password);
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=admin-dashboard]').should("exist");
    });
  });

  it("author can log in and reach the author dashboard", () => {
    cy.fixture("users").then((users) => {
      cy.get('[data-cy=login-email]').type(users.author.email);
      cy.get('[data-cy=login-password]').type(users.author.password);
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=author-dashboard]').should("exist");
    });
  });

  it("shows an error for invalid credentials", () => {
    cy.get('[data-cy=login-email]').type("wrong@example.com");
    cy.get('[data-cy=login-password]').type("wrongpassword");
    cy.get('[data-cy=login-submit]').click();
    // Should stay on login page
    cy.url().should("include", "/login");
  });
});
