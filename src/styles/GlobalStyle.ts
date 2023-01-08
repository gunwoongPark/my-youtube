import { createGlobalStyle } from "styled-components";
import type { ThemeType } from "../types/type";

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
body{
  background:${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
}
`;
