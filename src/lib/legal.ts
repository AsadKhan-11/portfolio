/*
  The words of the two legal pages, in one place. Each document is a list of
  sections; a section is a heading and blocks, where a block is a paragraph
  (a string) or a list (an array of strings). The pages render them and the
  table of contents is built from the headings, so adding a section is adding
  an entry here.

  These describe how the site and the studio actually work today (what the
  contact form collects, which services touch it, what each package promises).
  If any of that changes, change the text with it.
*/
import { CONTACT_EMAIL } from "./contactFields";

export type Block = string | string[];

export interface LegalSection {
  id: string;
  title: string;
  body: Block[];
}

export interface LegalDoc {
  slug: "privacy" | "terms";
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  updated: string;
  updatedLabel: string;
  sections: LegalSection[];
}

const UPDATED = "2026-11-11";
const UPDATED_LABEL = "11 November 2026";

export const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy · How WebForge Digital Handles Your Data",
  description:
    "What the WebForge Digital site collects when you send an enquiry, who handles it, how long it is kept and how to ask for it to be corrected or deleted.",
  intro:
    "This policy explains, in plain language, what happens to the information you give this website. The short version: the site asks for your details only when you write to me, uses them to answer you, and does not sell them or run advertising on them.",
  updated: UPDATED,
  updatedLabel: UPDATED_LABEL,
  sections: [
    {
      id: "who",
      title: "Who I am",
      body: [
        "WebForge Digital is a web development studio run by Asad Khan in Lahore, Pakistan. In this policy, “I” and “me” mean the studio.",
        `If you have any question about this policy, write to ${CONTACT_EMAIL}.`,
      ],
    },
    {
      id: "collect",
      title: "What I collect",
      body: [
        "When you send an enquiry through the contact form, I receive what you type into it:",
        [
          "your name and email address (required)",
          "your phone number, budget range and the kind of project you need (optional)",
          "your message",
          "the page you came from, such as a case study or service page, so I know what prompted the enquiry",
        ],
        "If you email me directly instead, I receive your email address and whatever you write.",
        "The site has no accounts, no sign-in and no advertising or analytics cookies. It keeps one small flag in your browser’s session storage so the opening animation does not replay on every page; it holds no personal information and disappears when you close the tab.",
      ],
    },
    {
      id: "technical",
      title: "Technical data",
      body: [
        "Like any website, the servers that deliver this one see the address of the device that is asking for a page, the page requested, and the browser type. This is processed by the hosting provider to deliver the page and keep it secure, and it is not used by me to identify you.",
        "The contact form uses Cloudflare Turnstile to tell people from automated programs. Turnstile may collect limited technical signals from your browser for that purpose.",
      ],
    },
    {
      id: "use",
      title: "How I use it",
      body: [
        "I use your enquiry for one purpose: to reply to you and, if we agree to work together, to scope and quote the project. I do not add you to a mailing list, and I do not send marketing email you did not ask for. The form does not send you an automatic reply.",
        "If we start a project, what you share while we work together is handled as set out in the Terms of Service.",
      ],
    },
    {
      id: "sharing",
      title: "Who it is shared with",
      body: [
        "I do not sell your information. It passes through the services that make the site and the form work:",
        [
          "Cloudflare, which hosts the site, serves its pages and runs the bot check on the form",
          "Resend, which delivers the enquiry from the site to my inbox",
          "Hostinger, which provides the mailbox where I read and answer enquiries",
        ],
        "Each of these processes data under its own privacy terms. I may also disclose information if the law requires it.",
      ],
    },
    {
      id: "transfers",
      title: "Where it is processed",
      body: [
        "I am based in Pakistan and the services above operate internationally, so your information may be processed in countries other than your own.",
      ],
    },
    {
      id: "retention",
      title: "How long I keep it",
      body: [
        "Enquiries stay in my mailbox for as long as they are useful for the conversation and for my records of past and potential projects. If an enquiry does not lead to work, I delete it within a reasonable time, and I will delete it sooner if you ask.",
      ],
    },
    {
      id: "rights",
      title: "Your choices",
      body: [
        "You can ask me at any time to:",
        [
          "tell you what I hold about you",
          "correct anything that is wrong",
          "delete your enquiry and the details in it",
          "stop contacting you",
        ],
        `Email ${CONTACT_EMAIL} and I will act on it. Depending on where you live, you may have further rights under your local data-protection law, and you can complain to your local data-protection authority.`,
      ],
    },
    {
      id: "security",
      title: "Security",
      body: [
        "The form is sent over an encrypted connection, the mail service’s key is kept on the server and never in the page, and the form accepts only the fields it expects. No system is perfectly secure, but I take reasonable care with what you send me.",
      ],
    },
    {
      id: "children",
      title: "Children",
      body: ["The site is for businesses and adults. It is not directed at children, and I do not knowingly collect their information."],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "If I change how the site handles information, I will update this page and its date. The date at the top says when it last changed.",
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  metaTitle: "Terms of Service · Working With WebForge Digital",
  description:
    "The terms WebForge Digital projects run on: fixed quotes, revisions, payment, who owns the code, support after launch and how either side can end the work.",
  intro:
    "These terms cover this website and the web design and development work I do for clients. They are meant to be read: the point is that both of us know what to expect before any work begins.",
  updated: UPDATED,
  updatedLabel: UPDATED_LABEL,
  sections: [
    {
      id: "about",
      title: "About these terms",
      body: [
        "WebForge Digital is a web development studio run by Asad Khan in Lahore, Pakistan (“I”, “me”). “You” is the person or business that commissions work. A written quote or proposal that I send you, once you accept it, forms an agreement together with these terms. If the two differ, the quote wins for that project.",
      ],
    },
    {
      id: "services",
      title: "Services and quotes",
      body: [
        "I design, build and launch websites, client portals and web applications, including AI features, integrations and e-commerce. After we talk through what you need, I send a fixed quote that states the scope, the price, the timeline and what is not included.",
        "A price listed on the website, such as “from $1,500”, is a starting point and not an offer. The price that applies is the one in your written quote. Work beyond the agreed scope is quoted separately and only done once you agree to it.",
      ],
    },
    {
      id: "payment",
      title: "Payment",
      body: [
        "Payment is due as set out in the quote, in the currency it states. The price is a one-off project cost: there is no subscription and no retainer. If an invoice is late, I may pause work until it is settled. Costs of third-party services, such as domains, hosting or software licences, are yours unless the quote says I am covering them.",
      ],
    },
    {
      id: "revisions",
      title: "Revisions and feedback",
      body: [
        "Revisions are unlimited within the agreed scope: we keep refining until the work matches what the quote describes. A change to the scope itself, such as a new feature or page that was not in the quote, is quoted separately and only done once you agree to it. Prompt feedback keeps the timeline: if you are slow to review or to supply what I need, the dates move with you.",
      ],
    },
    {
      id: "responsibilities",
      title: "What I need from you",
      body: [
        "You agree to give me the content, access and decisions the project needs, on time, and to have the right to use everything you supply, including text, images, logos and data. You are responsible for the accuracy of your content and for how your own business uses what I build.",
      ],
    },
    {
      id: "ownership",
      title: "Who owns the work",
      body: [
        "Once the final invoice is settled, the code, designs and assets I create for you are yours, together with the accounts set up for the project. Until then they remain mine, and I may withhold delivery of the finished work.",
        "Open-source libraries and third-party tools are used under their own licences, which still apply. I keep the right to reuse general knowledge, techniques and my own pre-existing tools, and to describe the project in my portfolio unless we agree in writing that I may not. Where a client asked for confidentiality, I show only a rebuilt version with names and data changed.",
      ],
    },
    {
      id: "support",
      title: "Support after launch",
      body: [
        "Every project includes 30 days of support after launch for issues that arise from my work. That covers fixing defects; it does not cover new features, changes to the scope, or problems caused by changes made by someone else. After the 30 days, ongoing work is available at an agreed rate, and there is no retainer to sign.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party services",
      body: [
        "Projects often depend on services I do not run, such as payment processors, hosting, email and AI model providers. They are subject to their own terms and can change or fail. I am not responsible for their availability, pricing or behaviour, but I will help you work around problems that affect the project.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      body: [
        "I treat the non-public information you share about your business as confidential and use it only for your project. This does not apply to information that is already public, that I already had, or that I am legally required to disclose.",
      ],
    },
    {
      id: "liability",
      title: "Liability",
      body: [
        "I build with care and test what I deliver, but software is complex and I cannot promise it will be free of every fault or suit every purpose. To the extent the law allows, I am not liable for indirect or consequential losses such as lost profit or data, and my total liability for any claim is limited to the fees you paid for the work in question. Nothing here limits liability that cannot be limited by law.",
      ],
    },
    {
      id: "ending",
      title: "Ending the work",
      body: [
        "Either of us may end a project in writing. If you end it, you pay for the work done up to that point and any costs I have already committed. If I end it, I will tell you why and hand over what has been completed and paid for.",
      ],
    },
    {
      id: "website",
      title: "Using this website",
      body: [
        "The content of this site, including its text, design and the case studies, belongs to WebForge Digital. You may read it and share links to it. Please do not copy it or use it to mislead others, and do not misuse the contact form. Case studies of confidential client work are rebuilt with new names and data and are shown only to illustrate the kind of work I do.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      body: [
        "These terms are governed by the laws of Pakistan. If we cannot resolve a disagreement by talking it through, the courts of Lahore have jurisdiction, unless your quote states otherwise.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "I may update these terms from time to time. The version in force when you accept a quote is the one that applies to that project. The date at the top says when this page last changed.",
        `Questions? Write to ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const LEGAL: LegalDoc[] = [PRIVACY, TERMS];
