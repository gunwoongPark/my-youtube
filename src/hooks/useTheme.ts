import { useEffect, useState } from "react";
import { ThemeType } from "../types/theme";

const useTheme = () => {
  const [themeType, setThemeType] = useState<ThemeType | null>(null);

  useEffect(() => {
    const theme: ThemeType | null = localStorage.getItem(
      "theme"
    ) as ThemeType | null;

    if (theme) {
      if (theme === "DARK") {
        setThemeType("DARK");
      } else {
        setThemeType("LIGHT");
      }
    } else {
      setThemeType(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "DARK"
          : "LIGHT"
      );
    }
  }, []);

  return themeType;
};

export default useTheme;
