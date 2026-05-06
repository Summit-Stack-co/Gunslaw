import Link from "next/link";

import { BrandLockup } from "@/components/BrandLockup";
import { formatCityStateZip, siteConfig } from "@/lib/siteConfig";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border/90 bg-brand-surface-trust">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-brand-border pb-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <div className="max-w-md">
            <Link href="/" className="inline-flex" aria-label={`${siteConfig.firmName} home`}>
              <BrandLockup size="footer" />
            </Link>
            <p className="mt-1.5 text-xs leading-5 text-brand-muted sm:text-sm sm:leading-snug">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                Contact
              </h2>
              <div className="mt-1.5 space-y-0.5 text-sm leading-5 text-brand-text">
                <p>
                  <a href={siteConfig.phoneHref} className="link-inline">
                    {siteConfig.phone}
                  </a>
                </p>
                <p>
                  <a href={siteConfig.emailHref} className="link-inline">
                    {siteConfig.email}
                  </a>
                </p>
                <p>{siteConfig.address.street}</p>
                <p>{formatCityStateZip(siteConfig.address)}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                Links
              </h2>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-brand-text">
                {siteConfig.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-inline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-3 text-center text-[11px] leading-[1.35] text-brand-muted sm:text-xs sm:leading-snug">
          <p>
            © {year} {siteConfig.displayName}. All rights reserved.
          </p>
          <p className="mx-auto mt-1 max-w-3xl">{siteConfig.footerPrivacyNotice}</p>
          <p className="mt-2.5">
            Built by{" "}
            <a
              href="https://summitstackco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline font-medium text-brand-primary"
            >
              Summit Stack Co
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
