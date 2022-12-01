import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import { useContext, useEffect } from "react";
import { themeContext } from "./context/ThemeProvider";
import { ThemeType } from "./types/type";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./Routes";
import { queryClient } from "./react-query/queryClient";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    color: string;
    borderColor: string;
    hoverBorderColor: string;
    inputBorderColor: string;
  }
}

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
body{
  background:${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
}
`;

const App = () => {
  // context
  const context = useContext(themeContext);

  // useEffect
  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;

    body.style.transition = "background 0.2s ease-out, color 0.2s ease-out";
  }, [context?.value]);

  return (
    <ThemeProvider theme={theme[context?.value as ThemeType]}>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <ReactQueryDevtools />
      </QueryClientProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
