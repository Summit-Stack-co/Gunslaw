import { PageLayout } from "@/components/PageLayout";
import { privacyContent } from "@/content/legalContent";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: privacyContent.title,
  description: privacyContent.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageLayout
      eyebrow="Legal"
      title={privacyContent.title}
      description={privacyContent.description}
    >
      <div className="space-y-6">
        {privacyContent.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-md border border-brand-border bg-brand-background p-8 shadow-card"
          >
            <h2 className="font-serif text-2xl font-semibold text-brand-primary">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-brand-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
