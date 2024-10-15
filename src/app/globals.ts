import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const modeMe = (e: any) => {
    setDarkMode(!!e.matches);
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    setDarkMode(matchMedia.matches);
    matchMedia.addEventListener("change", modeMe);

    return () => matchMedia.removeEventListener("change", modeMe);
  }, []);

  return darkMode;
};

export function Highlight() {
  return "#3C91E6";
}

export function Background() {
  const darkMode = useDarkMode();
  return darkMode ? "#0E1116" : "#FDFFF7";
}

export function Contrast() {
  return "#FF8CC6";
}

export function NegativeBackground() {
  const darkMode = useDarkMode();
  return darkMode ? "#FDFFF7" : "#0E1116";
}

//export const Secondary = "rgba(0, 125, 255, 0.3)"
export const SecondaryAsTransparent = "#1D335499";
