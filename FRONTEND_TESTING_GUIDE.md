
---

# 🧪 Cypress E2E & Integration Testing Guidelines

**Hills-Quills Frontend (Real GraphQL Backend)**

> This document defines **how Cypress tests MUST be written** in this project.
> It assumes **GraphQL backend is running locally** and **NO GraphQL mocking is used**.

---

## 1. Why Cypress in This Project

We use **Cypress** to test **real user behavior** against a **real backend**.

### Cypress is responsible for:

✅ End-to-end user journeys
✅ UI + routing + GraphQL integration
✅ Auth flows (admin / author)
✅ Regression prevention
✅ Confidence before deployment

### Cypress is NOT responsible for:

❌ Unit testing components
❌ Testing GraphQL resolvers
❌ Testing DB logic
❌ Styling / Tailwind classes

---

## 2. Testing Philosophy (MANDATORY)

### What we test

> **What a real user can do and see**

### What we do NOT test

> **How the code is implemented**

We test:

* navigation
* content rendering
* permissions
* failures
* edge cases

---

## 3. Backend Assumptions

### Required before running Cypress

* Frontend running at `http://localhost:3000`
* GraphQL backend running locally
* Database seeded with **test-safe data**

Cypress tests **DO NOT**:

* create production data
* depend on unstable datasets

---

## 4. Folder Structure (FINAL)

```txt
cypress/
├── e2e/                         # FULL USER JOURNEYS
│   ├── home.cy.ts
│   ├── section.cy.ts
│   ├── article-detail.cy.ts
│   ├── search.cy.ts
│   ├── login.cy.ts
│   ├── admin.cy.ts
│   └── author.cy.ts
│
├── integration/                 # FEATURE-LEVEL INTEGRATION
│   ├── article-grid.cy.ts
│   ├── article-detail.cy.ts
│   └── auth-guard.cy.ts
│
├── fixtures/                    # OPTIONAL STATIC DATA
│   ├── users.json
│   └── articles.json
│
├── support/
│   ├── commands.ts              # CUSTOM COMMANDS
│   └── e2e.ts                   # GLOBAL CONFIG
│
└── screenshots/                 # AUTO-GENERATED
```

---

## 5. Test Types & Rules

### 5.1 E2E Tests (`cypress/e2e`)

**Definition**
A full real-world user journey using:

* browser
* UI
* routing
* GraphQL backend

Examples:

* Open home → click article → read content
* Login as admin → open dashboard
* Browse section → paginate → open article

Rules:

* One file = one journey
* Uses real backend
* No stubbing GraphQL
* Data must exist beforehand

---

### 5.2 Integration Tests (`cypress/integration`)

**Definition**
Tests **feature behavior** with real backend but limited scope.

Examples:

* Article grid rendering
* AuthGuard redirect
* Empty states

Rules:

* Real GraphQL backend
* Focus on ONE feature
* Faster than E2E
* Still browser-based

---

## 6. Naming Conventions (STRICT)

```txt
*.cy.ts          # Cypress test files
describe()       # Feature / flow
it()             # User behavior
```

Example:

```ts
describe('Article Detail Page', () => {
  it('shows article content when opened', () => {})
});
```

---

## 7. data-cy Attributes (NON-NEGOTIABLE)

### NEVER use:

❌ class names
❌ text selectors
❌ DOM hierarchy

### ALWAYS use:

```tsx
data-cy="article-card"
```

Example:

```tsx
<ArticleCard data-cy="article-card" />
```

Test:

```ts
cy.get('[data-cy=article-card]')
```

> **If a component is user-visible, it MUST have a `data-cy`**

---

## 8. Custom Cypress Commands

All reusable logic MUST go into:

```txt
cypress/support/commands.ts
```

### Examples

```ts
Cypress.Commands.add('loginAsAdmin', () => {
  cy.request('POST', '/api/test/login-admin');
});

Cypress.Commands.add('loginAsAuthor', () => {
  cy.request('POST', '/api/test/login-author');
});

Cypress.Commands.add('openArticle', (id: number) => {
  cy.visit(`/articles/${id}`);
});
```

Usage:

```ts
cy.loginAsAdmin();
cy.openArticle(1);
```

---

## 9. Example E2E Test (REAL BACKEND)

```ts
describe('Article Detail Flow', () => {
  it('opens article and shows content', () => {
    cy.visit('/');

    cy.get('[data-cy=article-card]').first().click();

    cy.get('[data-cy=article-title]').should('exist');
    cy.get('[data-cy=article-author]').should('exist');
    cy.get('[data-cy=article-content]').should('exist');
  });
});
```

---

## 10. Auth Testing Rules

* Auth tested ONLY via Cypress
* Login via API or UI
* No manual token hacking inside tests

Example:

```ts
cy.loginAsAdmin();
cy.visit('/admin');
cy.get('[data-cy=admin-dashboard]').should('exist');
```

---

## 11. Testing Atomic Design Components

### Cypress SHOULD test:

| Level     | What              |
| --------- | ----------------- |
| Organisms | Layout, behavior  |
| Templates | Composition       |
| Pages     | Navigation & data |

### Cypress SHOULD NOT test:

❌ Atoms
❌ Tailwind classes
❌ Animations

Atoms are tested visually (Storybook), not via Cypress.

---

## 12. Waiting & Timing Rules

❌ NEVER:

```ts
cy.wait(5000);
```

✅ ALWAYS:

```ts
cy.get('[data-cy=article-card]').should('exist');
```

Let Cypress wait **implicitly**.

---

## 13. Environment Configuration

### `cypress.config.ts`

```ts
e2e: {
  baseUrl: 'http://localhost:3000',
  viewportWidth: 1280,
  viewportHeight: 800,
}
```

### Environment variables

Use `.env.test` for:

* GraphQL endpoint
* Feature flags

---

## 14. What NOT to Do (STRICT)

❌ Mock GraphQL
❌ Hardcode waits
❌ Depend on unstable data
❌ Test styling
❌ Duplicate flows

---

## 15. Golden Rules (FOR LLMs)

1. Tests must read like user stories
2. Always use `data-cy`
3. Prefer real backend behavior
4. Keep tests deterministic
5. One test = one intention

---

## 16. When to Write Cypress Tests

| Scenario          | Cypress |
| ----------------- | ------- |
| User journeys     | ✅       |
| Routing           | ✅       |
| Auth              | ✅       |
| Permissions       | ✅       |
| Hook logic        | ❌       |
| Component styling | ❌       |

---

## 17. Final Rule (MOST IMPORTANT)

> **If a real user can break it, Cypress must test it.**

---

### ✅ Status

This Cypress guide is **FINAL & APPROVED**
All E2E and integration tests **MUST** follow this.

---

If you want next, I can:

* generate **starter Cypress tests**
* add **test-only backend helpers**
* set up **CI pipeline**
* create **Cursor testing prompt**

Just say 🚀
