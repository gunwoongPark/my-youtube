import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { ThemeType } from "../types/type";

class ThemeModel {
  theme: ThemeType;

  // constructor
  constructor() {
    const theme: ThemeType | null = localStorage.getItem(
      "theme"
    ) as ThemeType | null;

    if (!!theme) {
      if (theme === "DARK") {
        this.theme = "DARK";
      } else {
        this.theme = "LIGHT";
      }
    } else {
      this.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "DARK"
        : "LIGHT";
    }

    makeAutoObservable(this);
  }

  onToggleTheme(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      this.theme = "DARK";
      localStorage.setItem("theme", "DARK");
    } else {
      this.theme = "LIGHT";
      localStorage.setItem("theme", "LIGHT");
    }
  }
}

export const themeModel = new ThemeModel();
