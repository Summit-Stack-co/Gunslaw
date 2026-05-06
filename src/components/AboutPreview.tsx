import Link from "next/link";

import { siteConfig } from "@/lib/siteConfig";

type AboutPreviewProps = {
  heading: string;
  paragraphs: readonly string[];
  ctaText: string;
  ctaHref: string;
};

export function AboutPreview({
  heading,
  paragraphs,
  ctaText,
  ctaHref,
}: AboutPreviewProps) {
  return (
    <section id="about" className="bg-brand-surface-about">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
          <div className="flex flex-col items-center px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <h2 className="max-w-3xl font-serif text-3xl font-semibold tracking-tight text-brand-primary sm:text-4xl">
              {heading}
            </h2>
            <div className="mt-3 h-0.5 w-14 bg-brand-accent" />
            <div className="mx-auto mt-5 w-full max-w-2xl border-l border-brand-border pl-4 text-left">
              <p className="font-serif text-lg font-semibold text-brand-primary">
                {siteConfig.attorneyName}
              </p>
              <p className="mt-1 text-sm leading-6 text-brand-muted">
                {siteConfig.attorneyTitles.join(" · ")}
              </p>
              <p className="mt-1 text-sm text-brand-muted">{siteConfig.displaySubtitle}</p>
            </div>
            <div className="mx-auto mt-8 w-full max-w-2xl space-y-5 border-t border-brand-border pt-8 text-left">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-[1.75] text-brand-text">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link href={ctaHref} className="btn-secondary mt-10">
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
