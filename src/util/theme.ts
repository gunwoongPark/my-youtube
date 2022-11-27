import { ThemeType } from "../types/type";

const setInitialTheme = () => {
  const theme: ThemeType | null = localStorage.getItem(
    "theme"
  ) as ThemeType | null;

  if (!!theme) {
    if (theme === "DARK") {
      return "DARK";
    } else {
      return "LIGHT";
    }
  } else {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "DARK"
      : "LIGHT";
    return theme;
  }
};

export default setInitialTheme;
