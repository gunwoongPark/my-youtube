import rootReducer from "../store";

export type DeviceType = "MOBILE" | "TABLET" | "PC";

export type ThemeType = "DARK" | "LIGHT";

export type PartType = "snippet" | "id";

export type ChartType = "mostPopular";

export type SearchType = "channel" | "playlist" | "video";

export type FetchType = "VIDEO" | "SEARCH";

export type ThemeStateType = {
  theme: ThemeType | null;
};

export type ThemeActionType = {
  type: string;
  theme: ThemeType;
};

export type RootStateType = ReturnType<typeof rootReducer>;
