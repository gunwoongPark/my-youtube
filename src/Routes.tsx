import { Route, Routes as RouteList } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";

const Routes = () => {
  return (
    <RouteList>
      {["/", "search"].map((path, index) => (
        <Route
          key={`router-path-${index}`}
          path={path}
          element={<MainPage />}
        />
      ))}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/detail" element={<DetailPage />} />
    </RouteList>
  );
};

export default Routes;
