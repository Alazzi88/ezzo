// Single source of truth for motion across the site.
// Rules: easeOut for entrances, easeIn for exits, springs for physical things,
// exits ≈ half an entrance, stagger list items ~0.1–0.2s, words ~0.09s.

export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  in: [0.6, 0, 0.9, 0.35] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  overshoot: [0.55, 0, 0.2, 1.12] as [number, number, number, number],
};

export const spring = {
  settle: { type: 'spring' as const, damping: 14, stiffness: 140, mass: 0.8 },
  pop: { type: 'spring' as const, damping: 10, stiffness: 220, mass: 0.7 },
  notch: { type: 'spring' as const, damping: 12, stiffness: 190, mass: 0.75 },
  tilt: { stiffness: 220, damping: 22, mass: 0.8 },
};

export const dur = {
  enter: 0.8,
  exit: 0.38,
  fast: 0.25,
};

export const stagger = {
  word: 0.09,
  item: 0.12,
  list: 0.2,
};

export const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
