export type FrameOption = {
  name: string;
  color: string;
  texture: string;
  description: string;
};

export type MatColor = {
  name: string;
  color: string;
};

export const frameOptions: FrameOption[] = [
  {
    name: "Kota Walnut",
    color: "#6f3f25",
    texture: "linear-gradient(135deg, #3a1f13, #8b5434, #c07945)",
    description: "Warm walnut finish with a premium handcrafted feel.",
  },
  {
    name: "Obsidian",
    color: "#111111",
    texture: "linear-gradient(135deg, #050505, #1c1c1c, #000)",
    description: "Bold black frame for gallery-style presentation.",
  },
  {
    name: "White Maple",
    color: "#f2eee4",
    texture: "linear-gradient(135deg, #fffaf0, #e8dfcf, #ffffff)",
    description: "Clean light frame for modern interiors.",
  },
  {
    name: "Burlwood Blonde",
    color: "#d7b98a",
    texture: "linear-gradient(135deg, #c99b5d, #efd6a4, #b98144)",
    description: "Soft blonde wood texture with natural warmth.",
  },
  {
    name: "Brunette",
    color: "#4a2c1c",
    texture: "linear-gradient(135deg, #2a140b, #5a3320, #8a5b3d)",
    description: "Dark brown tone for classic framing.",
  },
  {
    name: "Kota Black",
    color: "#0d0d0d",
    texture: "linear-gradient(135deg, #000, #242424, #050505)",
    description: "Minimal black frame with strong contrast.",
  },
  {
    name: "Weathered Black",
    color: "#2f2f2f",
    texture: "linear-gradient(135deg, #111, #4a4a4a, #1f1f1f)",
    description: "Textured black frame with a rustic gallery feel.",
  },
];

export const matColors: MatColor[] = [
  { name: "Museum White", color: "#f7f2e8" },
  { name: "Ivory", color: "#efe3c8" },
  { name: "Charcoal", color: "#242424" },
  { name: "Warm Grey", color: "#b7afa3" },
  { name: "Deep Red", color: "#7a160d" },
  { name: "Black", color: "#050505" },
];

export const sizePresets = {
  small: { width: 8, height: 10 },
  medium: { width: 12, height: 16 },
  large: { width: 18, height: 24 },
};