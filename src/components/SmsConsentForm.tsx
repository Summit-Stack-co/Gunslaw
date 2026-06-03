"use client";

import Link from "next/link";
import { useState } from "react";

import {
  SMS_CONSENT_CHECKBOX_LABEL,
  SMS_CONSENT_DISCLOSURES,
} from "@/content/smsConsent";
import { siteConfig } from "@/lib/siteConfig";

type ConsentChoice = "opt_in" | "opt_out";

export function SmsConsentForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [resultChoice, setResultChoice] = useState<ConsentChoice | "">("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // A ticked checkbox is the affirmative opt-in; submitting unticked records no consent.
    const consentChoice: ConsentChoice = consentChecked ? "opt_in" : "opt_out";

    try {
      const res = await fetch("/api/sms-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          consentChoice,
          consentCheckboxConfirmed: consentChecked,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        debug?: string;
        hint?: string;
        consentChoice?: ConsentChoice;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        const parts = [data.error, data.debug, data.hint].filter(Boolean);
        setMessage(
          parts.length > 0
            ? parts.join(" — ")
            : "Something went wrong. Please try again.",
        );
        return;
      }

      setResultChoice(data.consentChoice ?? consentChoice);
      setStatus("success");
      if ((data.consentChoice ?? consentChoice) === "opt_out") {
        setMessage(
          `Thank you. Your preference has been recorded. ${siteConfig.firmName} will not send SMS messages to this number unless you provide consent later.`,
        );
      } else {
        setMessage("Thank you. Your SMS communication preference has been recorded.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-brand-border bg-[#FAFAFA] p-8 text-center shadow-sm sm:p-10"
        role="status"
      >
        <p className="text-base font-medium leading-relaxed text-brand-text">{message}</p>
        {resultChoice === "opt_in" ? (
          <p className="mt-4 text-sm leading-7 text-brand-muted">
            You can update your preference at any time using this form again, or by replying STOP to
            any message.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-brand-border bg-[#FAFAFA] p-8 shadow-sm sm:p-10"
      noValidate
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="sms-full-name" className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
            Full name <span className="text-brand-muted normal-case">(required)</span>
          </label>
          <input
            id="sms-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={200}
            value={fullName}
            onChange={(ev) => setFullName(ev.target.value)}
            className="mt-2 w-full rounded-sm border border-brand-border bg-brand-surface-trust px-3 py-2.5 text-sm text-brand-text outline-none ring-brand-primary focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="sms-phone" className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
            Mobile phone <span className="text-brand-muted normal-case">(required)</span>
          </label>
          <input
            id="sms-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            placeholder="(775) 555-0100"
            className="mt-2 w-full rounded-sm border border-brand-border bg-brand-surface-trust px-3 py-2.5 text-sm text-brand-text outline-none ring-brand-primary focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="sms-email" className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
            Email <span className="text-brand-muted normal-case">(optional)</span>
          </label>
          <input
            id="sms-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mt-2 w-full rounded-sm border border-brand-border bg-brand-surface-trust px-3 py-2.5 text-sm text-brand-text outline-none ring-brand-primary focus:ring-2"
          />
        </div>

        <fieldset className="rounded-md border border-brand-border bg-brand-surface-trust p-4 sm:p-5">
          <legend className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
            SMS communication consent <span className="text-brand-muted normal-case">(optional)</span>
          </legend>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consentChecked"
              checked={consentChecked}
              onChange={(ev) => setConsentChecked(ev.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-brand-border text-brand-primary"
            />
            <span className="text-sm font-medium leading-relaxed text-brand-text">
              {SMS_CONSENT_CHECKBOX_LABEL}
            </span>
          </label>

          <ul className="mt-4 space-y-2 border-t border-brand-border pt-4 text-sm leading-6 text-brand-muted">
            {SMS_CONSENT_DISCLOSURES.map((disclosure) => (
              <li key={disclosure} className="flex gap-2">
                <span aria-hidden="true" className="select-none text-brand-primary">
                  •
                </span>
                <span>{disclosure}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs leading-5 text-brand-muted">
            See our{" "}
            <Link href="/privacy" className="link-inline font-semibold">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="link-inline font-semibold">
              Terms of Service
            </Link>
            . Leaving the box unchecked records that you do not consent to receive SMS messages.
          </p>
        </fieldset>

        {status === "error" ? (
          <p className="rounded-sm border border-brand-primary/30 bg-brand-surface-about px-3 py-2 text-sm text-brand-primary" role="alert">
            {message}
          </p>
        ) : null}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary disabled:pointer-events-none disabled:opacity-50"
          >
            {status === "loading" ? "Submitting…" : "Submit preference"}
          </button>
        </div>
      </div>
    </form>
  );
}
