"use client";

import { useEffect, useRef, useState } from "react";

const FORM_DISCLAIMER =
  "Submitting this form does not establish an attorney-client relationship. Please do not include confidential information.";

type ContactEmailFormProps = {
  className?: string;
  /** Tighter field spacing and shorter message area minimum height (e.g. contact page fit in viewport). */
  compact?: boolean;
  /** No panel chrome — sits directly on section background (e.g. contact page gray band). */
  flush?: boolean;
  /** Larger labels, inputs, and heading (e.g. fill viewport / hide footer below fold). */
  largeText?: boolean;
};

export function ContactEmailForm({
  className = "",
  compact = false,
  flush = false,
  largeText = false,
}: ContactEmailFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  /** Honeypot — obscure name so browsers/extensions do not autofill (avoid `website`). */
  const [contactHp, setContactHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [showSendConfirm, setShowSendConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!showSendConfirm) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowSendConfirm(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showSendConfirm]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form?.checkValidity()) {
      form?.reportValidity();
      return;
    }
    setShowSendConfirm(true);
  }

  async function confirmAndSend() {
    setShowSendConfirm(false);
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone.trim() || undefined,
          message,
          contactHp,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; debug?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setFeedback(
          [data.error || "Something went wrong. Please try again.", data.debug].filter(Boolean).join(" "),
        );
        return;
      }

      setStatus("success");
      setFeedback("Thank you. Your message has been sent.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setContactHp("");
    } catch {
      setStatus("error");
      setFeedback("Network error. Please check your connection or email the office directly.");
    }
  }

  const pad = flush ? "p-0" : compact ? "p-4 sm:p-5" : "p-5 sm:p-6";
  const formGap = largeText ? "gap-4" : compact ? "gap-3" : "gap-3.5";
  const formTop = compact ? "mt-3" : "mt-4";
  const messageMin = largeText
    ? "min-h-[6.5rem] sm:min-h-[7.5rem]"
    : compact
      ? "min-h-[4.75rem] sm:min-h-[5.25rem]"
      : "min-h-[7rem] sm:min-h-[8rem]";

  const shellClass = flush
    ? "border-0 bg-transparent shadow-none"
    : "rounded-md border border-brand-border/70 bg-brand-surface-trust";

  const inputClass = flush
    ? largeText
      ? "mt-2 w-full rounded-sm border border-brand-border bg-white/90 px-3 py-2.5 text-base text-brand-text shadow-sm outline-none ring-brand-primary backdrop-blur-sm focus:ring-2"
      : "mt-1.5 w-full rounded-sm border border-brand-border bg-white/90 px-3 py-2 text-sm text-brand-text shadow-sm outline-none ring-brand-primary backdrop-blur-sm focus:ring-2"
    : largeText
      ? "mt-2 w-full rounded-sm border border-brand-border bg-brand-surface-trust px-3 py-2.5 text-base text-brand-text outline-none ring-brand-primary focus:ring-2"
      : "mt-1.5 w-full rounded-sm border border-brand-border bg-brand-surface-trust px-3 py-2 text-sm text-brand-text outline-none ring-brand-primary focus:ring-2";

  if (status === "success") {
    return (
      <div
        className={`flex min-h-0 flex-1 flex-col justify-center ${shellClass} ${pad} ${className}`}
        role="status"
      >
        <p
          className={
            largeText
              ? "text-base leading-relaxed text-brand-text sm:text-lg"
              : "text-sm leading-relaxed text-brand-text sm:text-base"
          }
        >
          {feedback}
        </p>
      </div>
    );
  }

  const labelClass = largeText
    ? "block shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary"
    : "block shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary";

  const headingClass = largeText
    ? "font-serif text-xl font-semibold tracking-tight text-brand-primary sm:text-2xl"
    : "font-serif text-lg font-semibold tracking-tight text-brand-primary sm:text-xl";

  return (
    <div className={`relative flex h-full min-h-0 flex-col ${shellClass} ${pad} ${className}`}>
      {showSendConfirm ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-8"
          role="presentation"
          onClick={() => setShowSendConfirm(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-send-confirm-title"
            className="max-h-[min(90dvh,32rem)] w-full max-w-md overflow-y-auto rounded-md border border-brand-border bg-brand-surface-trust p-6 shadow-panel sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="contact-send-confirm-title"
              className="font-serif text-lg font-semibold tracking-tight text-brand-primary sm:text-xl"
            >
              Send this message?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-text sm:text-[15px] sm:leading-7">
              Are you sure you want to send your message to the office?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-[15px] sm:leading-7">
              Do not include confidential or sensitive information. Submitting this form does not establish an
              attorney-client relationship.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="btn-secondary w-full justify-center sm:w-auto"
                onClick={() => setShowSendConfirm(false)}
              >
                Cancel
              </button>
              <button type="button" className="btn-primary w-full justify-center sm:w-auto" onClick={confirmAndSend}>
                Yes, send message
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <h2 className={headingClass}>Message the office</h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`${formTop} flex min-h-0 flex-1 flex-col ${formGap}`}
        noValidate
      >
        <input
          type="text"
          name="business_fax_ext"
          value={contactHp}
          onChange={(e) => setContactHp(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore="true"
          className="sr-only"
          aria-hidden
        />

        <div className="shrink-0">
          <label htmlFor="contact-full-name" className={labelClass}>
            Name <span className="font-normal normal-case text-brand-muted">(required)</span>
          </label>
          <input
            id="contact-full-name"
            name="name"
            type="text"
            required
            maxLength={200}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </div>

        <div className="shrink-0">
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="font-normal normal-case text-brand-muted">(required)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={320}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </div>

        <div className="shrink-0">
          <label htmlFor="contact-phone" className={labelClass}>
            Phone <span className="font-normal normal-case text-brand-muted">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            maxLength={40}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            autoComplete="tel"
          />
        </div>

        <div className={`flex flex-1 flex-col ${messageMin}`}>
          <label htmlFor="contact-message" className={labelClass}>
            Message <span className="font-normal normal-case text-brand-muted">(required)</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={8000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} min-h-0 flex-1 resize-none`}
          />
        </div>

        {status === "error" ? (
          <p className={`shrink-0 text-brand-primary ${largeText ? "text-base" : "text-sm"}`} role="alert">
            {feedback}
          </p>
        ) : null}

        <div className="mt-auto shrink-0 space-y-3 pt-1">
          <p
            className={
              largeText
                ? "text-xs leading-relaxed text-brand-muted sm:text-sm"
                : "text-[11px] leading-relaxed text-brand-muted"
            }
          >
            {FORM_DISCLAIMER}
          </p>
          <button
            type="submit"
            className="btn-primary w-full sm:w-auto"
            disabled={status === "loading" || showSendConfirm}
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}
