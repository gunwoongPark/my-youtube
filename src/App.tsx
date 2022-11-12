import React, { createContext, useEffect, useMemo, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ContentsView from "./components/ContentsView";
import HeaderView from "./components/HeaderView";
import InputView from "./components/InputView";
import useMediaQuery from "./hooks/useMediaQuery";
import useThemeState from "./hooks/useThemeState";
import theme from "./theme/theme";
import { DeviceType } from "./types/device";
import { ThemeType } from "./types/theme";

export const DeviceContext = createContext<DeviceType | null>(null);
// TODO :: any 수정
export const ThemeContext = createContext<any | null>(null);

const ThemeContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [themeValue, setThemeValue] = useState<ThemeType | null>(null);

  useEffect(() => {
    const theme: ThemeType | null = localStorage.getItem(
      "theme"
    ) as ThemeType | null;

    if (!!theme) {
      if (theme === "DARK") setThemeValue("DARK");
      else setThemeValue("LIGHT");
    } else {
      setThemeValue(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "DARK"
          : "LIGHT"
      );
    }
  }, []);

  return (
    <ThemeContext.Provider value={[themeValue, setThemeValue]}>
      {children}
    </ThemeContext.Provider>
  );
};

function App() {
  const deviceType = useMediaQuery();

  return (
    // <ThemeProvider
    //   theme={themeState === "DARK" ? theme.darkMode : theme.lightMode}
    // >
    <DeviceContext.Provider value={deviceType}>
      <ThemeContextProvider>
        <Pub.Container>
          <HeaderView />

          <InputView />
          <ContentsView />
        </Pub.Container>
      </ThemeContextProvider>
    </DeviceContext.Provider>
    // </ThemeProvider>
  );
}

export default App;

const Pub = {
  Container: styled.div`
    text-align: center;

    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
  `,
};
