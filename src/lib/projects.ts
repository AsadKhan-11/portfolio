/*
  A project as a card sees it: what the work shelf on the home page, the
  grids on the projects, services, About and service pages, and the "more
  work" rail on a case study all draw. They share this one shape and one card
  component (components/Work.tsx), built from the case-study data, so a
  project added to src/lib/caseStudies.ts turns up in all of them.

  No "use client": server components build these lists and hand them to the
  client components that draw them.
*/
import { CASE_STUDIES, LIVE_BUILDS, type CaseStudy } from "./caseStudies";

export interface Project {
  key: string;
  shot: string;
  title: string;
  meta: string;
  /** A case study opens its page here. */
  href?: string;
  /** A live build opens the deployed site in a new tab. */
  url?: string;
  domain?: string;
  /** The line the project is pitched with, shown in the detailed card. */
  pitch?: string;
  role?: string;
  /** What it covers, as short tags. */
  tags?: string[];
}

export const toProject = (c: CaseStudy): Project => ({
  key: c.slug,
  shot: c.card,
  title: c.title,
  meta: c.meta,
  href: `/work/${c.slug}`,
  pitch: c.pitch,
  role: c.role,
  tags: c.tags,
});

/** Every project, newest listing first as the data lists them: case studies, then live builds. */
export const PROJECTS: Project[] = [...CASE_STUDIES.map(toProject), ...LIVE_BUILDS];

/*
  The four projects the home page leads with, in this order: the platforms, with
  one website between them. Change the list to change what the home page shows;
  /work always lists everything.
*/
export const HOME_PROJECT_SLUGS = ["ironside-gym", "vector-academy", "vanta-aesthetics", "veloura"];

/** The case studies with these slugs, in that order; a slug that no longer exists is skipped. */
export const projectsFor = (slugs: string[]): Project[] =>
  slugs
    .map((slug) => CASE_STUDIES.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c))
    .map(toProject);
