const trustItems = [
  {
    title: "Nevada Licensed Attorney",
    description: "Licensed to practice in Nevada",
  },
  {
    title: "Trial Lawyer",
    description: "Courtroom-focused representation",
  },
  {
    title: "Public Service Background",
    description: "Former state and county prosecutor",
  },
  {
    title: "USAF Reserve",
    description: "Staff Judge Advocate",
  },
] as const;

export function TrustBand() {
  return (
    <section
      aria-label="Credentials"
      className="shrink-0 border-b border-t border-brand-border bg-brand-surface-trust"
    >
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="mb-5 flex flex-col items-center gap-2" aria-hidden>
          <div className="h-0.5 w-12 bg-brand-accent" />
          <div className="h-px w-full max-w-2xl bg-brand-border" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-0">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className={[
                "space-y-1.5 lg:px-4",
                index === 0 ? "" : "lg:border-l lg:border-brand-border",
              ].join(" ")}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">
                {item.title}
              </p>
              <p className="text-[13px] leading-5 text-brand-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-center gap-2" aria-hidden>
          <div className="h-px w-full max-w-2xl bg-brand-border" />
          <div className="h-0.5 w-12 bg-brand-accent" />
        </div>
      </div>
    </section>
  );
}
