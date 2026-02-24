import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    viewportWidth: 1280,
    viewportHeight: 800,
    specPattern: ["cypress/e2e/**/*.cy.ts", "cypress/integration/**/*.cy.ts"],
    supportFile: "cypress/support/e2e.ts",
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
  },
});
