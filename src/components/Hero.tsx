import Image from "next/image";
import Link from "next/link";

export type HeroProps = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  supportingLine?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  imageSrc: string;
  imageAlt: string;
  /** When true, hero grows within a flex parent so first viewport can be hero + sibling (e.g. trust bar). */
  fillViewport?: boolean;
};

export function Hero({
  eyebrow,
  headline,
  subheadline,
  supportingLine,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  imageSrc,
  imageAlt,
  fillViewport = false,
}: HeroProps) {
  return (
    <section
      id="hero"
      className={[
        "bg-brand-surface-hero-tint pt-14 lg:pt-[4.25rem]",
        fillViewport
          ? "flex min-h-0 flex-1 flex-col justify-center pb-3 sm:pb-4"
          : "pb-5 sm:pb-6 lg:pb-7",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
          fillViewport ? "flex min-h-0 flex-1 flex-col justify-center" : "",
        ].join(" ")}
      >
        <div className="grid w-full grid-cols-1 items-center gap-6 py-6 sm:py-7 lg:grid-cols-[minmax(0,1.28fr)_minmax(280px,0.82fr)] lg:gap-3 lg:py-8">
          <div className="w-full max-w-3xl text-left">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-9 shrink-0 bg-brand-accent" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-charcoal">
                {eyebrow ?? "Douglas County, Nevada"}
              </p>
            </div>
            <h1 className="mt-3 font-serif text-[2.875rem] font-bold leading-[1.04] tracking-tight text-brand-primary sm:text-[3.375rem] sm:leading-[1.05] lg:text-[3.625rem] lg:leading-[1.06] xl:text-[3.875rem] 2xl:text-[4.125rem]">
              {headline}
            </h1>
            <p className="mt-3 max-w-2xl text-lg font-normal leading-[1.38] text-brand-charcoal sm:text-xl sm:leading-[1.4] lg:text-[1.375rem] lg:leading-[1.42]">
              {subheadline}
            </p>
            {supportingLine ? (
              <p className="mt-2 max-w-2xl text-base leading-[1.45] text-brand-muted sm:text-lg sm:leading-[1.47]">
                {supportingLine}
              </p>
            ) : null}
            <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Link href={ctaHref} className="btn-primary w-full justify-center sm:w-auto">
                {ctaText}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center text-base font-medium text-brand-primary transition-colors hover:text-brand-accent sm:w-auto"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>

          <div className="flex w-full justify-center lg:justify-end">
            <div className="relative aspect-square w-full max-w-[440px] overflow-hidden shadow-heroImage sm:max-w-[480px] lg:mx-0 lg:max-w-[min(100%,540px)] xl:max-w-[560px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
