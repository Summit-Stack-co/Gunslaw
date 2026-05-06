import { siteConfig } from "@/lib/siteConfig";

export const homeContent = {
  hero: {
    eyebrow: "Douglas County, Nevada",
    headline: "Trusted Legal Representation",
    subheadline:
      "Clear, strategic counsel for clients facing serious legal matters in Nevada.",
    supportingLine:
      "Work directly with an attorney who prepares thoroughly, communicates clearly, and advocates with discipline in and out of the courtroom.",
    ctaText: siteConfig.consultationText,
    ctaHref: "/#contact",
    secondaryCtaText: "Learn More About Jason",
    secondaryCtaHref: "/about",
    imageSrc: "/images/headshot%20two.jpg",
    imageAlt: `Professional headshot of ${siteConfig.attorneyName}`,
  },
  aboutPreview: {
    heading: `About ${siteConfig.firmName}`,
    paragraphs: [
      `${siteConfig.firmName} is led by an attorney with a background in public service, prosecution, and military leadership, bringing disciplined judgment and courtroom experience to every case. He has served as a Senior Deputy District Attorney in Nye County, Nevada, and as a Senior Deputy Attorney General for the State of Nevada, developing broad experience in government litigation and legal analysis.`,

      `In addition to his civilian practice, he continues to serve as a Staff Judge Advocate in the United States Air Force Reserve, advising on military law, ethics, and compliance. ${siteConfig.firmName} is committed to providing clear, strategic counsel and effective advocacy for clients throughout ${siteConfig.serviceArea}.`,
    ],
    ctaText: `More About ${siteConfig.attorneyName}`,
    ctaHref: "/about",
  },
  cta: {
    heading: "Straightforward counsel. Serious preparation.",
    description:
      "If you need legal guidance grounded in experience, discipline, and clear communication, start with a direct conversation.",
    buttonText: siteConfig.consultationText,
    buttonHref: "/contact",
  },
} as const;
