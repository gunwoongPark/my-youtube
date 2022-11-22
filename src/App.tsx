import { observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { themeModel } from "./model/themeModel";
import theme from "./theme/theme";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

const App = observer(() => {
  return (
    <ThemeProvider
      theme={themeModel.theme === "DARK" ? theme.darkMode : theme.lightMode}
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
