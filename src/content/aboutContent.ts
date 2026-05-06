import { siteConfig } from "@/lib/siteConfig";

const attorney = siteConfig.attorneyName;

/** Sidebar photo on About — every narrative section includes one. */
export type AboutSectionPhoto = {
  readonly src: string;
  readonly alt: string;
};

export type AboutPageSection = {
  title: string;
  tone: "default" | "muted" | "tint";
  content?: string;
  items?: readonly string[];
  photo: AboutSectionPhoto;
};

/** One entry per file — assign sections by name so no `src` is reused. */
const photoInAction = {
  src: "/images/jason%20in%20action.webp",
  alt: `${attorney}, Senior Deputy District Attorney, delivers closing arguments in Pahrump District Court`,
} as const;

const photoGunsDesignation = {
  src: "/images/Jason-Gunnell126.jpg",
  alt: `${attorney} in U.S. Air Force Reserve uniform`,
} as const;

const photoInCourt = {
  src: "/images/in%20court.jpg",
  alt: `${attorney} in court during litigation`,
} as const;

const photoInCourtRoom = {
  src: "/images/in%20court%20room.jpg",
  alt: `${attorney} in the courtroom`,
} as const;

const photoMilitaryCourtroom = {
  src: "/images/military%20courtroom.jpg",
  alt: `${attorney} in a military courtroom`,
} as const;

const photoNvSeal = {
  src: "/images/In%20front%20of%20nv%20seal.jpg",
  alt: `${attorney} in front of the Nevada state seal`,
} as const;

const photoHeadshot = {
  src: "/images/headshot%20two.jpg",
  alt: `Professional headshot of ${attorney}`,
} as const;

/**
 * Ordered gallery metadata — `contactFormSidePhoto` is pinned for the home contact column
 * so this list can follow About section order without changing the homepage image.
 */
export const contactFormSidePhoto = photoNvSeal;

export const aboutActionPhotos = [
  photoHeadshot,
  photoGunsDesignation,
  photoInCourt,
  photoInAction,
  photoMilitaryCourtroom,
  photoNvSeal,
  photoInCourtRoom,
] as const;

export const aboutContent = {
  title: 'Jason "Guns" Gunnell',
  subtitle: "From Elite Prosecutor to Zealous Defender",
  actionPhotos: aboutActionPhotos,
  overview: `${attorney} is a seasoned trial attorney with nearly two decades of experience in complex criminal law. His career has spanned military courtrooms across the globe, the Office of the Nevada Attorney General, and local District Attorney offices. Today, he applies that insight to provide a formidable defense for individuals facing criminal charges in Nevada.`,
  callSign:
    'Within the Air Force, Jason is known by the call sign "Guns." The designation was earned through years of working closely with pilots and other military professionals while delivering legal advice in high-pressure environments. What began as a military call sign now serves as a professional go-by reflecting his direct, mission-focused approach to advocacy.',
  bridgeNarrative:
    "As a proud Veteran, Jason understands the transition from military service to civilian life and recognizes that military litigation is often misunderstood outside the service. While terminology may differ, the stakes in a General Court-Martial can be as high as any civilian felony trial.",
  bridgeHighlights: [
    "Led trial teams in some of the most serious military proceedings",
    "Conducted more than 40 jury trials across three continents",
    "Applies military-grade preparation and advocacy to Nevada courtrooms",
  ],
  prosecutionNarrative:
    "Before entering private practice, Jason spent most of his career as a high-level prosecutor. Following service as a Senior Deputy Attorney General for the State of Nevada, he served as a Senior Deputy District Attorney in Nye County, where he prosecuted serious felony matters including murder, sexual assault, and violent crimes against children.",
  prosecutionHighlights: [
    "Handled high-profile cases, including the Cathedral Canyon torture killing prosecution",
    "Secured a first-degree murder conviction in that case",
    "Understands government tactics, pressure points, and trial strategy from the inside",
  ],
  militaryLeadershipNarrative:
    "Jason continues his commitment to service as a Lieutenant Colonel and Staff Judge Advocate for the 452d Air Mobility Wing at March Air Reserve Base. He serves as the primary legal advisor to the Wing Commander and subordinate units on military justice and operations for a force of more than 1,500 personnel.",
  militaryLeadershipHighlights: [
    "Deployed to Baghdad, Iraq as a Team Prosecutor for the Law and Order Task Force",
    "Worked with Iraqi investigative judges on prosecutions of high-interest terrorists",
    "Continues active military legal leadership while serving clients in Nevada",
  ],
  educationAndAdmissions: [
    "Juris Doctor, Southern Illinois University School of Law (2007)",
    "Bachelor of Arts in Political Science, Idaho State University (2004)",
    "Nevada State Bar (#13997)",
    "Nebraska State Bar (#23642)",
    "Court of Appeals for the Armed Forces",
  ],
  personal:
    "Jason is an Eagle Scout, proficient in Spanish, and resides in Gardnerville, Nevada, where he continues to serve the community through J. Gunnell Law, LLC.",
  credentials: [
    "Nearly two decades of trial experience",
    "State and federal government prosecution background",
    "Military justice and operational legal advisory leadership",
    "Direct, mission-focused client advocacy",
  ],
} as const;

export const aboutPageSections: readonly AboutPageSection[] = [
  {
    title: "From Elite Prosecutor to Zealous Defender",
    content: aboutContent.overview,
    tone: "default",
    photo: photoHeadshot,
  },
  {
    title: 'The "Guns" Designation',
    content: aboutContent.callSign,
    tone: "muted",
    photo: photoGunsDesignation,
  },
  {
    title: "Bridging the Gap: Military and Civilian Trial Expertise",
    content: aboutContent.bridgeNarrative,
    items: aboutContent.bridgeHighlights,
    tone: "default",
    photo: photoInCourt,
  },
  {
    title: "A Career Built on High-Stakes Prosecution",
    content: aboutContent.prosecutionNarrative,
    items: aboutContent.prosecutionHighlights,
    tone: "muted",
    photo: photoInAction,
  },
  {
    title: "Military Leadership and Service",
    content: aboutContent.militaryLeadershipNarrative,
    items: aboutContent.militaryLeadershipHighlights,
    tone: "default",
    photo: photoMilitaryCourtroom,
  },
  {
    title: "Education & Bar Admissions",
    items: aboutContent.educationAndAdmissions,
    tone: "muted",
    photo: photoNvSeal,
  },
  {
    title: "Community and Personal Commitment",
    content: aboutContent.personal,
    items: aboutContent.credentials,
    tone: "tint",
    photo: photoInCourtRoom,
  },
];

function assertUniqueAboutPhotos(
  sections: ReadonlyArray<{ title: string; photo: { readonly src: string } }>,
) {
  const seen = new Set<string>();
  for (const s of sections) {
    const { src } = s.photo;
    if (seen.has(src)) {
      throw new Error(`About page: duplicate image src "${src}" (section "${s.title}")`);
    }
    seen.add(src);
  }
}

assertUniqueAboutPhotos(aboutPageSections);
