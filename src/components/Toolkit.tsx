import { Reveal } from "./animations";
import SectionHead, { type Head } from "./SectionHead";

/*
  What the work is built with, grouped by kind. Every entry restates a tool
  the rest of the site already names (the services, the case studies, the
  career history), so this list and those can't disagree.
*/
const TOOLKIT = [
  { group: "Front end", items: ["React", "Next.js", "TypeScript", "Tailwind", "HTML5 & CSS3"] },
  { group: "Back end", items: ["Node.js", "MongoDB", "REST APIs", "Webhooks"] },
  { group: "Mobile", items: ["React Native"] },
  { group: "Payments & integrations", items: ["Stripe", "GoHighLevel"] },
  { group: "AI", items: ["LLM APIs", "Retrieval over your own data"] },
  { group: "Design", items: ["Figma", "Design systems"] },
];

const HEAD: Head = {
  eyebrow: "Toolkit",
  title: "What I build",
  em: "with",
  lede: "The MERN stack (MongoDB, Express, React and Node.js) is the backbone of most projects, plus whatever else the job needs.",
};

export default function Toolkit({ head = HEAD }: { head?: Head }) {
  return (
    <section id="toolkit" className="section bg-grid">
      <div className="rule-top" />
      <div className="shell">
        <SectionHead {...head} />

        <div className="svc-cards svc-cards-3">
          {TOOLKIT.map((t, i) => (
            <Reveal key={t.group} className="svc-cell" delay={(i % 3) * 0.06}>
              <div className="svc-card panel">
                <p className="mono-label">{t.group}</p>
                <ul className="svc-tags">
                  {t.items.map((item) => (
                    <li key={item}>
                      <span className="tag">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
