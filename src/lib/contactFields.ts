/*
  What the contact form offers and what the server accepts, in one place.

  The form renders these lists and functions/api/contact.ts validates
  against them. They have to be the same lists: a choice added to the form
  but not to the server would be rejected for every visitor who picked it,
  and nothing on the form would say why.
*/

export const PROJECT_TYPES: string[] = [
  "AI integration",
  "Chatbot",
  "CRM / automation",
  "Web app",
  "E-commerce",
  "Design",
];

export const BUDGETS: string[] = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000+",
  "Not sure yet",
];

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 1000;

/*
  Permissive on purpose, just enough to catch a genuine typo, with one
  exception: no commas, semicolons, angle brackets, parentheses or quotes.
  The address is used as the Reply-To of the notification, and those are the
  characters that would let one field name several recipients.
*/
export const EMAIL_RE = /^[^\s@,;<>()"]+@[^\s@,;<>()"]+\.[^\s@,;<>()"]{2,}$/;
