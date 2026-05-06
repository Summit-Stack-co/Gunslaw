import Image from "next/image";
import Link from "next/link";

import { contactFormSidePhoto } from "@/content/aboutContent";
import { formatCityStateZip, siteConfig } from "@/lib/siteConfig";

const contactPhoto = contactFormSidePhoto;

type ContactSectionProps = {
  id?: string;
  title?: string;
  intro?: string;
};

export function ContactSection({
  id,
  title = `Contact ${siteConfig.firmName}`,
  intro = siteConfig.contactIntro,
}: ContactSectionProps) {
  return (
    <section id={id} className="bg-brand-surface-about">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.8fr)] lg:items-center">
          <div className="surface-card p-8 text-center sm:p-10">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-primary sm:text-4xl">
              {title}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 bg-brand-accent" />

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brand-muted">{intro}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">Phone</h3>
                <p className="mt-2 text-base leading-7 text-brand-text">
                  <a href={siteConfig.phoneHref} className="link-inline">
                    {siteConfig.phone}
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">Email</h3>
                <p className="mt-2 text-base leading-7 text-brand-text">
                  <a href={siteConfig.emailHref} className="link-inline">
                    {siteConfig.email}
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">Office Location</h3>
                <p className="mt-2 text-base leading-7 text-brand-text">
                  {siteConfig.address.street}
                  <br />
                  {formatCityStateZip(siteConfig.address)}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">Mailing Address</h3>
                <p className="mt-2 text-base leading-7 text-brand-text">
                  {siteConfig.mailingAddress.line}
                  <br />
                  {formatCityStateZip(siteConfig.mailingAddress)}
                </p>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-xs leading-5 text-brand-muted sm:mt-5 sm:text-[13px] sm:leading-relaxed">
              To opt in or manage text messages from the firm, use the{" "}
              <Link
                href="/sms-consent"
                className="font-medium text-brand-primary underline decoration-brand-primary underline-offset-[3px] transition-colors hover:text-brand-accent hover:decoration-brand-accent"
              >
                SMS communication preferences
              </Link>{" "}
              form.
            </p>

            <div className="mt-8 border-t border-brand-border pt-6">
              <p className="mx-auto max-w-2xl text-sm leading-7 text-brand-muted">
                {siteConfig.contactDisclaimer}
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-md border border-brand-border shadow-card">
              <Image
                src={contactPhoto.src}
                alt={contactPhoto.alt}
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
