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

export const Highlight = "#3C91E6";
export const Contrast = "#FF8CC6";

export const BackgroundLight = "#FDFFF7";
export const BackgroundDark = "#0E1116";

//export const Secondary = "rgba(0, 125, 255, 0.3)"
export const SecondaryAsTransparent = "#1D335499";
