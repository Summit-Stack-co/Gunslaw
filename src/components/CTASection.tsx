import Link from "next/link";

type CTASectionProps = {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  /** Section background (default: white strip like TrustBand). Use `bg-brand-surface-about` to match home About. */
  surfaceClassName?: string;
};

export function CTASection({
  heading,
  description,
  buttonText,
  buttonHref,
  surfaceClassName = "bg-brand-surface-trust",
}: CTASectionProps) {
  return (
    <section className={["border-y border-brand-border", surfaceClassName].join(" ")}>
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto mb-5 h-0.5 w-12 bg-brand-accent" />
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-primary sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-brand-muted sm:leading-8">
          {description}
        </p>
        <Link href={buttonHref} className="btn-primary mt-8">
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
