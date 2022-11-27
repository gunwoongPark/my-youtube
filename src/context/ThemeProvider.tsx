import React, { ChangeEvent, createContext, useState } from "react";
import { ThemeType } from "../types/type";
import setInitialTheme from "../util/theme";

type ThemeContextValueType = {
  value: ThemeType;
  action: (e: ChangeEvent<HTMLInputElement>) => void;
} | null;

export const themeContext = createContext<ThemeContextValueType>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(setInitialTheme());

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
