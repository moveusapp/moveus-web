/**
 * Legal documents are intentionally English-only: they're a single canonical
 * version and are not localized. Keep them out of the translation files.
 * (The About page stays translated; this is just the legal copy.)
 */

/** A block of legal body copy. Sections without a body fall back to placeholder. */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = { id: string; title: string; body?: LegalBlock[] };

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
  lede: "MoveUs is in open beta, so we're keeping this short. Here are the ground rules for using the app while we build it out.",
  lastUpdatedDate: "June 3, 2026",
  sections: [
    {
      id: "welcome",
      title: "The basics",
      body: [
        {
          type: "p",
          text: "MoveUs is run by MoveUs j.d.o.o., a company registered in Croatia at Pićan 45, Pićan, Istarska županija 52000. When we say \"we,\" \"us,\" or \"MoveUs\" we mean the company; \"you\" means you, the person using the app.",
        },
        {
          type: "p",
          text: "By creating an account or using MoveUs, you agree to these terms. If you don't agree with them, please don't use the app. We're currently in an open beta, so expect things to change and improve quickly.",
        },
        {
          type: "p",
          text: "Questions about these terms? Email us any time at contact@moveusapp.com.",
        },
      ],
    },
    {
      id: "beta",
      title: "This is a beta",
      body: [
        {
          type: "p",
          text: "MoveUs is early-stage software provided on an \"as is\" and \"as available\" basis. Features may break, change, or disappear, data may occasionally be lost, and the app may be unavailable while we work on it. We don't make any guarantees that it will be uninterrupted, error-free, or fit for any particular purpose.",
        },
        {
          type: "p",
          text: "Because this is a beta, we'll be updating these terms as the product matures. We'll let you know about meaningful changes, and continuing to use MoveUs after a change means you accept the updated terms.",
        },
      ],
    },
    {
      id: "account",
      title: "Your account",
      body: [
        {
          type: "p",
          text: "You need to be at least 18 years old to use MoveUs. When you sign up, give us accurate information and keep it up to date.",
        },
        {
          type: "p",
          text: "You're responsible for keeping your password safe and for everything that happens under your account. If you think someone else has gained access to it, let us know.",
        },
      ],
    },
    {
      id: "conduct",
      title: "Being a good community member",
      body: [
        {
          type: "p",
          text: "MoveUs is about getting people moving together, so keep it friendly. When you use the app and meet up with others, please don't:",
        },
        {
          type: "ul",
          items: [
            "Harass, threaten, bully, or discriminate against other people.",
            "Post content that's illegal, hateful, deceptive, or sexually explicit.",
            "Impersonate someone else or misrepresent who you are.",
            "Spam, scrape, or use bots and automated tools against the app.",
            "Try to break, overload, reverse-engineer, or interfere with how MoveUs works.",
          ],
        },
        {
          type: "p",
          text: "If you break these rules, we may remove your content or suspend or close your account. Events and meetups are organized by users, not by us — use common sense and stay safe when you join one in real life.",
        },
      ],
    },
    {
      id: "content",
      title: "Your content",
      body: [
        {
          type: "p",
          text: "Anything you post on MoveUs — messages, photos, event details, and so on — stays yours. We don't claim ownership of it.",
        },
        {
          type: "p",
          text: "To run the app, you give us permission to host, display, and share your content within MoveUs the way the app is designed to work (for example, showing an event you created to other users). You're responsible for what you post, and you confirm you have the right to share it.",
        },
        {
          type: "p",
          text: "We may remove content or limit access if we believe it breaks these terms or could harm other people, though we're not obligated to monitor everything.",
        },
      ],
    },
    {
      id: "liability",
      title: "Liability",
      body: [
        {
          type: "p",
          text: "To the fullest extent allowed by law, MoveUs and its team aren't liable for any indirect or consequential losses arising from your use of the app, including lost data or anything that happens at a meetup you found through MoveUs. Nothing in these terms limits rights you have as a consumer under Croatian or EU law.",
        },
      ],
    },
    {
      id: "law",
      title: "Governing law",
      body: [
        {
          type: "p",
          text: "These terms are governed by the laws of Croatia. If you're a consumer in the EU, you also keep the protections of the mandatory laws of the country where you live.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [
        {
          type: "p",
          text: "Need to reach us about MoveUs or these terms? We'd love to hear from you:",
        },
        {
          type: "p",
          text: "MoveUs j.d.o.o., Pićan 45, Pićan, Istarska županija 52000, Croatia",
        },
        { type: "p", text: "contact@moveusapp.com" },
      ],
    },
  ],
};

export const privacyContent: LegalContent = {
  documentTitle: "Privacy Policy",
  eyebrow: "Legal",
  title: "Privacy Policy",
  lede: "MoveUs is in open beta, and we try to collect only what we need to help you find events and people to move with. Here's the plain-language version.",
  lastUpdatedDate: "June 3, 2026",
  sections: [
    {
      id: "intro",
      title: "The basics",
      body: [
        {
          type: "p",
          text: "MoveUs is run by MoveUs j.d.o.o., based in Croatia. This policy explains what personal information we collect when you use the app, why we collect it, and the control you have over it. We're the company responsible for your information (the \"data controller\" under EU law).",
        },
        {
          type: "p",
          text: "MoveUs is in open beta, so the app and this policy will keep evolving. We don't sell your personal information, and we don't show you third-party ads.",
        },
      ],
    },
    {
      id: "collect",
      title: "What we collect",
      body: [
        {
          type: "p",
          text: "We collect a few kinds of information, mostly things you give us directly:",
        },
        {
          type: "ul",
          items: [
            "Account details — your name, email, password, and anything you add to your profile, like a profile picture.",
            "Preferences — the answers you give in the onboarding survey so we can suggest events and people that fit you.",
            "Location — your approximate or precise location, used to show nearby events and workout partners (see below).",
            "Content you create — events you organize or join, messages you send in chat, friend connections, and similar activity.",
            "Technical information — basic device and usage data such as IP address, device type, and app interactions, collected automatically to keep MoveUs secure and working.",
          ],
        },
        {
          type: "p",
          text: "We don't collect sensitive information (like health, religion, or ethnicity), and we don't knowingly collect anything from people under 18 — you must be 18 or older to use MoveUs.",
        },
      ],
    },
    {
      id: "use",
      title: "How we use it",
      body: [
        { type: "p", text: "We use your information to:" },
        {
          type: "ul",
          items: [
            "Run your account and let you use the app's features.",
            "Recommend events, activities, and people near you that match your preferences.",
            "Let you chat, make connections, and join or organize events.",
            "Keep MoveUs secure, fix bugs, and understand how the beta is being used so we can improve it.",
            "Contact you about your account or important changes to the service.",
          ],
        },
        {
          type: "p",
          text: "We only process your information when we have a valid legal basis under the GDPR — usually to provide the service you signed up for, with your consent, or for our legitimate interest in running and improving MoveUs.",
        },
      ],
    },
    {
      id: "location",
      title: "Location data",
      body: [
        {
          type: "p",
          text: "Location is central to MoveUs — it's how we show you events and workout partners nearby. With your permission, we use your device's location to power these features.",
        },
        {
          type: "p",
          text: "You can turn location access off in your device settings at any time. If you do, parts of the app that rely on finding things near you won't work as well.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      body: [
        {
          type: "p",
          text: "We don't sell your personal information. We share it only in a few limited cases:",
        },
        {
          type: "ul",
          items: [
            "With other users — when you organize or join an event, send a message, or connect with someone, the relevant parts of your profile and activity are visible to them. That's how the community works.",
            "With service providers — trusted companies that help us run MoveUs, such as hosting and infrastructure providers, who may only use your information to provide their service to us.",
            "If you use a social login — when you sign in with a third-party account, we receive basic profile information (like your name, email, and picture) from that provider.",
            "When required by law — if we must to comply with a legal obligation, or as part of a business transfer such as a merger or acquisition.",
          ],
        },
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      body: [
        {
          type: "p",
          text: "We keep your information for as long as your account is active or as needed to provide MoveUs. When you delete your account, we deactivate it and remove your information from our active systems, though some data may linger briefly in backups or be kept where the law requires.",
        },
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      body: [
        {
          type: "p",
          text: "If you're in the EU/EEA, the GDPR gives you rights over your personal information. You can:",
        },
        {
          type: "ul",
          items: [
            "Access the information we hold about you and ask how we use it.",
            "Correct anything that's inaccurate or incomplete.",
            "Delete your account and the personal information tied to it.",
            "Withdraw consent at any time, where we rely on it.",
            "Object to or restrict certain processing, and ask for a copy of your data.",
          ],
        },
        {
          type: "p",
          text: "To exercise any of these, just email us at contact@moveusapp.com. You can also manage much of your information directly in the app. If you think we've mishandled your data, you have the right to complain to the Croatian data protection authority (AZOP).",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [
        {
          type: "p",
          text: "Questions about your privacy or this policy? We're happy to help:",
        },
        {
          type: "p",
          text: "MoveUs j.d.o.o., Pićan 45, Pićan, Istarska županija 52000, Croatia",
        },
        { type: "p", text: "contact@moveusapp.com" },
      ],
    },
  ],
};

export const cookiesContent: LegalContent = {
  documentTitle: "Cookie Policy",
  eyebrow: "Legal",
  title: "Cookie Policy",
  lede: "MoveUs is in open beta, and we keep cookies to the minimum needed to run the app. Here's what we use and how to control them.",
  lastUpdatedDate: "June 3, 2026",
  sections: [
    {
      id: "what",
      title: "What cookies are",
      body: [
        {
          type: "p",
          text: "Cookies are small files placed on your computer or device by a website. They help the site remember things about your visit, like keeping you logged in. MoveUs is operated by MoveUs j.d.o.o., based in Pićan, Croatia, and this policy explains the cookies we use.",
        },
        {
          type: "p",
          text: "Cookies don't usually identify you on their own, but information we store about you may be linked to them. We never store sensitive details like your password in cookies. For the bigger picture on how we handle your data, see our Privacy Policy at moveusapp.com/privacy.",
        },
      ],
    },
    {
      id: "use",
      title: "How we use cookies",
      body: [
        {
          type: "p",
          text: "We only use cookies that help MoveUs work — we don't use them for advertising or third-party tracking. The cookies we set fall into two groups:",
        },
        { type: "h", text: "Essential cookies" },
        {
          type: "p",
          text: "These keep MoveUs running. They sign you in, keep your session secure, and help prevent fraudulent use of accounts. The app can't work properly without them, so they can't be switched off.",
        },
        { type: "h", text: "Functionality cookies" },
        {
          type: "p",
          text: "These remember the choices you make — like your login or language preference — so you don't have to set them every time. They make the app feel more personal, but aren't strictly required.",
        },
      ],
    },
    {
      id: "managing",
      title: "Managing cookies",
      body: [
        {
          type: "p",
          text: "You're in control of cookies. Every major browser — Chrome, Safari, Firefox, and Edge — lets you block or delete cookies from its settings or help pages. You can do this at any time.",
        },
        {
          type: "p",
          text: "Just keep in mind that if you block our essential cookies, parts of MoveUs may stop working or behave unexpectedly.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        {
          type: "p",
          text: "Since MoveUs is still in beta, we may update this Cookie Policy as the app changes. The \"Last updated\" date at the top always shows when we last revised it.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [
        {
          type: "p",
          text: "Questions about our use of cookies? Reach us any time:",
        },
        { type: "p", text: "contact@moveusapp.com" },
      ],
    },
  ],
};
