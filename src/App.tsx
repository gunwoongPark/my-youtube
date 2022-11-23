import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "./store";
import { ThemeType } from "./types/type";

const App = () => {
  // state
  const { theme: themeState } = useSelector(
    (state: RootStateType) => state.theme
  );

  // useEffect
  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;

    body.style.background = theme[themeState as ThemeType].background;
    body.style.color = theme[themeState as ThemeType].color;
    body.style.transition = "background 0.2s ease-out, color 0.2s ease-out";
  }, [themeState]);

  return (
    <ThemeProvider theme={theme[themeState as ThemeType]}>
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
    </ThemeProvider>
  );
};

export default App;
