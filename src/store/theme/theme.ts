import { ChangeEvent } from "react";
import { ThemeActionType, ThemeStateType, ThemeType } from "../../types/type";

// action type
const TOGGLE = "theme/TOGGLE";

// action
export const toggleTheme = (
  e: ChangeEvent<HTMLInputElement>
): ThemeActionType => {
  if (e.target.checked) {
    localStorage.setItem("theme", "DARK");
    return { type: TOGGLE, theme: "DARK" };
  } else {
    localStorage.setItem("theme", "LIGHT");
    return { type: TOGGLE, theme: "LIGHT" };
  }
};

// initial state
const initialState: ThemeStateType = {
  theme: null,
};
// setting initial state(local storage)
(() => {
  const theme: ThemeType | null = localStorage.getItem(
    "theme"
  ) as ThemeType | null;

  if (!!theme) {
    if (theme === "DARK") {
      initialState.theme = "DARK";
    } else {
      initialState.theme = "LIGHT";
    }
  } else {
    initialState.theme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "DARK"
      : "LIGHT";
  }
})();

// reducer
const theme = (
  state = initialState,
  action: ThemeActionType
): ThemeStateType => {
  switch (action.type) {
    case TOGGLE:
      return { theme: action.theme };

    default:
      return state;
  }
};

export default theme;
