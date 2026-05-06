import type { ReactNode } from "react";

type PageLayoutProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  /** Shorter title strip with smaller type (e.g. Contact page). */
  heroCompact?: boolean;
  /** Override computed hero `<h1>` classes (e.g. larger type on Contact). */
  heroTitleClassName?: string;
  /** Override computed hero description classes. */
  heroDescriptionClassName?: string;
  /** Override hero inner padding (default depends on `heroCompact`). */
  heroPaddingClassName?: string;
  /** Title / intro strip (defaults to `bg-brand-surface-trust` / white). */
  heroSurfaceClassName?: string;
  /** Full-bleed band behind the main content (e.g. `bg-brand-surface-hero` so it differs from the header). */
  contentSurfaceClassName?: string;
  /** Extra classes for the inner max-width wrapper (e.g. tighter vertical padding). */
  contentInnerClassName?: string;
  /** Extra classes on the full-bleed content band wrapper (e.g. flex-1 for viewport fill). */
  contentOuterClassName?: string;
  /**
   * Single tone for hero + body (full-bleed). Prefer `heroSurfaceClassName` + `contentSurfaceClassName`
   * when the header and body should alternate like the home page surfaces.
   */
  unifiedSurfaceClassName?: string;
};

export function PageLayout({
  eyebrow,
  title,
  description,
  children,
  heroCompact = false,
  heroTitleClassName,
  heroDescriptionClassName,
  heroPaddingClassName,
  heroSurfaceClassName,
  contentSurfaceClassName,
  contentInnerClassName,
  contentOuterClassName,
  unifiedSurfaceClassName,
}: PageLayoutProps) {
  const hasUnified = Boolean(unifiedSurfaceClassName);
  const heroBg = hasUnified
    ? unifiedSurfaceClassName
    : (heroSurfaceClassName ?? "bg-brand-surface-trust");
  const contentBg = hasUnified ? unifiedSurfaceClassName : contentSurfaceClassName;

  const useCompactRule = heroCompact || hasUnified || Boolean(contentSurfaceClassName);
  const titleRule = useCompactRule
    ? "mt-3 h-0.5 w-12 bg-brand-accent/80"
    : "mt-4 h-1 w-16 bg-brand-accent";

  const descriptionTone = hasUnified ? "text-brand-text" : "text-brand-muted";

  const inner = (
    <div
      className={[
        "mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10",
        contentInnerClassName ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );

  const heroPadding =
    heroPaddingClassName ??
    (heroCompact
      ? "pb-10 pt-24 sm:pb-12 sm:pt-28"
      : "pb-16 pt-32");

  const titleClass =
    heroTitleClassName ??
    (heroCompact
      ? "mt-3 max-w-3xl font-serif text-3xl font-semibold tracking-tight text-brand-primary sm:text-4xl"
      : "mt-4 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-brand-primary sm:text-5xl");

  const descriptionClass =
    heroDescriptionClassName ??
    (heroCompact
      ? `mt-3 max-w-2xl text-sm leading-7 sm:text-base sm:leading-7 ${descriptionTone}`
      : `mt-5 max-w-3xl text-base leading-8 sm:text-lg ${descriptionTone}`);

  const heroSectionClass = hasUnified
    ? heroBg
    : `border-b border-brand-border ${heroBg}`;

  return (
    <>
      <section className={`shrink-0 ${heroSectionClass}`}>
        <div className={`mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 ${heroPadding}`}>
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-muted">
              {eyebrow}
            </p>
          ) : null}
          <h1 className={titleClass}>
            {title}
          </h1>
          <div className={titleRule} />
          <p className={descriptionClass}>
            {description}
          </p>
        </div>
      </section>
      {contentBg ? (
        <div className={[contentBg, contentOuterClassName ?? ""].filter(Boolean).join(" ")}>{inner}</div>
      ) : (
        inner
      )}
    </>
  );
}
