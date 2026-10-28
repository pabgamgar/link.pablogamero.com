import type { LocalizedText, SupportedLanguage } from "../config/linkpage";

const STORAGE_KEY = "pg-link-language";

const isLanguage = (value: unknown): value is SupportedLanguage =>
  value === "en" || value === "es";

const readDictionary = (): Record<string, LocalizedText> => {
  const raw = document.getElementById("i18n-dictionary")?.textContent ?? "{}";
  const parsed: unknown = JSON.parse(raw);
  return typeof parsed === "object" && parsed !== null
    ? (parsed as Record<string, LocalizedText>)
    : {};
};

const readStoredLanguage = (): SupportedLanguage | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
};

const storeLanguage = (language: SupportedLanguage) => {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
};

const browserLanguage = (): SupportedLanguage =>
  (navigator.languages?.[0] ?? navigator.language ?? "en").toLowerCase().startsWith("es")
    ? "es"
    : "en";

export const initLanguage = () => {
  const dictionary = readDictionary();
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-lang-toggle]");

  const apply = (language: SupportedLanguage) => {
    document.documentElement.lang = language;
    const title = dictionary.pageTitle;
    if (title) document.title = title[language];
    const description = dictionary.pageDescription;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description[language]);
    }

    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
      const entry = dictionary[node.dataset.i18n ?? ""];
      if (entry) node.textContent = entry[language];
    });
    document.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach((node) => {
      const entry = dictionary[node.dataset.i18nAria ?? ""];
      if (entry) node.setAttribute("aria-label", entry[language]);
    });
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.langToggle === language));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.langToggle;
      if (!isLanguage(language)) return;
      storeLanguage(language);
      apply(language);
    });
  });

  // Re-run after the card flips, since its aria-label key changes.
  document.addEventListener("pg:side-change", () => {
    const current = document.documentElement.lang;
    apply(isLanguage(current) ? current : "en");
  });

  apply(readStoredLanguage() ?? browserLanguage());
};
