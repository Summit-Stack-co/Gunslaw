import Link from "next/link";

import { CTASection } from "@/components/CTASection";
import { PageLayout } from "@/components/PageLayout";
import { homeContent } from "@/content/homeContent";
import { eastForkRemoteAppearance } from "@/content/resourcesContent";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = createMetadata({
  title: "Resources",
  description: `Court forms and guidance for ${siteConfig.serviceArea}, including East Fork Justice Court remote appearance materials.`,
  path: "/resources",
});

const emailCompletedFormHref = `${siteConfig.emailHref}?subject=${encodeURIComponent("Completed East Fork Justice Court form")}`;

const zoomDownload = eastForkRemoteAppearance.downloads.find((d) => d.id === "zoom-guide");
const phoneVideoDownload = eastForkRemoteAppearance.downloads.find((d) => d.id === "phone-video-request");

export default function ResourcesPage() {
  return (
    <>
      <PageLayout
        heroCompact
        eyebrow="Helpful links"
        title="Resources"
        description="Downloads and practical notes for common Douglas County court procedures. Official forms are published by the courts; confirm you are using the current version before filing."
        heroSurfaceClassName="bg-brand-surface-hero-tint"
        contentSurfaceClassName="bg-brand-surface-about"
      >
        <div className="space-y-8">
          <section className="rounded-xl border border-brand-border bg-brand-surface-trust px-6 py-8 sm:px-8 sm:py-9 lg:px-10">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-brand-primary">
              {eastForkRemoteAppearance.courtName}
            </h2>
            <div className="mt-3 h-0.5 w-12 bg-brand-accent/80" />
            <p className="mt-6 text-base leading-[1.8] text-brand-text">{eastForkRemoteAppearance.intro}</p>

            <ul className="mt-8 space-y-6">
              {eastForkRemoteAppearance.downloads.map((item) => (
                <li
                  key={item.id}
                  className="rounded-md border border-brand-border bg-brand-surface-about px-4 py-4 sm:px-5 sm:py-5"
                >
                  <h3 className="font-serif text-lg font-semibold text-brand-primary sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:text-base">{item.description}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-primary underline decoration-brand-border underline-offset-2 transition-colors hover:text-brand-accent sm:text-base"
                    >
                      Open download on eastforkjusticecourt.com
                    </a>
                    <a
                      href={`#${item.instructionsId}`}
                      className="text-sm font-semibold text-brand-primary underline decoration-brand-border underline-offset-2 transition-colors hover:text-brand-accent sm:text-base"
                    >
                      View instructions
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section
            id={zoomDownload!.instructionsId}
            className="scroll-mt-28 rounded-xl border border-brand-border bg-brand-surface-hero-tint px-6 py-8 sm:px-8 sm:py-9 sm:scroll-mt-32 lg:px-10"
          >
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-brand-primary">
              How to use the Zoom appearance guide
            </h2>
            <div className="mt-3 h-0.5 w-12 bg-brand-accent/80" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-[1.75] text-brand-text marker:text-brand-accent">
              {eastForkRemoteAppearance.zoomGuideSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section
            id={phoneVideoDownload!.instructionsId}
            className="scroll-mt-28 rounded-xl border border-brand-border bg-brand-surface-trust px-6 py-8 sm:px-8 sm:py-9 sm:scroll-mt-32 lg:px-10"
          >
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-brand-primary">
              How to fill out the request to appear by phone or video
            </h2>
            <div className="mt-3 h-0.5 w-12 bg-brand-accent/80" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-[1.75] text-brand-text marker:text-brand-accent">
              {eastForkRemoteAppearance.phoneVideoRequestSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-brand-muted sm:text-base">
              Deadlines and filing methods matter. If you are unsure how to serve other parties or how many days before
              the hearing the court must receive your request, check the court’s instructions or applicable court rules,
              or speak with a Nevada-licensed attorney.
            </p>
          </section>

          <p className="rounded-md border border-brand-border bg-brand-surface-trust px-4 py-3 text-xs leading-relaxed text-brand-muted sm:px-5 sm:text-sm">
            {siteConfig.firmName} does not control external court websites. Links may change; if a download fails, use
            the court’s official site or clerk for the current form.
          </p>

          <section className="rounded-xl border border-brand-border bg-brand-surface-trust px-6 py-8 sm:px-8 sm:py-9 lg:px-10">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-brand-primary">Send a completed form</h2>
            <div className="mt-3 h-0.5 w-12 bg-brand-accent/80" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-text">
              After you fill out a court form, you can email it as an attachment to{" "}
              <a href={siteConfig.emailHref} className="link-inline font-medium">
                {siteConfig.email}
              </a>{" "}
              from your own email program (Gmail, Outlook, Apple Mail, and so on). That way you can attach the PDF or
              scan before you send.
            </p>
            <p className="mt-8">
              <a href={emailCompletedFormHref} className="btn-primary inline-flex">
                Open email to {siteConfig.email}
              </a>
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted">
              Submitting email does not establish an attorney-client relationship. Do not include confidential information
              until the office has agreed to represent you. For general questions without an attachment, you can still
              use the{" "}
              <Link href="/contact" className="link-inline font-medium text-brand-primary">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </PageLayout>
      <CTASection {...homeContent.cta} surfaceClassName="bg-brand-surface-hero-tint" />
    </>
  );
}
