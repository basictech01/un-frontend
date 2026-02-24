/**
 * E2E: Author Article Workflow
 *
 * Full journey of an author:
 * 1. Login → see author dashboard
 * 2. Navigate to articles list
 * 3. Navigate to create article page — form renders
 * 4. Create a draft article → redirects to articles list
 * 5. Submit first available draft for review → submit button disappears
 * 6. Pending article has no submit button (view only)
 */

describe("Author Article Workflow", () => {
  beforeEach(() => {
    cy.loginAsAuthor();
  });

  it("renders the author dashboard after login", () => {
    cy.get('[data-cy=author-dashboard]').should("exist");
  });

  it("can navigate to the articles list page", () => {
    cy.visit("/author/articles");
    cy.url().should("include", "/author/articles");
  });

  it("can navigate to the create article page and form renders", () => {
    cy.visit("/author/articles/create");
    cy.get('[data-cy=article-form-title]').should("exist");
    cy.get('[data-cy=article-form-section]').should("exist");
    cy.get('[data-cy=save-draft-btn]').should("exist");
    cy.get('[data-cy=submit-review-btn]').should("exist");
  });

  it("shows validation errors when saving with empty required fields", () => {
    cy.visit("/author/articles/create");

    // Click Save Draft without filling anything
    cy.get('[data-cy=save-draft-btn]').click();

    // All required field errors should appear
    cy.get('[data-cy=error-title]').should("exist").and("contain", "required");
    cy.get('[data-cy=error-section]').should("exist").and("contain", "required");
    cy.get('[data-cy=error-subsections]').should("exist").and("contain", "required");
    cy.get('[data-cy=error-content]').should("exist").and("contain", "required");

    // URL should NOT change — still on create page
    cy.url().should("include", "/create");
  });

  it("clears validation error when user fills in the field", () => {
    cy.visit("/author/articles/create");

    // Trigger title error
    cy.get('[data-cy=save-draft-btn]').click();
    cy.get('[data-cy=error-title]').should("exist");

    // Fill the title — error should disappear
    cy.get('[data-cy=article-form-title]').type("Some title");
    cy.get('[data-cy=error-title]').should("not.exist");
  });

  it("creates a draft article and redirects to the articles list", () => {
    cy.visit("/author/articles/create");

    const title = `Cypress Draft ${Date.now()}`;

    // Fill title
    cy.get('[data-cy=article-form-title]').type(title);

    // Fill excerpt
    cy.get('[data-cy=article-form-excerpt]').type("This is a test excerpt for the article.", { delay: 50 });

    // Pick first available section via Radix Select
    cy.get('[data-cy=article-form-section]').click();
    cy.get('[role="option"]').first().click();

    // Wait for subsections to appear then click the first one
    // Radix Checkbox renders as button[role="checkbox"], not input[type="checkbox"]
    cy.get('[data-cy=article-form-subsections]').should("exist");
    cy.get('[data-cy=article-form-subsections] button[role="checkbox"]').first().click();

    // Add minimal content via MDEditor textarea
    cy.get('[data-cy=article-form-editor]')
      .find(".w-md-editor-text-input")
      .type("This is test content written by Cypress.", { force: true });

    // Save as draft
    cy.get('[data-cy=save-draft-btn]').click();

    // Should redirect to author articles list
    cy.url().should("include", "/author/articles");
    // The list page should render (not stuck on create page)
    cy.url().should("not.include", "/create");
  });

  it("submits the first available draft for review and submit button disappears", () => {
    cy.visit("/author/articles");

    // Must have at least one draft with a submit button
    cy.get('[data-cy=action-submit]').should("have.length.greaterThan", 0);

    cy.get('[data-cy=action-submit]').its("length").then((initialCount) => {
      cy.get('[data-cy=action-submit]').first().click();
      // After submitting, that button should be gone
      cy.get('[data-cy=action-submit]').should("have.length.lessThan", initialCount);
    });
  });

  it("pending articles have no submit button (view only)", () => {
    cy.visit("/author/articles");

    cy.get("body").then(($body) => {
      if ($body.text().includes("Under Review")) {
        // Find rows with "Under Review" badge — they must not have a submit button
        cy.contains("Under Review")
          .closest("tr")
          .within(() => {
            cy.get('[data-cy=action-submit]').should("not.exist");
          });
      } else {
        cy.log("No pending articles yet — skipping view-only check");
      }
    });
  });
});
