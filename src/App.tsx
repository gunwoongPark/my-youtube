import { observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { themeModel } from "./model/themeModel";
import theme from "./theme/theme";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import { useEffect } from "react";

const App = observer(() => {
  // useEffect
  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.style.background = theme[themeModel.theme].background;
    body.style.color = theme[themeModel.theme].color;
    body.style.transition = "background 0.2s ease-out, color 0.2s ease-out";
  }, [themeModel.theme]);

  return (
    <ThemeProvider
      theme={themeModel.theme === "DARK" ? theme.DARK : theme.LIGHT}
    >
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
});

export default App;
