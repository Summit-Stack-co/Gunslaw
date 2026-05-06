"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { siteConfig } from "@/lib/siteConfig";
import { BrandLockup } from "@/components/BrandLockup";

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-border/90 bg-brand-surface-trust/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="min-w-0 shrink"
          aria-label={`${siteConfig.firmName} home`}
          onClick={() => setIsOpen(false)}
        >
          <BrandLockup size="header" />
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-sm border border-brand-border bg-brand-surface-trust px-3 py-2 text-sm font-semibold text-brand-primary md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <nav
          id="primary-nav"
          className={[
            "absolute left-0 right-0 top-full border-b border-brand-border bg-brand-surface-trust px-6 py-5 shadow-panel md:static md:block md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none",
            isOpen ? "block" : "hidden md:block",
          ].join(" ")}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
            <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-7">
              {siteConfig.navLinks.map((link) => {
                const active = isActiveLink(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={[
                        "border-b-2 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition-colors",
                        active
                          ? "border-brand-accent text-brand-primary"
                          : "border-transparent text-brand-primary hover:text-brand-accent",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full justify-center md:w-auto"
            >
              {siteConfig.headerCtaText}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
