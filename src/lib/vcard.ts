import type { ContactCard } from "../config/linkpage";

const escapeVCardText = (value: string): string => {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
};

export const buildVCard = (contact: ContactCard): string => {
  const fullName = `${contact.firstName} ${contact.lastName}`.trim();
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardText(contact.lastName)};${escapeVCardText(contact.firstName)};;;`,
    `FN:${escapeVCardText(fullName)}`,
    ...(contact.org ? [`ORG:${escapeVCardText(contact.org)}`] : []),
    `TEL;TYPE=CELL:${contact.phone}`,
    ...contact.emails.map((email) => `EMAIL;TYPE=INTERNET:${email}`),
    ...contact.urls.map((url) => `URL:${url}`),
    "END:VCARD",
  ];
  return `${lines.join("\r\n")}\r\n`;
};
