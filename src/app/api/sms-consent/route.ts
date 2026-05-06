import { NextResponse } from "next/server";

import {
  SMS_CONSENT_AGREEMENT_TEXT,
  SMS_CONSENT_OPT_OUT_SUMMARY,
  SMS_CONSENT_TEXT_VERSION,
} from "@/content/smsConsent";
import { rateLimit, rateLimitKey } from "@/lib/rateLimit";
import { normalizePhoneToE164 } from "@/lib/smsConsentPhone";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/** Anti-abuse limits for the public SMS consent form (per IP). */
const SMS_RATE_LIMIT = { limit: 5, windowSeconds: 60 } as const;
const SMS_RATE_LIMIT_DAILY = { limit: 20, windowSeconds: 60 * 60 * 24 } as const;

type ConsentChoice = "opt_in" | "opt_out";

type Body = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  consentChoice?: unknown;
  consentCheckboxConfirmed?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidEmail(v: string): boolean {
  const s = v.trim();
  if (s.length === 0) return true;
  if (s.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function clientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? headers.get("cf-connecting-ip");
}

export async function POST(request: Request) {
  const minuteKey = rateLimitKey(request.headers, "sms:1m");
  const minuteCheck = rateLimit(minuteKey, SMS_RATE_LIMIT);
  if (!minuteCheck.ok) {
    return NextResponse.json(
      { ok: false, error: "You're submitting too quickly. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(minuteCheck.retryAfterSeconds) } },
    );
  }
  const dayKey = rateLimitKey(request.headers, "sms:1d");
  const dayCheck = rateLimit(dayKey, SMS_RATE_LIMIT_DAILY);
  if (!dayCheck.ok) {
    return NextResponse.json(
      { ok: false, error: "Daily submission limit reached. Please contact the office by phone." },
      { status: 429, headers: { "Retry-After": String(dayCheck.retryAfterSeconds) } },
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const missingEnv: string[] = [];
  if (!url) missingEnv.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) missingEnv.push("SUPABASE_SERVICE_ROLE_KEY");

  if (missingEnv.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Server is not configured for submissions. Please try again later.",
        ...(process.env.NODE_ENV === "development" && {
          debug:
            `Missing or empty in .env / .env.local: ${missingEnv.join(", ")}. The SMS API needs the Supabase project URL and the service_role secret (not the anon key).`,
        }),
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const fullName = isNonEmptyString(body.fullName) ? body.fullName.trim() : "";
  if (!fullName || fullName.length > 200) {
    return NextResponse.json({ ok: false, error: "Please enter your full name (max 200 characters)." }, { status: 400 });
  }

  const phoneRaw = isNonEmptyString(body.phone) ? body.phone.trim() : "";
  if (!phoneRaw) {
    return NextResponse.json({ ok: false, error: "Please enter your mobile phone number." }, { status: 400 });
  }
  const phone = normalizePhoneToE164(phoneRaw);
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid mobile phone number (include area code)." },
      { status: 400 },
    );
  }

  const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
  const email = emailRaw.length === 0 ? null : emailRaw;
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address or leave it blank." }, { status: 400 });
  }

  const choice = body.consentChoice;
  if (choice !== "opt_in" && choice !== "opt_out") {
    return NextResponse.json(
      { ok: false, error: 'Please choose whether you consent to SMS ("Yes" or "No").' },
      { status: 400 },
    );
  }
  const consentChoice = choice as ConsentChoice;

  const checkboxConfirmed = body.consentCheckboxConfirmed === true;
  if (consentChoice === "opt_in" && !checkboxConfirmed) {
    return NextResponse.json(
      { ok: false, error: "Please confirm the SMS consent disclosure to opt in." },
      { status: 400 },
    );
  }

  const consentText =
    consentChoice === "opt_in" ? SMS_CONSENT_AGREEMENT_TEXT : SMS_CONSENT_OPT_OUT_SUMMARY;
  const consentCheckboxDb = consentChoice === "opt_in" ? true : false;

  const ipAddress = clientIp(request.headers);
  const userAgent = request.headers.get("user-agent")?.slice(0, 2000) ?? null;

  try {
    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("sms_consent_submissions").insert({
      full_name: fullName,
      phone,
      email,
      consent_choice: consentChoice,
      consent_checkbox_confirmed: consentCheckboxDb,
      consent_text: consentText,
      consent_text_version: SMS_CONSENT_TEXT_VERSION,
      source_page: "/sms-consent",
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      console.error("[sms-consent] insert", error);
      return NextResponse.json(
        {
          ok: false,
          error: "Could not save your preference. Please try again later.",
          ...(process.env.NODE_ENV === "development" && {
            debug: error.message,
            hint: "Open the Network tab for full JSON, or the terminal running `next dev` for logs. If the table is missing, run `supabase/schema.sql` in the Supabase SQL Editor.",
          }),
        },
        { status: 500 },
      );
    }
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    console.error("[sms-consent]", e);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not save your preference. Please try again later.",
        ...(process.env.NODE_ENV === "development" && { debug: err }),
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    consentChoice,
  });
}
