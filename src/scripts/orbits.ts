import type { Side } from "../config/linkpage";

const otherSide = (side: Side): Side => (side === "work" ? "personal" : "work");

/** Planets: tap to open their moons, dimming the rest. One open at a time. */
const initPlanets = () => {
  const planets = document.querySelectorAll<HTMLElement>("[data-planet]");

  const close = () => {
    planets.forEach((wrap) => setOpen(wrap, false));
    document.querySelectorAll(".is-dimmed").forEach((node) => node.classList.remove("is-dimmed"));
  };

  const setOpen = (wrap: HTMLElement, open: boolean) => {
    wrap.classList.toggle("is-open", open);
    wrap.querySelector(".planet")?.setAttribute("aria-expanded", String(open));
    wrap.querySelectorAll<HTMLAnchorElement>(".moon").forEach((moon) => {
      moon.tabIndex = open ? 0 : -1;
    });
  };

  const open = (wrap: HTMLElement) => {
    close();
    setOpen(wrap, true);
    wrap.closest("[data-orbit]")?.querySelectorAll(".orbit-item").forEach((item) => {
      if (item !== wrap) item.classList.add("is-dimmed");
    });
  };

  planets.forEach((wrap) => {
    wrap.querySelector(".planet")?.addEventListener("click", (event) => {
      event.stopPropagation();
      if (wrap.classList.contains("is-open")) close();
      else open(wrap);
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".moon")) return;
    close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
  document.addEventListener("pg:side-change", close);
};

const SHUFFLE_MS = 560;

/** The card stack is the Work/Personal switch: the cards shuffle and the orbit swaps. */
const initSideSwitch = () => {
  const stack = document.querySelector<HTMLButtonElement>("[data-side-card]");
  const save = document.querySelector<HTMLAnchorElement>("[data-save-contact]");
  if (!stack) return;
  const faces = stack.querySelectorAll<HTMLElement>("[data-face]");
  let busy = false;

  const apply = (side: Side) => {
    stack.dataset.front = side;
    stack.dataset.i18nAria = `side.${otherSide(side)}.switch`;
    faces.forEach((face) => {
      const isFront = face.dataset.face === side;
      face.dataset.pos = isFront ? "front" : "back";
      face.classList.add(isFront ? "is-entering" : "is-leaving");
      if (isFront) face.removeAttribute("aria-hidden");
      else face.setAttribute("aria-hidden", "true");
    });
    window.setTimeout(() => {
      faces.forEach((face) => face.classList.remove("is-entering", "is-leaving"));
      busy = false;
    }, SHUFFLE_MS);

    document.querySelectorAll<HTMLElement>("[data-orbit]").forEach((orbit) => {
      const active = orbit.dataset.orbit === side;
      orbit.inert = !active;
      if (active) orbit.removeAttribute("aria-hidden");
      else orbit.setAttribute("aria-hidden", "true");
    });
    if (save) save.href = `/contact.vcf?side=${side}`;

    const url = new URL(window.location.href);
    if (side === "work") url.searchParams.delete("side");
    else url.searchParams.set("side", side);
    history.replaceState(null, "", url);

    document.dispatchEvent(new CustomEvent("pg:side-change"));
  };

  stack.addEventListener("click", (event) => {
    event.stopPropagation();
    if (busy) return;
    busy = true;
    apply(stack.dataset.front === "personal" ? "work" : "personal");
  });
};

export const initOrbits = () => {
  initPlanets();
  initSideSwitch();
};
