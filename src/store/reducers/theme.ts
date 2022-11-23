import { ThemeType } from "../../types/type";

// action type
export const TOGGLE = "THEME/TOGGLE";

// action
export const toggleTheme = (theme: ThemeType) => {
  return { type: TOGGLE, theme };
};

// initial state
type ThemeStateType = {
  theme: ThemeType | null;
};
const initialState: ThemeStateType = {
  theme: null,
};

// setting initial state
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
type ThemeActionType = ReturnType<typeof toggleTheme>;
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
