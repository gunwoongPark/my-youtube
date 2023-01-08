import "styled-components";
import { ThemeType } from "./type";

declare module "styled-components" {
  export interface DefaultTheme {
    theme: ThemeType;
    background: string;
    color: string;
    borderColor: string;
    hoverBorderColor: string;
    inputBorderColor: string;
  }
}
