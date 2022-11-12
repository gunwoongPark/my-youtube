import { useEffect, useState } from "react";
import { ThemeType } from "../types/theme";

const useThemeState = () => {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    const theme: ThemeType | null = localStorage.getItem(
      "theme"
    ) as ThemeType | null;

    if (theme) {
      if (theme === "DARK") {
        setTheme("DARK");
      } else {
        setTheme("LIGHT");
      }
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "DARK"
          : "LIGHT"
      );
    }
  }, []);

  return { theme, setTheme };
};

export default useThemeState;
