import type { LinkPageUI, LocalizedText, SideConfig } from "../config/linkpage";

export type Dictionary = Record<string, LocalizedText>;

export const sideKey = (side: string, field: string) => `side.${side}.${field}`;
export const nodeKey = (side: string, id: string) => `node.${side}.${id}`;
export const moonKey = (side: string, planet: string, id: string) =>
  `moon.${side}.${planet}.${id}`;

/** Flattens every translatable string on the page into one key → {en, es} map. */
export const buildDictionary = (ui: LinkPageUI, sides: SideConfig[]): Dictionary => {
  const dictionary: Dictionary = {
    pageTitle: ui.pageTitle,
    pageDescription: ui.pageDescription,
    saveContact: ui.saveContact,
  };

  for (const side of sides) {
    dictionary[sideKey(side.id, "tag")] = side.tag;
    dictionary[sideKey(side.id, "role")] = side.role;
    dictionary[sideKey(side.id, "bio")] = side.bio;
    dictionary[sideKey(side.id, "sun")] = side.sun.label;
    dictionary[sideKey(side.id, "short")] = side.shortName;
    dictionary[sideKey(side.id, "switch")] = {
      en: `${ui.switchTo.en} ${side.shortName.en}`,
      es: `${ui.switchTo.es} ${side.shortName.es}`,
    };

    for (const node of side.nodes) {
      dictionary[nodeKey(side.id, node.id)] = node.label;
      if (node.kind !== "planet") continue;
      for (const moon of node.moons) {
        dictionary[moonKey(side.id, node.id, moon.id)] = moon.label;
      }
    }
  }

  return dictionary;
};
