import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import ContentsView from "./components/ContentsView";
import HeaderView from "./components/HeaderView";
import InputView from "./components/InputView";
import useMediaQuery from "./hooks/useMediaQuery";
import useThemeState from "./hooks/useThemeState";
import theme from "./theme/theme";
import { DeviceType } from "./types/device";

export const DeviceContext = createContext<DeviceType | null>(null);

function App() {
  const deviceType = useMediaQuery();
  const { theme: themeState } = useThemeState();

  return (
    <ThemeProvider
      theme={themeState === "DARK" ? theme.darkMode : theme.lightMode}
    >
      <DeviceContext.Provider value={deviceType}>
        <Pub.Container>
          <HeaderView />

          <InputView />
          <ContentsView />
        </Pub.Container>
      </DeviceContext.Provider>
    </ThemeProvider>
  );
}

export default App;

const Pub = {
  Container: styled.div`
    text-align: center;
  `,
};
