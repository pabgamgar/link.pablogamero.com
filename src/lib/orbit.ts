// Orbit geometry in design units: a 390×410 box, matching the Figma frame.
export const ORBIT_BOX = { width: 390, height: 410, cx: 195, cy: 200 } as const;

export const polar = (radius: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: radius * Math.sin(rad), y: -radius * Math.cos(rad) };
};

/** Offset from the orbit centre, in design units. CSS turns it into a GPU transform,
 *  so motion is sub-pixel smooth (left/top would snap to whole pixels). */
export const placeOnOrbit = (radius: number, angle: number) => {
  const { x, y } = polar(radius, angle);
  return `--ox:${x.toFixed(2)};--oy:${y.toFixed(2)};`;
};
