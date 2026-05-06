import { PageLayout } from "@/components/PageLayout";
import { SmsConsentForm } from "@/components/SmsConsentForm";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = createMetadata({
  title: "SMS Communication Consent",
  description: `Tell ${siteConfig.firmName} whether you consent to receive text messages related to scheduling, case updates, document reminders, and communication about your matter.`,
  path: "/sms-consent",
});

export default function SmsConsentPage() {
  return (
    <PageLayout
      title="SMS Communication Consent"
      description={`Use this form to tell ${siteConfig.firmName} whether you consent to receive text messages related to scheduling, case updates, document reminders, and communication about your matter.`}
      contentSurfaceClassName="bg-brand-surface-hero"
    >
      <div className="mx-auto max-w-xl">
        <SmsConsentForm />
      </div>
    </PageLayout>
  );
}
