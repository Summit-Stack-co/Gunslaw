import Image from "next/image";
import Link from "next/link";

import { ContactEmailForm } from "@/components/ContactEmailForm";
import { PageLayout } from "@/components/PageLayout";
import { createMetadata } from "@/lib/metadata";
import { theme } from "@/lib/theme";
import { formatCityStateZip, siteConfig } from "@/lib/siteConfig";

export const metadata = createMetadata({
  title: "Contact",
  description: siteConfig.contactIntro,
  path: "/contact",
});

function FieldLabel({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted sm:text-[11px]">
      {children}
    </p>
  );
}

export default function ContactPage() {
  const officeCityZip = formatCityStateZip(siteConfig.address);
  const mailingCityZip = formatCityStateZip(siteConfig.mailingAddress);
  const mailingMatchesOffice =
    siteConfig.mailingAddress.line.trim() === siteConfig.address.street.trim() &&
    officeCityZip === mailingCityZip;

  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col">
      <PageLayout
        heroCompact
        heroSurfaceClassName="bg-brand-surface-hero-tint"
        contentSurfaceClassName="bg-brand-surface-about"
        contentOuterClassName="flex min-h-0 flex-1 flex-col"
        contentInnerClassName="flex min-h-0 flex-1 flex-col py-4 sm:py-5 lg:py-6"
        title={`Contact ${siteConfig.firmName}`}
        description="Reach the office directly to discuss a legal matter or schedule a consultation."
      >
        <div className="flex min-h-0 flex-1 flex-col lg:min-h-0">
          <div className="lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] lg:items-stretch lg:gap-x-10 xl:gap-x-12">
            <div className="flex min-h-0 min-w-0 flex-col lg:h-full lg:justify-between">
              <div className="max-w-md shrink-0 space-y-3 sm:space-y-3.5">
                <div>
                  <FieldLabel>Phone</FieldLabel>
                  <p className="mt-1.5">
                    <a
                      href={siteConfig.phoneHref}
                      className="text-2xl font-semibold leading-none tracking-tight text-brand-primary underline-offset-2 transition-colors hover:text-brand-charcoal sm:text-3xl lg:text-[2.125rem]"
                    >
                      {siteConfig.phone}
                    </a>
                  </p>
                </div>

                <div>
                  <FieldLabel>Email</FieldLabel>
                  <p className="mt-1.5 text-base font-medium leading-snug text-brand-primary sm:text-lg sm:font-normal">
                    <a href={siteConfig.emailHref} className="link-inline">
                      {siteConfig.email}
                    </a>
                  </p>
                </div>

                <div>
                  <FieldLabel>Office / Mailing address</FieldLabel>
                  <p className="mt-1.5 text-sm leading-snug text-brand-text sm:text-base sm:leading-snug">
                    {siteConfig.address.street}
                    <br />
                    {officeCityZip}
                    {!mailingMatchesOffice ? (
                      <>
                        <br />
                        <br />
                        <span className="text-brand-muted">Mailing: </span>
                        {siteConfig.mailingAddress.line}
                        <br />
                        {mailingCityZip}
                      </>
                    ) : null}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex w-full min-w-0 shrink-0 justify-center sm:mt-5 lg:mt-3 lg:py-1">
                <Image
                  src={theme.brand.logoSrc}
                  alt={theme.brand.logoAlt}
                  width={1536}
                  height={1024}
                  className="h-auto w-full max-w-[10rem] object-contain object-center sm:max-w-[13rem] lg:max-w-[16rem] xl:max-w-[18rem]"
                  sizes="(min-width: 1280px) 288px, (min-width: 1024px) 256px, (min-width: 640px) 208px, 160px"
                />
              </div>

              <div className="mt-3 max-w-md shrink-0 border-t border-brand-border pt-3 sm:mt-4 sm:pt-4">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted sm:text-[11px]">
                  SMS Communication Preferences
                </h2>
                <p className="mt-1.5 max-w-md text-xs leading-relaxed text-brand-muted sm:text-sm">
                  Opt in or out of text messages from the firm.
                </p>
                <p className="mt-2">
                  <Link
                    href="/sms-consent"
                    className="text-xs text-brand-muted underline decoration-brand-border underline-offset-2 transition-colors hover:text-brand-primary sm:text-sm"
                  >
                    Manage SMS preferences
                  </Link>
                </p>
              </div>
            </div>

            <aside className="mt-8 flex min-h-0 flex-col lg:mt-0 lg:h-full">
              <ContactEmailForm compact flush className="min-h-0 flex-1" />
            </aside>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
