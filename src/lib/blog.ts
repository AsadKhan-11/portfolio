/*
  The blog, in one place. Each post is a title, a short summary and a list of
  sections; a section is a heading and blocks, where a block is a paragraph (a
  string) or a list (an array of strings), the same shape the legal pages use.
  The post page builds its table of contents from the headings, and the index,
  the sitemap and llms.txt read this list, so adding a post is adding an entry
  here and nothing else.

  Inside a paragraph or a list item, [label](/path) is a link.

  Every post restates something the rest of the site already says (the
  packages, the services, the FAQs, the case studies). Prices are read from
  packages.ts so they cannot drift. Keep it that way when editing: a fact
  belongs in one place, and a post should never promise more than the page it
  links to.

  House style: written in the first person, in plain words, with no dashes
  used as punctuation (a comma, a colon or a full stop does the job) and "to"
  in ranges. The check at the foot of this file reports any that slip in.
*/
import { getPackage } from "./packages";
import type { Block } from "./legal";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const launch = getPackage("Launch");
const build = getPackage("Build");
const scale = getPackage("Scale");

export interface PostSection {
  id: string;
  title: string;
  body: Block[];
}

export interface Post {
  slug: string;
  /** The headline on the page. */
  title: string;
  /** The <title>: 50 to 60 characters, with the words people search for first. */
  metaTitle: string;
  /** 120 to 160 characters. */
  description: string;
  /** The topic, as a chip on the card and in the post's header. */
  category: string;
  published: string;
  publishedLabel: string;
  intro: string;
  sections: PostSection[];
  /** The pages this post hands the reader on to, shown under it. */
  related: { label: string; href: string }[];
  /** The line above the contact form at the foot of the post. */
  cta: string;
}

export const POSTS: Post[] = [
  {
    slug: "how-much-does-a-custom-website-cost",
    title: "How much does a custom website cost?",
    metaTitle: "How Much Does a Custom Website Cost in 2026? Real Prices",
    description:
      "What a custom website costs, what moves the price, and what a developer should tell you before you pay. Real numbers from fixed-price packages.",
    category: "Pricing",
    published: "2026-11-12",
    publishedLabel: "12 November 2026",
    intro:
      "Ask five developers what a custom website costs and you will get five numbers that have nothing to do with each other. Nobody is hiding anything. The question is just missing half its details. Here is how I think about the price, what moves it, and what you should be told before you pay anything.",
    sections: [
      {
        id: "what-you-pay-for",
        title: "What you are actually paying for",
        body: [
          "A custom website is design, build and launch by someone who is accountable for how it turns out. You are not paying for a template with your logo dropped in. You are paying for a site laid out around what your visitors need to do, written in code you own, and set up so it loads quickly and can be found.",
          "Most of the cost is time. More pages, more screens, more user roles and more connections to other tools all mean more time, and that is the whole reason prices differ.",
        ],
      },
      {
        id: "price-ranges",
        title: "Typical price ranges",
        body: [
          "I sell three fixed-price packages, so I can answer this with real numbers instead of a shrug.",
          [
            `Launch, from ${money(launch.price)}: a custom-designed site of up to 5 pages, mobile-first, with basic on-page SEO and a contact form wired to your inbox. Live in about 2 weeks.`,
            `Build, from ${money(build.price)}: everything in Launch plus a custom full-stack application, user accounts, an admin dashboard and integrations with the tools you already use. Live in 4 to 6 weeks.`,
            `Scale, from ${money(scale.price)}: everything in Build plus AI features, payments and subscriptions, and a performance and accessibility audit, with priority turnaround.`,
          ],
          "Those are starting points, not a menu to pick from blind. After we talk, I send one fixed quote for your actual scope. The [packages page](/packages) has the full lists side by side.",
        ],
      },
      {
        id: "what-moves-the-price",
        title: "What moves the price up or down",
        body: [
          "When a quote comes back higher or lower than you expected, it is almost always one of these:",
          [
            "How many pages or screens there are, and how different each one is.",
            "Whether people log in. Accounts, roles and an admin dashboard are a project of their own.",
            "Connections to other tools: a CRM, email, a calendar, a payment processor.",
            "Payments and subscriptions, because money has to be handled carefully.",
            "AI features, which need data, limits and a fallback when the model is unsure.",
            "Whether your copy and images are ready. Waiting on content is the most common reason a launch slips.",
            "The deadline. A rush costs more because other work has to move.",
          ],
        ],
      },
      {
        id: "fixed-or-hourly",
        title: "Fixed price or hourly?",
        body: [
          "A fixed price puts the risk of getting the estimate wrong on me, not on you. Hourly billing is fine for open-ended work, but it is a poor way to buy a website, because every delay and every misunderstanding lands on your invoice.",
          "The catch with a fixed price is scope. If you add a new feature halfway through, I quote it separately before any work starts. Changes inside the agreed scope are a different matter: revisions are unlimited on every package, so we keep refining until you are happy with what was scoped.",
        ],
      },
      {
        id: "costs-after-the-build",
        title: "Costs that come after the build",
        body: [
          "A quote for the build is only half a quote. A site also has running costs: a domain name, hosting, and any third-party service it uses, such as email delivery, payment processing fees or usage-based AI. Ask for these to be listed up front so there are no surprises in month three.",
          "Two things that should not cost you extra: ownership and a soft landing. Once the final invoice is settled, the repository, assets and accounts set up for the project are yours, with nothing that requires you to keep paying me to keep the site running. And every project includes 30 days of support after launch.",
        ],
      },
      {
        id: "questions-to-ask",
        title: "Five questions to ask any developer",
        body: [
          "Whoever you hire, ask these before you agree to anything:",
          [
            "Is the price fixed, and what exactly does it cover?",
            "What happens if I want to change something halfway through?",
            "Who owns the code and the accounts when we finish?",
            "Can I see a working version before launch, not just at the end?",
            "What will I pay each month once the site is live?",
          ],
          "If any answer is vague, treat that as the answer.",
        ],
      },
      {
        id: "get-a-number",
        title: "The fastest way to a real number",
        body: [
          "If you already know roughly what you need, [send the contact form](/contact) with a few lines about the project and your budget range. I reply within a day, with questions or with a fixed quote once the scope is clear. If you would rather talk it through, [book a call](/book) and start with the 15 minute intro.",
        ],
      },
    ],
    related: [
      { label: "The packages", href: "/packages" },
      { label: "Full-stack web apps", href: "/services/web-apps" },
      { label: "Pricing and time FAQs", href: "/faqs#price-and-time" },
    ],
    cta: "Want a fixed quote for your project? Send a few lines about what you need and I will reply within a day.",
  },

  {
    slug: "web-app-or-mobile-app-first",
    title: "Web app or mobile app: which should you build first?",
    metaTitle: "Web App or Mobile App First? How to Choose in 2026",
    description:
      "Should your first product be a web app or a mobile app? A practical way to decide, based on how people will use it, what it costs and how fast you can ship.",
    category: "Mobile apps",
    published: "2026-11-12",
    publishedLabel: "12 November 2026",
    intro:
      "Founders ask me this more than almost anything else: should we build an app or a website? Most of the time the honest answer is that one of them can wait, and choosing the right one first saves months and a good part of the budget.",
    sections: [
      {
        id: "who-and-where",
        title: "Start with who uses it and where",
        body: [
          "Picture your user at the moment they need the product. Are they at a desk, on a laptop, opening a link someone sent them? That is a web app. Are they standing in a queue, walking into a gym, using the camera or checking notifications all day? That points to a mobile app.",
          "The device follows the situation, not the other way round.",
        ],
      },
      {
        id: "when-web-wins",
        title: "When a web app is the better first step",
        body: [
          [
            "You need to launch quickly and learn what people actually do.",
            "Users arrive from search, email or a shared link.",
            "The product is mostly forms, dashboards, bookings or reports.",
            "Several people need the same data, as in a client portal or an admin panel.",
          ],
          "A responsive web app works on phones too, needs no store approval, and a fix can go live the same day. For most first versions it is the cheaper and faster way to find out whether the idea works. I build these as [full-stack web apps](/services/web-apps).",
        ],
      },
      {
        id: "when-mobile-wins",
        title: "When a mobile app is worth it from day one",
        body: [
          [
            "You need push notifications that people actually respond to.",
            "The camera, location or offline use are central to the product.",
            "People will use it many times a day and expect it on their home screen.",
            "Your category already lives in the app stores and users search for it there.",
          ],
          "I build [mobile apps](/services/mobile-apps) in React Native, which means one codebase can serve iOS and Android. Each platform is still scoped and quoted separately, because store rules, testing and release steps differ. You can launch on the platform most of your customers use and add the other later.",
        ],
      },
      {
        id: "cost-and-time",
        title: "How cost and time compare",
        body: [
          "A mobile app usually takes longer and costs more than a web app with the same features. Most of the difference is testing on real devices and store review. Updates go through that review too, so a fix can take days rather than minutes.",
          `For scale: a first product with accounts and a back end sits in the Build package, from ${money(build.price)} and 4 to 6 weeks. A mobile app for one platform fits inside Build, the second platform is quoted separately, and adding AI features or payments moves it into Scale. The [packages page](/packages) shows what each includes.`,
        ],
      },
      {
        id: "a-working-example",
        title: "A working example: Curbly",
        body: [
          "Curbly is a concept I built to show the idea. Customers order ahead and walk up to a pickup code, and vendors run the day from the same app. It is a working prototype with sample data, not a live product, and I would not describe it as more than that.",
          "I mention it because it shows why an ordering product wants a phone app. The pickup code, the notifications and the speed all matter more on a phone than on a desktop. You can [read the Curbly case study](/work/curbly) to see both sides of it.",
        ],
      },
      {
        id: "a-sensible-order",
        title: "A sensible order to build in",
        body: [
          "For many products the order is web app first, learn from real users, then build the mobile app once the core is proven. Flip it when the phone features are the product itself.",
          "If you cannot tell which camp you are in, [book a 30 minute project call](/book) and describe the idea. I will tell you which one I would build first, even when the answer is the cheaper one.",
        ],
      },
    ],
    related: [
      { label: "Mobile apps", href: "/services/mobile-apps" },
      { label: "Full-stack web apps", href: "/services/web-apps" },
      { label: "Curbly case study", href: "/work/curbly" },
    ],
    cta: "Not sure whether you need an app or a website? Describe the idea and I will tell you which to build first.",
  },

  {
    slug: "add-ai-to-an-existing-product",
    title: "How to add AI to a product you already have",
    metaTitle: "How to Add AI to an Existing Product Without Breaking It",
    description:
      "A practical guide to adding AI features to a product that already works: choosing the job, using your own data, handing over to people and controlling cost.",
    category: "AI integration",
    published: "2026-11-12",
    publishedLabel: "12 November 2026",
    intro:
      "Most businesses that ask me about AI are not starting from scratch. They have a product, a customer base and a codebase that works, and they want to add something smart without breaking any of it. That is very doable, and most of the work is in the decisions around the model, not the model itself.",
    sections: [
      {
        id: "start-with-a-job",
        title: "Start with a job, not a model",
        body: [
          "The question is not which model to use. It is which repeated task is eating your team's time or slowing your customers down. Good first jobs tend to be answering the same questions again and again, summarising long records, drafting replies for a person to approve, searching your own documents, or scoring incoming leads.",
          "Pick one. A single feature that works well teaches you more than five that half work.",
        ],
      },
      {
        id: "read-the-code-first",
        title: "Read the code before touching it",
        body: [
          "When I take on AI work for an existing product, I start by reading the code and telling you honestly what shape it is in. Sometimes the right answer is a small, separate service that the product calls. Sometimes something needs tidying first. Either way, the new feature goes in without disturbing what already works.",
          "I also build it so that it can be switched off without touching the rest of the product. That is a safety net you will be glad of the first time something behaves oddly.",
        ],
      },
      {
        id: "use-your-own-data",
        title: "Let it answer from your own data",
        body: [
          "A model that answers from its general knowledge will sound confident and will sometimes be wrong. One that answers from your own documents, records and catalogue, and shows which ones it used, is something a customer or a member of staff can check.",
          "That one choice does more for trust than any amount of clever prompting.",
        ],
      },
      {
        id: "hand-over-to-people",
        title: "Decide when it hands over to a person",
        body: [
          "Every AI feature needs a rule for when it stops and a human takes over: when it is not sure, when the topic is sensitive, when the customer asks for a person. Build that in from the start, not after the first complaint.",
          "A human fallback and a log of what the model said and why are part of how I ship AI features, together with usage limits so the bill cannot run away.",
        ],
      },
      {
        id: "keep-people-in-control",
        title: "Keep your people in control",
        body: [
          "In my Ironside case study, the AI builds plans from the gym's own catalogue, and trainers stay in control of what members actually receive. That balance is usually right: the model does the first draft, a person approves it. Ironside is confidential client work, shown with the names and data changed, and the case study says so.",
          "You can see how the pieces fit in the [Ironside case study](/work/ironside-gym).",
        ],
      },
      {
        id: "running-costs",
        title: "What it costs to run",
        body: [
          "Most AI features are billed by usage. That means the cost of running one grows with how much it is used, so it is worth asking for an estimate of monthly running costs before you commit, and for limits that cap it.",
          `On the build side, AI features are part of the Scale package, from ${money(scale.price)}. If you already have a product and want one feature added, we can scope that on its own. Details are on the [AI integration page](/services/ai-integration).`,
        ],
      },
      {
        id: "first-step",
        title: "A sensible first step",
        body: [
          "Write down the one task you would most like to stop doing by hand, who does it today, and what a good answer looks like. Bring that to a [30 minute project call](/book) and we can work out whether AI is the right tool or whether something simpler gets you there.",
        ],
      },
    ],
    related: [
      { label: "AI integration", href: "/services/ai-integration" },
      { label: "Ironside case study", href: "/work/ironside-gym" },
      { label: "AI questions in the FAQs", href: "/faqs#what-i-build" },
    ],
    cta: "Have a product that could use an AI feature? Tell me what it does today and what you would like it to do.",
  },

  {
    slug: "what-a-business-chatbot-can-and-cant-do",
    title: "What a business chatbot can and can't do",
    metaTitle: "What a Business Chatbot Can and Can't Do for Your Site",
    description:
      "An honest look at business chatbots: where they save time, where they fail, how a good hand-over to a human works and what to ask before you buy one.",
    category: "Chatbots",
    published: "2026-11-12",
    publishedLabel: "12 November 2026",
    intro:
      "A chatbot on your website can answer questions at midnight and sort serious enquiries from casual ones. It can also confidently tell a customer something wrong. Whether you get the first or the second depends almost entirely on how it is designed, so here is what I would tell any business thinking about one.",
    sections: [
      {
        id: "what-it-does-well",
        title: "What a chatbot does well",
        body: [
          [
            "Answering the questions your team gets asked every week: hours, prices, how a process works, where to find something.",
            "Being there outside office hours, so a visitor at 11 pm gets an answer instead of an unanswered form.",
            "Asking a few qualifying questions, such as what the person needs, by when and for roughly what budget, so you meet leads that are already sorted.",
            "Taking the first pass at a request and passing it on with the details already collected.",
          ],
        ],
      },
      {
        id: "what-it-cant-do",
        title: "What it can't do",
        body: [
          "A chatbot does not have judgment, and it is not accountable. It should not decide refunds, promise delivery dates it cannot see, give advice that carries legal or medical weight, or handle a situation nobody wrote down. If you let it guess in those moments, it will, and it will sound sure of itself.",
          "A well-built assistant is designed around that limit. It is allowed to say it does not know.",
        ],
      },
      {
        id: "your-own-knowledge",
        title: "Give it your own knowledge",
        body: [
          "A bot that only knows what a general model knows will invent plausible details about your business. A bot that answers from your own pages, policies and documents, and shows where an answer came from, is far safer and far more useful.",
          "That also gives you something to improve. The questions it could not answer tell you what is missing from your website.",
        ],
      },
      {
        id: "the-hand-over",
        title: "The hand-over is the feature",
        body: [
          "The most important part of a chatbot is what happens when it gets out of its depth. A good one hands the conversation to a person with the whole exchange attached, so the customer never has to repeat themselves. A bad one loops, or apologises forever.",
          "I build assistants to hand over when they are unsure or when the visitor asks for a person, and to keep a log so a team can see what was asked and review the answers that missed.",
        ],
      },
      {
        id: "scoring-leads",
        title: "Using one to qualify leads",
        body: [
          "In my Vector Academy case study, an assistant answers questions from the academy's own knowledge and scores every applicant before the first call, then hands the conversation to a person. Vector is confidential client work, shown with names and data changed, and the case study says so.",
          "The point of the example is the pattern: answer from real knowledge, qualify early, hand over cleanly. See the [Vector Academy case study](/work/vector-academy).",
        ],
      },
      {
        id: "questions-to-ask",
        title: "What to ask before you buy one",
        body: [
          [
            "Does it say so when it does not know?",
            "Can a person take over, and do they see the conversation so far?",
            "Is every conversation logged so I can review it?",
            "What does it answer from, and can it show the source?",
            "Where is the conversation data stored, and who can see it?",
          ],
          "A vendor who cannot answer these clearly is selling you a demo, not a tool.",
        ],
      },
      {
        id: "next-step",
        title: "Where to start",
        body: [
          `Assistants are part of the Scale package, from ${money(scale.price)}. A bot on its own, for a site you already have, can be scoped separately. The [chatbots and assistants page](/services/chatbots-assistants) explains how it works, and a [quick call](/book) is the easiest way to find out if a bot would help you at all.`,
        ],
      },
    ],
    related: [
      { label: "Chatbots and assistants", href: "/services/chatbots-assistants" },
      { label: "Vector Academy case study", href: "/work/vector-academy" },
      { label: "Book a call", href: "/book" },
    ],
    cta: "Thinking about a chatbot for your site? Tell me what your team answers most often and we can see if it fits.",
  },

  {
    slug: "what-to-automate-first-in-your-crm",
    title: "What to automate first in your CRM",
    metaTitle: "CRM Automation: What to Automate First for Small Teams",
    description:
      "Most small teams have a copy-paste problem, not a CRM problem. Here is the order I would automate things in, and what to leave alone for now.",
    category: "CRM & automation",
    published: "2026-11-12",
    publishedLabel: "12 November 2026",
    intro:
      "Most small teams do not have a CRM problem. They have a copy-paste problem. A lead arrives in one place, someone retypes it into another, a status is updated in two tools, and a follow-up lives in somebody's head. Automating that work pays off quickly, if you do it in the right order.",
    sections: [
      {
        id: "find-the-copy-paste",
        title: "Find the copy-paste first",
        body: [
          "Before you automate anything, watch one week of your team's work and write down every time someone moves the same information from one tool to another. Typical culprits:",
          [
            "Copying a form enquiry into a spreadsheet or the CRM.",
            "Emailing the new lead a reply you have sent a hundred times.",
            "Updating a deal's status in the CRM and again in a project tool.",
            "Remembering to follow up with people who went quiet.",
          ],
          "That list is your backlog, and it is usually obvious which item hurts most.",
        ],
      },
      {
        id: "capture-first",
        title: "1. Capture every lead in one place",
        body: [
          "Start where the money enters. Every enquiry, whether from the website form, a booking or a message, should land in the CRM automatically with its source and the details the person gave. No retyping, no leads lost in an inbox.",
          "It also means you can finally answer the question of which pages and channels bring in work worth having.",
        ],
      },
      {
        id: "follow-up-second",
        title: "2. Then automate the first reply and the follow-up",
        body: [
          "Speed matters. A short, personal-sounding acknowledgement within minutes, and a reminder for you when a lead has gone a few days without a reply, will do more for your close rate than almost any other change.",
          "Keep the messages short and human. The goal is to make sure nobody falls through the cracks, not to replace the conversation.",
        ],
      },
      {
        id: "keep-tools-in-step",
        title: "3. Keep your other tools in step",
        body: [
          "Once capture and follow-up work, connect the rest. A two-way sync means that when a status changes in one tool, the other tool agrees, with no one doing it by hand. This is the part that is most often done badly, so it is worth doing carefully: two-way syncs need clear rules for which side wins when both change.",
        ],
      },
      {
        id: "leave-alone",
        title: "What to leave manual for now",
        body: [
          [
            "Anything that happens only a few times a month. The setup costs more than it saves.",
            "Anything where the process is still changing. Automate what has settled.",
            "Real conversations with important customers. Those should stay personal.",
          ],
        ],
      },
      {
        id: "an-example",
        title: "What it looks like in a real build",
        body: [
          "My Ironside case study is a gym platform where leads flow into the CRM, a member has one record across the whole system, and the CRM stays in step with the rest of the app. Ironside is confidential client work, shown with names and data changed, and the case study says so.",
          "Read the [Ironside case study](/work/ironside-gym) for how the pieces connect.",
        ],
      },
      {
        id: "get-started",
        title: "Getting started",
        body: [
          `Integrations with the tools you use are part of the Build package, from ${money(build.price)}. A stand-alone automation project is scoped on its own. The [CRM and automation page](/services/crm-automation) covers how a project runs, or [book a call](/book) and walk me through your current process.`,
        ],
      },
    ],
    related: [
      { label: "CRM and automation", href: "/services/crm-automation" },
      { label: "Ironside case study", href: "/work/ironside-gym" },
      { label: "The packages", href: "/packages" },
    ],
    cta: "Drowning in copy-paste? Tell me which tools you use and where the time goes.",
  },

  {
    slug: "hiring-a-web-developer-in-pakistan",
    title: "Hiring a web developer in Pakistan: what to check first",
    metaTitle: "Hiring a Web Developer in Pakistan: What to Check First",
    description:
      "Thinking about hiring a freelance developer in Pakistan? What to check on time zones, quotes, ownership and communication, from a developer based in Lahore.",
    category: "Working together",
    published: "2026-11-12",
    publishedLabel: "12 November 2026",
    intro:
      "I am a developer in Lahore, and most of my clients are outside Pakistan. So I have been on the other side of this decision many times, watching people work out whether to trust someone they have never met, in another country, on another clock. Here is what I would check if I were the one hiring.",
    sections: [
      {
        id: "time-zones",
        title: "Time zones are less of a problem than you think",
        body: [
          "Lahore is UTC+5. That overlaps comfortably with Europe, the Middle East and much of Asia. For the US, I keep early evenings free for calls, which lands in a normal working morning for you.",
          "Beyond the call hours, good remote work runs on written updates and a staging link, so you can open a working version any day of the week and see where things stand. You should never be waiting on a timezone to see progress.",
        ],
      },
      {
        id: "what-to-check",
        title: "What to check before you hire anyone",
        body: [
          "This applies to a developer in any country:",
          [
            "Live work you can open and click through, not only screenshots.",
            "Who actually does the building. Is it the person you are talking to, or a team behind them?",
            "A written quote that says what is included and what counts as finished.",
            "Who owns the code and the accounts at the end.",
            "How often you will hear from them, and how fast they reply.",
          ],
          "A confident developer is happy to be asked these. If the answers are slippery, move on.",
        ],
      },
      {
        id: "quote-and-scope",
        title: "Insist on a clear quote",
        body: [
          "A fixed price with a written scope protects both sides. You know what you will pay, and the developer knows what they are building. Anything outside the scope gets quoted before work starts, so nobody is surprised by an invoice.",
          `As a reference point, my packages start from ${money(launch.price)} for a custom site and ${money(build.price)} for a full-stack application, and you can see exactly what each includes on the [packages page](/packages).`,
        ],
      },
      {
        id: "ownership",
        title: "Make ownership explicit",
        body: [
          "The code, the assets and any accounts created for the project should end up in your name once the final invoice is settled. Nothing should depend on the developer for the site to keep running: no proprietary framework, no hosting you cannot move.",
          "Put it in writing before the work starts. It is an easy conversation at the beginning and a painful one at the end.",
        ],
      },
      {
        id: "communication",
        title: "Look at how they communicate before you pay",
        body: [
          "Your first conversations are a preview of the whole project. Did they reply promptly? Did they ask good questions about your business, or just send a price? Did they tell you honestly when something was a bad idea or a simpler build would do?",
          "I reply to enquiries within a day, and I will tell you if I think a deadline is not achievable before we start, rather than after.",
        ],
      },
      {
        id: "how-i-work",
        title: "How a project with me runs",
        body: [
          "You send the contact form or book a call, I come back with questions or a fixed quote, and you get a staging link from day one. Every project includes a handover you can act on and 30 days of support after launch. You can read how it works in the [FAQs](/faqs#working-together), see the [process](/services#process), or look at the [projects](/work) I have built.",
          "If you want to see how I communicate first, [book a call](/book). The 15 minute intro is enough to find out whether we suit each other.",
        ],
      },
    ],
    related: [
      { label: "About Asad", href: "/about" },
      { label: "How a project runs", href: "/services#process" },
      { label: "Working together FAQs", href: "/faqs#working-together" },
    ],
    cta: "Ready to talk about your project? Send a few lines and I will reply within a day.",
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** Words in a post, counted from what the page shows, for the reading time. */
const flat = (blocks: Block[]) => blocks.flatMap((b) => (Array.isArray(b) ? b : [b]));

export const readingMinutes = (post: Post) => {
  const text = [post.intro, ...post.sections.flatMap((s) => [s.title, ...flat(s.body)])].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

/** The other posts, newest first, for the "keep reading" row under a post. */
export const otherPosts = (slug: string, count = 3) =>
  POSTS.filter((p) => p.slug !== slug)
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, count);

/* A post with a dash in it breaks the house style; say so in the build log. */
for (const p of POSTS) {
  const text = JSON.stringify(p);
  if (/[\u2014\u2013]/.test(text)) console.warn(`[blog] ${p.slug} contains an em or en dash.`);
}
