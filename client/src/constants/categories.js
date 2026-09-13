export const CATEGORIES = [
  "طعام وشراب",
  "مواصلات",
  "تسوق",
  "فواتير واشتراكات",
  "ترفيه",
  "صحة",
  "راتب",
  "تحويلات",
  "أخرى",
];

// Fixed category -> color mapping (validated categorical palette, CVD-safe).
// A category always gets the same color regardless of which others are
// present, so a filtered/partial chart never repaints the survivors.
export const CATEGORY_COLORS = {
  "طعام وشراب": "#2a78d6",
  "مواصلات": "#eb6834",
  "تسوق": "#1baf7a",
  "فواتير واشتراكات": "#eda100",
  "ترفيه": "#e87ba4",
  "صحة": "#008300",
  "تحويلات": "#4a3aa7",
  "أخرى": "#e34948",
};

// Same hues, stepped for the dark chart surface (from the validated palette).
export const CATEGORY_COLORS_DARK = {
  "طعام وشراب": "#3987e5",
  "مواصلات": "#d95926",
  "تسوق": "#199e70",
  "فواتير واشتراكات": "#c98500",
  "ترفيه": "#d55181",
  "صحة": "#008300",
  "تحويلات": "#9085e9",
  "أخرى": "#e66767",
};
