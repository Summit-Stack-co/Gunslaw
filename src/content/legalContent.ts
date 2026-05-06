import { siteConfig } from "@/lib/siteConfig";

export const privacyContent = {
  title: "Privacy Policy",
  description:
    `How ${siteConfig.firmName} handles information shared through the website and direct contact channels.`,
  sections: [
    {
      heading: "Information You Choose to Share",
      paragraphs: [
        "This website currently functions as a static informational site. If you contact the office by phone or email, any information you provide is shared voluntarily through those direct channels.",
        "Please avoid sending confidential or sensitive information until an attorney-client relationship has been formally established.",
      ],
    },
    {
      heading: "Use of Personal Information",
      paragraphs: [
        "Contact information may be used to respond to inquiries, schedule consultations, and communicate about legal matters you ask the office to discuss.",
        siteConfig.footerPrivacyNotice,
      ],
    },
    {
      heading: "Text messaging and SMS",
      paragraphs: [
        "Text messaging originator opt-in data and consent will not be shared with any third parties, excluding aggregators and providers of the text messaging services.",
      ],
    },
    {
      heading: "Website Functionality",
      paragraphs: [
        "The site may offer optional forms (for example, SMS communication consent). Submissions are stored securely and used only for the purpose described on the form.",
        "Future features may change how information is collected. Any material changes should be reflected in an updated policy.",
      ],
    },
  ],
} as const;

export const termsContent = {
  title: "Terms of Service",
  description:
    `Basic terms governing use of the ${siteConfig.firmName} website and communications initiated through it.`,
  sections: [
    {
      heading: "Informational Use Only",
      paragraphs: [
        "The content on this website is provided for general informational purposes and does not constitute legal advice.",
        "Reviewing this website or contacting the office through the listed phone number or email address does not create an attorney-client relationship.",
      ],
    },
    {
      heading: "No Guarantee of Outcome",
      paragraphs: [
        "Prior experience, credentials, or case descriptions should not be interpreted as a promise or guarantee regarding the outcome of any future legal matter.",
        "Every matter depends on its own facts, procedural posture, and applicable law.",
      ],
    },
    {
      heading: "Communications",
      paragraphs: [
        "Unsolicited communications sent through email or other channels may not be treated as confidential unless and until the office agrees to represent you.",
        siteConfig.contactDisclaimer,
      ],
    },
    {
      heading: "SMS text messages (optional consent)",
      paragraphs: [
        `If you choose to receive SMS messages from ${siteConfig.legalName}, you may receive text messages related to scheduling, case updates, document reminders, and communication about your matter. Message frequency varies. Message and data rates may apply.`,
        "Reply STOP to opt out of SMS messages at any time. Reply HELP for help.",
        `For questions, contact ${siteConfig.firmName} at ${siteConfig.phone} or ${siteConfig.email}. See our Privacy Policy at ${siteConfig.siteUrl}/privacy for how we handle your information.`,
        "Carriers are not liable for delayed or undelivered messages.",
      ],
    },
  ],
} as const;
