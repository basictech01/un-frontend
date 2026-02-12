export enum ArticleStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum UserRole {
  ADMIN = "admin",
  AUTHOR = "author",
}

export const SECTIONS = {
  VOICES_AND_VISIONARIES: {
    key: "VOICES_AND_VISIONARIES",
    label: "Voices & Visionaries",
    tagline: "People who shape today & imagine future",
  },
  LEARNING_AND_LADDERS: {
    key: "LEARNING_AND_LADDERS",
    label: "Learning & Ladders",
    tagline: "Knowledge as the true path uphill",
  },
  GROWTH_AND_GRIT: {
    key: "GROWTH_AND_GRIT",
    label: "Growth & Grit",
    tagline: "Enterprise forged in thin air and thick resolve",
  },
  STATE_AND_STEWARDSHIP: {
    key: "STATE_AND_STEWARDSHIP",
    label: "State & Stewardship",
    tagline: "Power held as responsibility, not privilege",
  },
  NATURE_AND_NURTURE: {
    key: "NATURE_AND_NURTURE",
    label: "Nature & Nurture",
    tagline: "Where survival and serenity coexist",
  },
  SPIRIT_AND_STORY: {
    key: "SPIRIT_AND_STORY",
    label: "Spirit & Story",
    tagline: "The unseen threads that bind Uttarakhand",
  },
} as const;

export const SUBSECTIONS: Record<
  string,
  { label: string; tagline: string; parentSection: string }
> = {
  CHARISMA: {
    label: "Charisma",
    tagline: "People Who Move the Mountains",
    parentSection: "VOICES_AND_VISIONARIES",
  },
  ACCOLADES: {
    label: "Accolades",
    tagline: "Celebrating Excellence",
    parentSection: "VOICES_AND_VISIONARIES",
  },
  DIASPORA: {
    label: "Diaspora",
    tagline: "Global Souls, Local Roots",
    parentSection: "VOICES_AND_VISIONARIES",
  },
  EDUCATION: {
    label: "Education",
    tagline: "Campuses of Change",
    parentSection: "LEARNING_AND_LADDERS",
  },
  APTITUDE: {
    label: "Aptitude",
    tagline: "Skills. Smarts. Shaping Futures",
    parentSection: "LEARNING_AND_LADDERS",
  },
  INNOVATION: {
    label: "Innovation",
    tagline: "Ideas that Elevate",
    parentSection: "LEARNING_AND_LADDERS",
  },
  ENDEAVOURS: {
    label: "Endeavours",
    tagline: "Enterprise in the Hills",
    parentSection: "GROWTH_AND_GRIT",
  },
  INFRATECH: {
    label: "InfraTech",
    tagline: "Building the Backbone of Progress",
    parentSection: "GROWTH_AND_GRIT",
  },
  GOVERNANCE: {
    label: "Governance",
    tagline: "Where Policy Meets People",
    parentSection: "STATE_AND_STEWARDSHIP",
  },
  RAAG_DARBARI: {
    label: "Raag Darbari",
    tagline: "Power. Policy. People.",
    parentSection: "STATE_AND_STEWARDSHIP",
  },
  NATURE: {
    label: "Nature",
    tagline: "Where the Wild Breathes Free",
    parentSection: "NATURE_AND_NURTURE",
  },
  WELLNESS: {
    label: "Wellness",
    tagline: "Healing Starts Here",
    parentSection: "NATURE_AND_NURTURE",
  },
  ODYSSEY: {
    label: "Odyssey",
    tagline: "Sacred Trails & Scenic Tales",
    parentSection: "SPIRIT_AND_STORY",
  },
  MOORINGS: {
    label: "Moorings",
    tagline: "Where Culture Anchors the Soul",
    parentSection: "SPIRIT_AND_STORY",
  },
};

export type SectionKey = keyof typeof SECTIONS;

export function getSubsectionsForSection(section: string): string[] {
  return Object.entries(SUBSECTIONS)
    .filter(([, meta]) => meta.parentSection === section)
    .map(([key]) => key);
}
