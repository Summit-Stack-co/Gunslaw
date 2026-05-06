"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/siteConfig";

export function ContactInquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      name.trim() ? `Website inquiry from ${name.trim()}` : "Website inquiry",
    );
    const body = encodeURIComponent(
      [
        `Name: ${name.trim() || "—"}`,
        `Phone: ${phone.trim() || "—"}`,
        `Email: ${email.trim() || "—"}`,
        "",
        "Message:",
        message.trim() || "—",
      ].join("\n"),
    );
    window.location.href = `${siteConfig.emailHref}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <h2 className="font-serif text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
        Send a Message
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-neutral-500">
        Please do not send confidential information through this form.
      </p>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        This form opens your email application with your message addressed to the office.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={200}
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mt-1.5 w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none ring-neutral-900 focus:border-neutral-400 focus:ring-1"
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
          >
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            className="mt-1.5 w-full min-h-[44px] rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none ring-neutral-900 focus:border-neutral-400 focus:ring-1"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={200}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mt-1.5 w-full min-h-[44px] rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none ring-neutral-900 focus:border-neutral-400 focus:ring-1"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            maxLength={4000}
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            className="mt-1.5 w-full resize-y rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm leading-relaxed text-neutral-900 outline-none ring-neutral-900 focus:border-neutral-400 focus:ring-1"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-sm border border-neutral-900 bg-neutral-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-neutral-800"
        >
          Compose email
        </button>
      </div>
    </form>
  );
}
