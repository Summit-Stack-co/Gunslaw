// Daily Supabase keep-alive ping.
//
// Supabase's free tier pauses a project after ~7 days with no activity. This
// script writes one row a day so the database never goes idle. To make the
// write meaningful (and easy to spot), it toggles a single phone number's SMS
// consent between opt_in / opt_out each run.
//
// Runs with zero npm dependencies — uses Node's global fetch (Node 18+) against
// the Supabase REST (PostgREST) API with the service_role key.
//
// Required env vars:
//   SUPABASE_URL                 (or NEXT_PUBLIC_SUPABASE_URL)
//   SUPABASE_SERVICE_ROLE_KEY

const SUPABASE_URL = (
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
).trim().replace(/\/+$/, "");
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

// 7022376539 → E.164 (matches how the app stores numbers).
const PHONE = "+17022376539";
const TABLE = "sms_consent_submissions";

function fail(message) {
  console.error(`[db-keepalive] ${message}`);
  process.exit(1);
}

if (!SUPABASE_URL) fail("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL).");
if (!SERVICE_KEY) fail("Missing SUPABASE_SERVICE_ROLE_KEY.");

const baseHeaders = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
};

async function getLatestChoice() {
  const params = new URLSearchParams({
    select: "consent_choice",
    phone: `eq.${PHONE}`,
    order: "created_at.desc",
    limit: "1",
  });
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?${params}`, {
    headers: baseHeaders,
  });
  if (!res.ok) {
    fail(`Read failed (${res.status}): ${await res.text()}`);
  }
  const rows = await res.json();
  return rows[0]?.consent_choice ?? null;
}

async function insertRow(consentChoice) {
  const optedIn = consentChoice === "opt_in";
  const body = {
    full_name: "Automated DB Keep-Alive",
    phone: PHONE,
    email: null,
    consent_choice: consentChoice,
    consent_checkbox_confirmed: optedIn,
    consent_text: `Automated daily keep-alive ping (not a real client consent). Toggled to ${consentChoice}.`,
    consent_text_version: "keepalive",
    source_page: "github-action-keepalive",
    ip_address: null,
    user_agent: "github-actions/db-keepalive",
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: {
      ...baseHeaders,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    fail(`Insert failed (${res.status}): ${await res.text()}`);
  }
}

const previous = await getLatestChoice();
// Flip the previous value; default to opt_in on the very first run.
const next = previous === "opt_in" ? "opt_out" : "opt_in";

await insertRow(next);
console.log(`[db-keepalive] ${PHONE}: ${previous ?? "(none)"} → ${next}. Database pinged.`);
