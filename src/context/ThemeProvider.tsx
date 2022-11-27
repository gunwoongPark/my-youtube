import React, { ChangeEvent, createContext, useEffect, useState } from "react";
import { ThemeType } from "../types/type";

type ThemeContextValueType = {
  value: ThemeType | null;
  action: (e: ChangeEvent<HTMLInputElement>) => void;
} | null;
export const themeContext = createContext<ThemeContextValueType>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    const theme: ThemeType | null = localStorage.getItem(
      "theme"
    ) as ThemeType | null;

    if (!!theme) {
      if (theme === "DARK") {
        setTheme("DARK");
      } else {
        setTheme("LIGHT");
      }
    } else {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "DARK"
        : "LIGHT";
      setTheme(theme);
    }
  }, []);

  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      localStorage.setItem("theme", "DARK");
      setTheme("DARK");
    } else {
      localStorage.setItem("theme", "LIGHT");
      setTheme("LIGHT");
    }
  };

  const value = {
    value: theme,
    action: (e: ChangeEvent<HTMLInputElement>) => toggleTheme(e),
  };

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};

export default ThemeProvider;
