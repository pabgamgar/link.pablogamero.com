import { polar } from "../lib/orbit";

// Kepler-like speeds: a ring at REFERENCE_RADIUS takes OUTER_PERIOD_S per lap,
// inner rings go faster (ω ∝ r^-1.5). Slow enough that nodes stay easy to tap.
const REFERENCE_RADIUS = 160;
const OUTER_PERIOD_S = 240;
const RESUME_DELAY_MS = 1500;

const degreesPerSecond = (radius: number) =>
  (360 / OUTER_PERIOD_S) * (REFERENCE_RADIUS / radius) ** 1.5;

interface Body {
  el: HTMLElement;
  radius: number;
  startAngle: number;
  speed: number;
}

const readBodies = (): Body[] =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-orbit] [data-radius]")).flatMap((el) => {
    const radius = Number(el.dataset.radius);
    const startAngle = Number(el.dataset.angle);
    if (!Number.isFinite(radius) || !Number.isFinite(startAngle) || radius <= 0) return [];
    return [{ el, radius, startAngle, speed: degreesPerSecond(radius) }];
  });

// Writes the offset the CSS transform reads. Unrounded, so movement stays sub-pixel.
const place = (body: Body, elapsedS: number) => {
  const { x, y } = polar(body.radius, body.startAngle + body.speed * elapsedS);
  body.el.style.setProperty("--ox", String(x));
  body.el.style.setProperty("--oy", String(y));
};

/** Moves every node around its ring. Pauses while a planet is open, while the
 *  pointer is on a node, during a tap, and when the tab is hidden. */
export const initMotion = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const bodies = readBodies();
  if (bodies.length === 0) return;

  let elapsedS = 0;
  let lastFrame: number | null = null;
  let hovering = 0;
  let touchHoldUntil = 0;

  const isPaused = (now: number) =>
    document.hidden ||
    hovering > 0 ||
    now < touchHoldUntil ||
    document.querySelector(".planet-wrap.is-open") !== null;

  const frame = (now: number) => {
    if (lastFrame !== null && !isPaused(now)) {
      // Clamp so a long frame gap doesn't make nodes jump.
      elapsedS += Math.min(now - lastFrame, 100) / 1000;
      bodies.forEach((body) => place(body, elapsedS));
    }
    lastFrame = now;
    requestAnimationFrame(frame);
  };

  bodies.forEach(({ el }) => {
    el.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") hovering += 1;
    });
    el.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") hovering = Math.max(0, hovering - 1);
    });
  });

  // Touch: freeze while a finger is down on the orbit and briefly after.
  document.querySelectorAll<HTMLElement>("[data-orbit]").forEach((orbit) => {
    orbit.addEventListener("pointerdown", () => {
      touchHoldUntil = Number.POSITIVE_INFINITY;
    });
  });
  const release = () => {
    if (touchHoldUntil === Number.POSITIVE_INFINITY) {
      touchHoldUntil = performance.now() + RESUME_DELAY_MS;
    }
  };
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);

  requestAnimationFrame(frame);
};
