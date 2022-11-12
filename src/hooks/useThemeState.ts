import { useContext } from "react";
import { ThemeContext } from "styled-components";

const useThemeState = () => {
  const themeValue = useContext(ThemeContext);

  if (themeValue === undefined) {
    throw new Error("useThemeState should be used within ThemeProvider");
  }

  return themeValue;
};

export default useThemeState;
