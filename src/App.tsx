import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import { useContext, useEffect } from "react";
import { themeContext } from "./context/ThemeProvider";
import { ThemeType } from "./types/type";

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
  const context = useContext(themeContext);

  // useEffect
  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;

    body.style.transition = "background 0.2s ease-out, color 0.2s ease-out";
  }, [context?.value]);

  return (
    <ThemeProvider theme={theme[context?.value as ThemeType]}>
      <Routes>
        {["/", "search"].map((path, index) => (
          <Route
            key={`router-path-${index}`}
            path={path}
            element={<MainPage />}
          />
        ))}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
