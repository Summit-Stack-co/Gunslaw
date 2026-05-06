import { AboutPreview } from "@/components/AboutPreview";
import { ContactSection } from "@/components/ContactSection";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { TrustBand } from "@/components/TrustBand";
import { homeContent } from "@/content/homeContent";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-[100dvh] flex-col">
        <Hero {...homeContent.hero} fillViewport />
        <TrustBand />
      </div>
      <AboutPreview {...homeContent.aboutPreview} />
      <CTASection {...homeContent.cta} />
      <ContactSection id="contact" />
    </>
  );
}

