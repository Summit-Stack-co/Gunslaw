export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  href: string;
  label: string;
};

const phone = "(775) 504-4487";
const phoneDigits = phone.replace(/\D/g, "");

export const siteConfig = {
  siteUrl: "https://www.gunslaw.com",
  firmName: "J. Gunnell Law, LLC",
  legalName: "J. Gunnell Law, LLC",
  displayName: "J. Gunnell Law, LLC",
  displaySubtitle: "Nevada Licensed Attorney",
  attorneyName: "Jason Gunnell",
  attorneyTitles: ["Trial Lawyer", "Staff Judge Advocate, USAF Reserve"],
  phone,
  phoneHref: `tel:+1${phoneDigits}`,
  email: "jason@gunslaw.com",
  emailHref: "mailto:jason@gunslaw.com",
  address: {
    street: "1616 US HWY 395",
    city: "Minden",
    state: "NV",
    zip: "89423",
  },
  mailingAddress: {
    line: "1616 US HWY 395",
    city: "Minden",
    state: "NV",
    zip: "89423",
  },
  tagline: "Trusted legal representation serving Douglas County, Nevada.",
  consultationText: "Request a Consultation",
  headerCtaText: "Contact",
  serviceArea: "Douglas County and surrounding areas",
  contactIntro:
    "If you would like to discuss a legal matter or schedule a consultation, contact the office directly using the information below.",
  contactDisclaimer:
    "Communications through this website do not establish an attorney-client relationship. Please do not send confidential information until such a relationship has been formally established.",
  footerPrivacyNotice:
    "J. Gunnell Law, LLC does not share mobile information or personally identifying data with third parties or affiliates for marketing purposes, nor is any information disclosed publicly unless required by law.",
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/resources", label: "Resources" },
  ] satisfies NavLink[],
  legalLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/sms-consent", label: "SMS consent" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ] satisfies NavLink[],
  socialLinks: [] satisfies SocialLink[],
} as const;

export function formatCityStateZip(address: {
  city: string;
  state: string;
  zip: string;
}) {
  return `${address.city}, ${address.state} ${address.zip}`;
}
