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
