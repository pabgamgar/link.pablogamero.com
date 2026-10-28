import type { LocalizedText, Side, SideConfig } from "./linkpage";

const t = (en: string, es: string = en): LocalizedText => ({ en, es });

const WORK_PHONE = "+34624560065";
const PERSONAL_PHONE = "+34601159109";
const whatsapp = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

const WORK: SideConfig = {
  id: "work",
  tag: t("Work", "Trabajo"),
  shortName: t("Work", "Trabajo"),
  name: "Pablo Gamero",
  avatar: "/avatars/work.png",
  role: t("Product builder · Founder, Limero", "Product builder · Fundador de Limero"),
  bio: t(
    "I build problem-specific products and help small businesses fix how they work.",
    "Creo productos para problemas concretos y ayudo a pequeñas empresas a mejorar cómo trabajan.",
  ),
  sun: { label: t("Work", "Trabajo"), icon: "briefcase" },
  // Inner: reach me. Middle: what I build. Outer: follow me.
  rings: [78, 116, 160],
  nodes: [
    { kind: "link", id: "whatsapp", label: t("WhatsApp"), icon: "whatsapp", href: whatsapp(WORK_PHONE), radius: 78, angle: 60 },
    { kind: "link", id: "email", label: t("Email", "Correo"), icon: "mail", href: "mailto:pablogamerogarcia@gmail.com", radius: 78, angle: 300 },
    { kind: "link", id: "website", label: t("Website", "Web"), icon: "globe", href: "https://pablogamero.com", radius: 116, angle: 0 },
    {
      kind: "planet",
      id: "apps",
      label: t("Apps"),
      icon: "apps",
      radius: 116,
      angle: 120,
      moons: [
        { id: "caredose", label: t("CareDose"), href: "https://caredose.pablogamero.com", angle: 50, appIcon: "/apps/caredose.png" },
        { id: "dibs", label: t("Dibs"), href: "https://dibs.pablogamero.com", angle: 100, appIcon: "/apps/dibs.png" },
        { id: "pubmefy", label: t("Pubmefy"), href: "https://pubmefy.vercel.app", angle: 150, appIcon: "/apps/pubmefy.png" },
        { id: "submoney", label: t("Submoney"), href: "https://submoney.pablogamero.com", angle: 200, appIcon: "/apps/submoney.png" },
      ],
    },
    {
      kind: "planet",
      id: "limero",
      label: t("Limero"),
      letter: "L",
      radius: 116,
      angle: 240,
      moons: [
        { id: "instagram", label: t("Limero Instagram"), href: "https://instagram.com/limero.co", angle: 296, icon: "instagram" },
        { id: "x", label: t("Limero X"), href: "https://x.com/limero_co", angle: 248, icon: "x" },
        { id: "email", label: t("Limero email", "Correo de Limero"), href: "mailto:hola@limero.co", angle: 200, icon: "mail" },
        { id: "website", label: t("limero.co"), href: "https://limero.co", angle: 152, icon: "globe" },
      ],
    },
    { kind: "link", id: "linkedin", label: t("LinkedIn"), icon: "linkedin", href: "https://linkedin.com/in/pabgamgar", radius: 160, angle: 36 },
    { kind: "link", id: "github", label: t("GitHub"), icon: "github", href: "https://github.com/pabgamgar", radius: 160, angle: 72 },
    { kind: "link", id: "tiktok", label: t("TikTok"), icon: "tiktok", href: "https://www.tiktok.com/@pabgamgar", radius: 160, angle: 180 },
    { kind: "link", id: "instagram", label: t("Instagram"), icon: "instagram", href: "https://instagram.com/pabgamgar", radius: 160, angle: 288 },
    { kind: "link", id: "x", label: t("X"), icon: "x", href: "https://x.com/pabgamgar", radius: 160, angle: 324 },
  ],
  contact: {
    firstName: "Pablo",
    lastName: "Gamero",
    org: "Limero",
    phone: WORK_PHONE,
    emails: ["pablogamerogarcia@gmail.com", "hola@limero.co"],
    urls: ["https://pablogamero.com", "https://limero.co"],
  },
};

const PERSONAL: SideConfig = {
  id: "personal",
  tag: t("Personal"),
  shortName: t("Personal"),
  name: "Pablo",
  avatar: "/avatars/personal.png",
  role: t("Off the clock", "Fuera del curro"),
  bio: t(
    "I build apps, play piano and guitar, and spend most evenings fitboxing.",
    "Hago apps, toco el piano y la guitarra, y paso casi todas las tardes en fitboxing.",
  ),
  sun: { label: t("Personal"), icon: "smile" },
  rings: [84, 148],
  nodes: [
    { kind: "link", id: "instagram", label: t("Instagram"), icon: "instagram", href: "https://instagram.com/pablogg411", radius: 84, angle: 270 },
    { kind: "link", id: "whatsapp", label: t("WhatsApp"), icon: "whatsapp", href: whatsapp(PERSONAL_PHONE), radius: 84, angle: 90 },
    { kind: "link", id: "email", label: t("Email", "Correo"), icon: "mail", href: "mailto:pablogg411@gmail.com", radius: 148, angle: 180 },
  ],
  contact: {
    firstName: "Pablo",
    lastName: "Gamero",
    phone: PERSONAL_PHONE,
    emails: ["pablogg411@gmail.com"],
    urls: ["https://instagram.com/pablogg411"],
  },
};

export const SIDES: Record<Side, SideConfig> = { work: WORK, personal: PERSONAL };
export const SIDE_ORDER: Side[] = ["work", "personal"];

export const otherSide = (side: Side): Side => (side === "work" ? "personal" : "work");

/** Unknown or missing values fall back to Work, the side shown to new contacts. */
export const parseSide = (value: string | null): Side =>
  value === "personal" ? "personal" : "work";
