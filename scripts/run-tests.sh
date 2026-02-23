#!/bin/bash
# =============================================================================
# Deterministic E2E + Integration test runner
# 1. Pull backend if missing
# 2. Start Docker (MySQL + Node backend)
# 3. Seed Cypress test users via GraphQL
# 4. Start Next.js frontend (port 3001)
# 5. Run ALL Cypress tests (e2e + integration)
# 6. Tear everything down — always, even on failure
# =============================================================================
set -eu
set -o pipefail

# ── Config ────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$(dirname "$FRONTEND_DIR")/un-backend"
BACKEND_REPO="git@github.com:samarthsinh2660/un-backend.git"

GRAPHQL_URL="http://localhost:3000/graphql"
FRONTEND_URL="http://localhost:3001"

MAX_BACKEND_WAIT=180   # seconds
MAX_FRONTEND_WAIT=120  # seconds

FRONTEND_PID=""
TEST_EXIT_CODE=0

# ── Colours ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; RESET='\033[0m'

step()  { echo -e "\n${BOLD}${BLUE}━━━ $* ━━━${RESET}"; }
ok()    { echo -e "   ${GREEN}✓${RESET} $*"; }
info()  { echo -e "   ${YELLOW}ℹ${RESET} $*"; }
fail()  { echo -e "   ${RED}✗${RESET} $*"; }
wait_msg() { echo -e "   ⏳ $*"; }

# ── Cleanup — always runs on EXIT ─────────────────────────────────────────────
cleanup() {
  step "Cleanup"

  # Kill npm process and its entire process group (catches child node/next processes)
  if [ -n "$FRONTEND_PID" ] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill -- -"$FRONTEND_PID" 2>/dev/null || kill "$FRONTEND_PID" 2>/dev/null || true
    wait "$FRONTEND_PID" 2>/dev/null || true
    ok "Next.js npm process stopped (PID $FRONTEND_PID)"
  fi

  # Kill any orphaned Next.js processes still on port 3001
  if fuser 3001/tcp 2>/dev/null | grep -q .; then
    fuser -k 3001/tcp 2>/dev/null || true
    ok "Killed remaining processes on port 3001"
  fi

  if [ -d "$BACKEND_DIR" ]; then
    (cd "$BACKEND_DIR" && docker-compose down -v 2>/dev/null) || true
    ok "Docker containers and volumes removed"
  fi
}
trap cleanup EXIT INT TERM

# ── Step 1 — Backend code ─────────────────────────────────────────────────────
step "Step 1 · Backend code"
if [ ! -d "$BACKEND_DIR" ]; then
  info "un-backend not found — cloning from $BACKEND_REPO"
  git clone "$BACKEND_REPO" "$BACKEND_DIR"
  ok "Cloned to $BACKEND_DIR"
else
  ok "Backend found at $BACKEND_DIR"
fi

# ── Step 2 — Docker up ────────────────────────────────────────────────────────
step "Step 2 · Start Docker (MySQL + Node backend)"
cd "$BACKEND_DIR"
docker-compose up --build -d
ok "Docker containers starting…"

# ── Step 3 — Wait for backend GraphQL ────────────────────────────────────────
step "Step 3 · Wait for backend GraphQL endpoint"
waited=0
until curl -sf -X POST "$GRAPHQL_URL" \
      -H "Content-Type: application/json" \
      -d '{"query":"{__typename}"}' -o /dev/null 2>/dev/null; do
  sleep 3
  waited=$((waited + 3))
  wait_msg "…${waited}s / ${MAX_BACKEND_WAIT}s"
  if [ "$waited" -ge "$MAX_BACKEND_WAIT" ]; then
    fail "Backend did not respond after ${MAX_BACKEND_WAIT}s"
    echo "--- docker logs ---"
    docker-compose logs --tail=40 un_backend || true
    exit 1
  fi
done
ok "Backend GraphQL is ready"

# ── Step 4 — Seed test users ──────────────────────────────────────────────────
step "Step 4 · Seed Cypress test users"

signup_user() {
  local name="$1" email="$2" password="$3" role="$4"
  local result
  result=$(curl -s -X POST "$GRAPHQL_URL" \
    -H "Content-Type: application/json" \
    -d "{\"query\":\"mutation { signup(input: { name: \\\"$name\\\", email: \\\"$email\\\", password: \\\"$password\\\", role: \\\"$role\\\" }) { user { id email } } }\"}")
  if echo "$result" | grep -q '"id"'; then
    ok "$role user created → $email"
  else
    info "$role user already exists (or signup skipped) → $email"
  fi
}

signup_user "Admin"  "admin@hillsquills.com"  "admin123"  "ADMIN"
signup_user "Author" "author@hillsquills.com" "author123" "AUTHOR"

# ── Step 5 — Start Next.js ────────────────────────────────────────────────────
step "Step 5 · Start Next.js frontend (port 3001)"
cd "$FRONTEND_DIR"
setsid npm run dev > /tmp/nextjs-e2e.log 2>&1 &
FRONTEND_PID=$!
ok "Next.js starting (PID $FRONTEND_PID)"

# ── Step 6 — Wait for frontend ────────────────────────────────────────────────
step "Step 6 · Wait for Next.js"
waited=0
until curl -sf "$FRONTEND_URL" -o /dev/null 2>/dev/null; do
  sleep 3
  waited=$((waited + 3))
  wait_msg "…${waited}s / ${MAX_FRONTEND_WAIT}s"
  if [ "$waited" -ge "$MAX_FRONTEND_WAIT" ]; then
    fail "Frontend did not respond after ${MAX_FRONTEND_WAIT}s"
    echo "--- Next.js logs ---"
    tail -30 /tmp/nextjs-e2e.log || true
    exit 1
  fi
done
ok "Frontend is ready at $FRONTEND_URL"

# ── Step 7 — Cypress ──────────────────────────────────────────────────────────
step "Step 7 · Run Cypress E2E tests"
cd "$FRONTEND_DIR"

set +e
npm run cy:run
TEST_EXIT_CODE=$?
set -e

# ── Step 8 — Report ───────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
if [ "$TEST_EXIT_CODE" -eq 0 ]; then
  echo -e "${GREEN}${BOLD}  ✅  ALL TESTS PASSED${RESET}"
else
  echo -e "${RED}${BOLD}  ❌  TESTS FAILED  (exit code: $TEST_EXIT_CODE)${RESET}"
  echo -e "  Check ${YELLOW}cypress/screenshots/${RESET} for failure screenshots"
fi
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"

exit "$TEST_EXIT_CODE"
