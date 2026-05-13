#!/usr/bin/env bash
set -euo pipefail

REPO="${1:-}"
if [[ -z "$REPO" ]]; then
  echo "Usage: $0 ron-thecertifiedbomb/smart-barangay-demo"
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) not found. Install it first."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged into GitHub CLI. Run: gh auth login"
  exit 1
fi

echo "✅ Target repo: $REPO"

ensure_label () {
  local name="$1" color="$2" desc="$3"
  # create label if it doesn't exist; ignore error if it already exists
  gh label create "$name" --repo "$REPO" --color "$color" --description "$desc" >/dev/null 2>&1 || true
}

issue_exists () {
  local title="$1"
  # best-effort title search; returns 0 if found, 1 if not
  gh issue list --repo "$REPO" --search "\"$title\" in:title" --limit 50 --json title \
    | grep -q "\"title\": \"$title\""
}

create_issue () {
  local title="$1" labels="$2"
  local body="$3"

  if issue_exists "$title"; then
    echo "⏭️  Skipping (already exists): $title"
    return 0
  fi

  gh issue create \
    --repo "$REPO" \
    --title "$title" \
    --body "$body" \
    --label "$labels" >/dev/null

  echo "✅ Created: $title"
}

echo "���️  Ensuring labels..."
ensure_label "type:UI"        "2563eb" "UI/UX work"
ensure_label "type:CFG"       "7c3aed" "Configuration/template work"
ensure_label "type:DB"        "16a34a" "Database/Supabase work"
ensure_label "type:SEC"       "dc2626" "Security/RLS/roles planning"
ensure_label "type:OPS"       "0f766e" "Deployment/operations"
ensure_label "type:DOC"       "6b7280" "Documentation"

ensure_label "priority:P0"    "ef4444" "Critical / must-do"
ensure_label "priority:P1"    "f59e0b" "High priority"
ensure_label "priority:P2"    "10b981" "Nice-to-have"

ensure_label "status:Backlog" "64748b" "Not started"
ensure_label "status:Ready"   "0284c7" "Ready to start"
ensure_label "status:In Progress" "8b5cf6" "Currently being worked on"
ensure_label "status:Review"  "f97316" "Needs review/testing"
ensure_label "status:Done"    "22c55e" "Completed"

echo "��� Creating issues..."

create_issue \
"UI-001 Responsive Navbar (mobile hamburger + dropdown)" \
"type:UI,priority:P0,status:Backlog" \
"**Priority:** P0  
**Branch:** \`ui/navbar\`  
**Dependencies:** None  

## Scope
- Mobile hamburger visible on < md
- Dropdown panel opens/closes
- Closes on route change and ESC
- No overflow / layout shift

## Acceptance Criteria
- Hamburger visible on mobile portrait
- Menu opens/closes reliably
- Route change auto-closes menu
- No horizontal scrolling caused by navbar

## Definition of Done
- Manual test on mobile + desktop
- No console errors
- PR created"

create_issue \
"CFG-001 Add app.config.ts + use in Home/Navbar" \
"type:CFG,priority:P0,status:Backlog" \
"**Priority:** P0  
**Branch:** \`ui/config\`  
**Dependencies:** UI-001  

## Scope
- Create \`app.config.ts\` with barangay + branding fields
- Home hero uses config (name/city/tagline)
- Navbar uses config (productName/logo/colors)

## Acceptance Criteria
- Changing config updates Home + Navbar without editing other files
- No TypeScript errors
- Config documented in README

## Definition of Done
- Manual test (change brgy name; UI updates)
- PR created"

create_issue \
"UI-003 Request Form UX: labels/help text/validation" \
"type:UI,priority:P1,status:Backlog" \
"**Priority:** P1  
**Branch:** \`ui/forms\`  
**Dependencies:** CFG-001  

## Scope
- Improve labels/spacing
- Helper text for optional fields
- Basic client-side validation
- Success panel shows tracking code

## Acceptance Criteria
- Prevent blank submissions
- Success shows tracking code
- Looks good on mobile

## Definition of Done
- Manual test
- PR created"

create_issue \
"UI-002 Home Page Hero + Cards polish" \
"type:UI,priority:P1,status:Backlog" \
"**Priority:** P1  
**Branch:** \`ui/home\`  
**Dependencies:** UI-001, CFG-001  

## Scope
- Polish hero typography/buttons
- Consistent cards spacing
- Responsive layout

## Acceptance Criteria
- Premium hero
- Cards: 1 column mobile / 3 columns desktop
- No layout breaks

## Definition of Done
- Manual test
- PR created"

create_issue \
"UI-004 StatusBadge component + consistent statuses" \
"type:UI,priority:P2,status:Backlog" \
"**Priority:** P2  
**Branch:** \`ui/components\`  
**Dependencies:** CFG-001  

## Scope
- StatusBadge component
- Use in Track + Admin pages
- Styles: pending/approved/rejected

## Acceptance Criteria
- Correct color per status
- No unused import warnings

## Definition of Done
- Manual test
- PR created"

create_issue \
"DB-001 Create Supabase project + env vars" \
"type:DB,priority:P0,status:Backlog" \
"**Priority:** P0  
**Branch:** \`backend/supabase\`  
**Dependencies:** M1 UI Demo Ready  

## Scope
- Create Supabase project
- Get URL + anon key
- Add env vars locally (and later Vercel)

## Acceptance Criteria
- App boots without env errors
- Supabase client initializes

## Definition of Done
- Secrets not committed
- README updated"

create_issue \
"DB-002 Create schema: requests table + indexes" \
"type:DB,priority:P0,status:Backlog" \
"**Priority:** P0  
**Branch:** \`backend/supabase\`  
**Dependencies:** DB-001  

## Scope
- Run schema.sql in Supabase
- Verify requests table + tracking_code index

## Acceptance Criteria
- Insert/select works in Supabase
- tracking_code auto-generated

## Definition of Done
- schema.sql committed (safe)"

create_issue \
"DB-003 API routes: POST create request + GET track" \
"type:DB,priority:P0,status:Backlog" \
"**Priority:** P0  
**Branch:** \`backend/supabase\`  
**Dependencies:** DB-002  

## Scope
- POST inserts request and returns tracking_code
- GET fetches request by tracking_code
- Validate input (zod)

## Acceptance Criteria
- Submit returns tracking_code
- Track returns correct record
- Clear error messages

## Definition of Done
- Manual test
- PR created"

create_issue \
"DB-004 Admin list reads latest requests" \
"type:DB,priority:P1,status:Backlog" \
"**Priority:** P1  
**Branch:** \`backend/supabase\`  
**Dependencies:** DB-003  

## Scope
- Admin shows latest 50 requests
- Keep demo gate (?key=...)

## Acceptance Criteria
- New request appears immediately in admin list
- No server errors

## Definition of Done
- Manual test
- PR created"

create_issue \
"SEC-001 Define roles (demo vs production) + RLS plan" \
"type:SEC,priority:P2,status:Backlog" \
"**Priority:** P2  
**Branch:** \`docs/security\`  
**Dependencies:** DB-002  

## Scope
- Document roles: anon/resident, staff/admin, owner
- Document RLS direction (production)
- Clarify demo limitations

## Acceptance Criteria
- Roles clear
- RLS plan written

## Definition of Done
- Markdown committed"

create_issue \
"OPS-001 Vercel deploy checklist + env var mapping" \
"type:OPS,priority:P1,status:Backlog" \
"**Priority:** P1  
**Branch:** \`docs/deploy\`  
**Dependencies:** DB-003  

## Scope
- Vercel deploy steps
- Env vars list
- Smoke test checklist

## Acceptance Criteria
- Anyone can deploy
- Deployed demo works end-to-end

## Definition of Done
- Docs committed"

create_issue \
"DOC-001 Demo script + pitch flow (1–2 minutes)" \
"type:DOC,priority:P1,status:Backlog" \
"**Priority:** P1  
**Branch:** \`docs/demo\`  
**Dependencies:** M2 Supabase Demo Ready  

## Scope
- Demo sequence Home → Request → Track → Admin
- Talk track (what to say)
- Common Q&A

## Acceptance Criteria
- Demo fits 1–2 minutes
- Non-technical script

## Definition of Done
- Docs committed"

echo "��� Done! Issues created (duplicates skipped if you rerun)."
