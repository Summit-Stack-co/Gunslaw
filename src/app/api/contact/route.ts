import { NextResponse } from "next/server";
import { Resend } from "resend";

import { rateLimit, rateLimitKey } from "@/lib/rateLimit";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/** Anti-abuse limits for the public contact form (per IP). */
const CONTACT_RATE_LIMIT = { limit: 5, windowSeconds: 60 } as const;
const CONTACT_RATE_LIMIT_DAILY = { limit: 30, windowSeconds: 60 * 60 * 24 } as const;

type Body = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  /**
   * Honeypot — must stay empty. Do not use `website` (browsers/password managers autofill it).
   */
  contactHp?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidEmail(v: string): boolean {
  const s = v.trim();
  if (s.length === 0 || s.length > 320) return false;
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
  const minuteKey = rateLimitKey(request.headers, "contact:1m");
  const minuteCheck = rateLimit(minuteKey, CONTACT_RATE_LIMIT);
  if (!minuteCheck.ok) {
    return NextResponse.json(
      { ok: false, error: "You're sending messages too quickly. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(minuteCheck.retryAfterSeconds) } },
    );
  }
  const dayKey = rateLimitKey(request.headers, "contact:1d");
  const dayCheck = rateLimit(dayKey, CONTACT_RATE_LIMIT_DAILY);
  if (!dayCheck.ok) {
    return NextResponse.json(
      { ok: false, error: "Daily message limit reached for this address. Please email the office directly." },
      { status: 429, headers: { "Retry-After": String(dayCheck.retryAfterSeconds) } },
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || "noreply@gunslaw.com";

  const missingEnv: string[] = [];
  if (!url) missingEnv.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) missingEnv.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!resendApiKey) missingEnv.push("RESEND_API_KEY");
  if (!contactToEmail) missingEnv.push("CONTACT_TO_EMAIL");

  if (missingEnv.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Server is not configured for submissions. Please try again later.",
        ...(process.env.NODE_ENV === "development" && {
          debug: `Missing or empty: ${missingEnv.join(", ")}.`,
        }),
      },
      { status: 503 },
    );
  }
  const resendTo = contactToEmail as string;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (isNonEmptyString(body.contactHp) && body.contactHp.trim().length > 0) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[contact] Honeypot filled — treated as spam; no DB row or email (check autofill on hidden field).",
      );
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = isNonEmptyString(body.name) ? body.name.trim() : "";
  if (!name || name.length > 200) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name (max 200 characters)." },
      { status: 400 },
    );
  }

  const emailRaw = isNonEmptyString(body.email) ? body.email.trim() : "";
  if (!emailRaw || !isValidEmail(emailRaw)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  let phone: string | null = null;
  if (isNonEmptyString(body.phone)) {
    const p = body.phone.trim();
    if (p.length > 40) {
      return NextResponse.json({ ok: false, error: "Phone number is too long." }, { status: 400 });
    }
    phone = p;
  }

  const messageRaw = isNonEmptyString(body.message) ? body.message.trim() : "";
  if (!messageRaw) {
    return NextResponse.json({ ok: false, error: "Please enter a message." }, { status: 400 });
  }
  if (messageRaw.length > 8000) {
    return NextResponse.json({ ok: false, error: "Message is too long (max 8,000 characters)." }, { status: 400 });
  }

  try {
    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email: emailRaw,
      phone,
      message: messageRaw,
      ip_address: clientIp(request.headers),
      user_agent: request.headers.get("user-agent")?.slice(0, 512) ?? null,
    });

    if (error) {
      console.error("[contact][supabase]", error.message, error.code, error.details);
      return NextResponse.json(
        {
          ok: false,
          error: "Could not send your message. Please try again later.",
          ...(process.env.NODE_ENV === "development" && {
            debug: [
              error.message,
              error.code ? `code: ${error.code}` : "",
              error.details ? `details: ${error.details}` : "",
              "If you see “column … does not exist”, run supabase/contact_submissions_migrate_legacy.sql in Supabase.",
              "Confirm SUPABASE_SERVICE_ROLE_KEY is the service_role secret (not the anon key).",
            ]
              .filter(Boolean)
              .join(" "),
          }),
        },
        { status: 500 },
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.info("[contact][supabase] row inserted");
    }

    const submittedAt = new Date().toISOString();
    const resend = new Resend(resendApiKey);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: contactFromEmail,
      to: resendTo,
      replyTo: emailRaw,
      subject: `New website message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${emailRaw}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Message:",
        messageRaw,
        "",
        `Timestamp: ${submittedAt}`,
      ].join("\n"),
    });

    if (emailError) {
      console.error("[contact][email]", emailError);
      return NextResponse.json({ ok: false, error: "Could not send your message. Please try again later." }, { status: 500 });
    }

    if (process.env.NODE_ENV === "development") {
      console.info("[contact][resend] queued", { id: emailData?.id, to: resendTo, from: contactFromEmail });
    }
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json({ ok: false, error: "Could not send your message. Please try again later." }, { status: 500 });
  }

  return NextResponse.json(
    {
      ok: true,
      ...(process.env.NODE_ENV === "development" && { debug: "Check terminal for Resend message id; verify delivery in Resend dashboard." }),
    },
    { status: 200 },
  );
}
