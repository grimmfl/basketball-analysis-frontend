export const IsDarkMode =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const Highlight = "#3C91E6";
export const Background = IsDarkMode ? "#0E1116" : "#FDFFF7";
export const Contrast = "#FF8CC6";
//export const Secondary = "rgba(0, 125, 255, 0.3)"
export const SecondaryAsTransparent = "#1D335499";

export const NegativeBackground = IsDarkMode ? "#FDFFF7" : "#0E1116";
