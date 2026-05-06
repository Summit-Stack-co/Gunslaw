import Image from "next/image";

import { CTASection } from "@/components/CTASection";
import { PageLayout } from "@/components/PageLayout";
import { aboutContent, aboutPageSections } from "@/content/aboutContent";
import { homeContent } from "@/content/homeContent";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  description: aboutContent.overview,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageLayout
        heroCompact
        eyebrow="Attorney Profile"
        title={aboutContent.title}
        description={aboutContent.subtitle}
        heroSurfaceClassName="bg-brand-surface-hero-tint"
        contentSurfaceClassName="bg-brand-surface-about"
      >
        <div className="space-y-8">
          {aboutPageSections.map((section, index) => (
            <section
              key={section.title}
              className={[
                "rounded-xl border border-brand-border px-6 py-8 sm:px-8 sm:py-9 lg:px-10",
                section.tone === "muted"
                  ? "bg-brand-surface-about"
                  : section.tone === "tint"
                    ? "bg-brand-surface-hero-tint"
                    : "bg-brand-surface-trust",
              ].join(" ")}
            >
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-brand-primary">
                {section.title}
              </h2>
              <div className="mt-3 h-0.5 w-12 bg-brand-accent/80" />

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_168px] md:items-start md:gap-8">
                <div className="order-2 min-w-0 md:order-1">
                  {section.content ? (
                    <p className="text-base leading-[1.8] text-brand-text">{section.content}</p>
                  ) : null}
                  {section.items ? (
                    <ul
                      className={[
                        "space-y-3 pl-5 text-base leading-[1.75] text-brand-text",
                        section.content ? "mt-5" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {section.items.map((item) => (
                        <li key={item} className="list-disc marker:text-brand-accent">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="order-1 m-0 shrink-0 justify-self-center md:order-2 md:justify-self-end">
                  {/*
                    Do not use fill here: grid items with only absolutely-positioned children
                    can compute min-height 0 and collapse (no visible photo).
                  */}
                  <div className="w-[140px] overflow-hidden rounded-md border border-brand-border shadow-sm sm:w-[156px] md:w-[168px]">
                    <Image
                      src={section.photo.src}
                      alt={section.photo.alt}
                      width={672}
                      height={896}
                      className="aspect-[3/4] h-auto w-full object-cover object-[center_20%]"
                      sizes="(min-width: 768px) 168px, 156px"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
          <p className="rounded-md border border-brand-border bg-brand-surface-trust px-4 py-3 text-xs leading-relaxed text-brand-muted sm:px-5 sm:text-sm">
            Military and courtroom photographs are shown for biographical and informational purposes only.
            This law practice is not endorsed by the federal government, the Department of Defense, or the
            United States Air Force.
          </p>
        </div>
      </PageLayout>
      <CTASection {...homeContent.cta} surfaceClassName="bg-brand-surface-hero-tint" />
    </>
  );
}
