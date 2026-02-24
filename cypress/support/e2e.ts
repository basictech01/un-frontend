// Import custom commands so they are available in all tests
import "./commands";

// Suppress known uncaught exceptions that are not test failures
// (e.g. ResizeObserver errors from layout shifts during shimmer loading)
Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("ResizeObserver loop")) return false;
  return true;
});
