import type { IconName } from "./icons";

export type SupportedLanguage = "es" | "en";

export interface LocalizedText {
  es: string;
  en: string;
}

export type Side = "work" | "personal";

/** Angles are degrees clockwise from 12 o'clock. Radii are in orbit units (box is 390 wide). */
export interface OrbitLink {
  kind: "link";
  id: string;
  label: LocalizedText;
  icon: IconName;
  href: string;
  radius: number;
  angle: number;
}

export interface Moon {
  id: string;
  label: LocalizedText;
  href: string;
  angle: number;
  icon?: IconName;
  /** App icon image (path under /public), shown as a rounded square. */
  appIcon?: string;
}

export interface Planet {
  kind: "planet";
  id: string;
  label: LocalizedText;
  radius: number;
  angle: number;
  icon?: IconName;
  letter?: string;
  moons: Moon[];
}

export type OrbitNode = OrbitLink | Planet;

export interface ContactCard {
  firstName: string;
  lastName: string;
  org?: string;
  phone: string;
  emails: string[];
  urls: string[];
}

export interface SideConfig {
  id: Side;
  tag: LocalizedText;
  /** Short name of this side, shown on the other side's flip chip. */
  shortName: LocalizedText;
  name: string;
  /** Memoji under /public, drawn on a circle in the side's colour. */
  avatar: string;
  role: LocalizedText;
  bio: LocalizedText;
  sun: { label: LocalizedText; icon: IconName };
  rings: number[];
  nodes: OrbitNode[];
  contact: ContactCard;
}

export interface LinkPageUI {
  pageTitle: LocalizedText;
  pageDescription: LocalizedText;
  saveContact: LocalizedText;
  switchTo: LocalizedText;
}

export interface RedirectEntry {
  slug: string;
  target: string;
  status: 301 | 302;
}

const REDIRECT_STATUS_DEFAULT: RedirectEntry["status"] = 302;

// Short links already printed on QR codes. Keep their targets stable.
export const REDIRECTS_MAP: Record<string, RedirectEntry> = {
  website: {
    slug: "website",
    target: "https://www.pablogamero.com",
    status: REDIRECT_STATUS_DEFAULT,
  },
  instagram: {
    slug: "instagram",
    target: "https://instagram.com/pablogg411",
    status: REDIRECT_STATUS_DEFAULT,
  },
  phone: {
    slug: "phone",
    target: "tel:+34601159109",
    status: REDIRECT_STATUS_DEFAULT,
  },
};

export const RESERVED_SLUGS = new Set<string>([
  "",
  "links",
  "contact.vcf",
  "robots.txt",
  "favicon.svg",
  "bg.svg",
  "sitemap-index.xml",
  "sitemap-0.xml",
]);

export const LINKS_CONFIG: {
  defaultLanguage: SupportedLanguage;
  ui: LinkPageUI;
} = {
  defaultLanguage: "en",
  ui: {
    pageTitle: { en: "Pablo Gamero", es: "Pablo Gamero" },
    pageDescription: {
      en: "All my links in one place.",
      es: "Todos mis enlaces en un sitio.",
    },
    saveContact: { en: "Save contact", es: "Guardar contacto" },
    switchTo: { en: "Switch to", es: "Cambiar a" },
  },
};
