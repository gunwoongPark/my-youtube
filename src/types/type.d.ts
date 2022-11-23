import rootReducer from "../store";
import { toggleTheme } from "../store/reducers/theme";

export type DeviceType = "MOBILE" | "TABLET" | "PC";

export type ThemeType = "DARK" | "LIGHT";

export type PartType = "snippet" | "id";

export type ChartType = "mostPopular";

export type FetchType = "VIDEO" | "SEARCH";

export type ThemeStateType = {
  theme: ThemeType | null;
};

export type ThemeActionType = ReturnType<typeof toggleTheme>;

export type RootStateType = ReturnType<typeof rootReducer>;
