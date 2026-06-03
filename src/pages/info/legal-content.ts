/**
 * Legal documents are intentionally English-only: they're a single canonical
 * version and are not localized. Keep them out of the translation files.
 * (The About page stays translated; this is just the legal copy.)
 */

export type LegalSection = { id: string; title: string };

export type LegalContent = {
  documentTitle: string;
  eyebrow: string;
  title: string;
  lede: string;
  lastUpdatedDate: string;
  sections: LegalSection[];
};

/** Chrome labels rendered inside legal documents, English to match the copy. */
export const legalChrome = {
  onThisPage: "On this page",
  lastUpdated: "Last updated",
  backToTop: "Back to top",
};

export const termsContent: LegalContent = {
  documentTitle: "Terms of Service",
  eyebrow: "Legal",
  title: "Terms of Service",
  lede: "The ground rules for using MoveUs. Plain language where we can manage it.",
  lastUpdatedDate: "June 2026",
  sections: [
    { id: "acceptance", title: "Acceptance of terms" },
    { id: "accounts", title: "Your account" },
    { id: "conduct", title: "Community conduct" },
    { id: "events", title: "Events and meetups" },
    { id: "content", title: "Your content" },
    { id: "liability", title: "Limitation of liability" },
    { id: "changes", title: "Changes to these terms" },
    { id: "contact", title: "Contact us" },
  ],
};

export const privacyContent: LegalContent = {
  documentTitle: "Privacy Policy",
  eyebrow: "Legal",
  title: "Privacy Policy",
  lede: "What we collect, why we collect it, and the control you have over it.",
  lastUpdatedDate: "June 2026",
  sections: [
    { id: "collect", title: "What we collect" },
    { id: "use", title: "How we use it" },
    { id: "sharing", title: "Sharing and disclosure" },
    { id: "location", title: "Location data" },
    { id: "rights", title: "Your rights" },
    { id: "retention", title: "Data retention" },
    { id: "contact", title: "Contact us" },
  ],
};

export const cookiesContent: LegalContent = {
  documentTitle: "Cookie Policy",
  eyebrow: "Legal",
  title: "Cookie Policy",
  lede: "The cookies we use to keep MoveUs running and how to control them.",
  lastUpdatedDate: "June 2026",
  sections: [
    { id: "what", title: "What are cookies" },
    { id: "types", title: "Types we use" },
    { id: "essential", title: "Essential cookies" },
    { id: "analytics", title: "Analytics cookies" },
    { id: "managing", title: "Managing cookies" },
    { id: "contact", title: "Contact us" },
  ],
};
