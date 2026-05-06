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
        "relative overflow-hidden bg-brand-surface-hero-warm pt-14 lg:pt-[4.25rem]",
        fillViewport
          ? "flex min-h-0 flex-1 flex-col justify-center pb-3 sm:pb-4"
          : "pb-5 sm:pb-6 lg:pb-7",
      ].join(" ")}
    >
      {/*
        Desktop: portrait full-bleeds to the right edge of the viewport and dissolves into the white hero
        via a left-side gradient — the photo IS the hero background, not a card.
      */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block lg:w-[58%] xl:w-[55%] 2xl:w-[52%]"
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 60vw, 0px"
            className="object-cover object-[center_25%]"
          />
          {/* Fade photo into the warm hero tone so headline column reads as one surface */}
          <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-brand-surface-hero-warm from-0% via-brand-surface-hero-warm/85 via-35% to-transparent" />
          {/* Soft top + bottom feather for the band edges */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-surface-hero-warm/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-surface-hero-warm/70 to-transparent" />
        </div>
      </div>

      <div
        className={[
          "relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
          fillViewport ? "flex min-h-0 flex-1 flex-col justify-center" : "",
        ].join(" ")}
      >
        <div className="grid w-full grid-cols-1 items-center gap-6 py-6 sm:py-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)] lg:items-stretch lg:gap-6 lg:py-8 xl:gap-8">
          <div className="relative z-10 w-full max-w-3xl text-left lg:py-2">
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

          {/* Mobile / tablet portrait — stacked beneath copy. Hidden on lg where the full-bleed bg is shown. */}
          <div className="flex w-full justify-center lg:hidden">
            <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 0px"
                className="object-cover object-[center_22%]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-surface-hero-warm via-brand-surface-hero-warm/40 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
