import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    color: string;
    borderColor: string;
    hoverBorderColor: string;
    inputBorderColor: string;
  }
}