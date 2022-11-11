import { createContext } from "react";
import styled, { ThemeProvider, useTheme } from "styled-components";
import ContentsView from "./components/ContentsView";
import InputView from "./components/InputView";
import useMediaQuery from "./hooks/useMediaQuery";
import theme from "./theme/theme";
import { DeviceType } from "./types/device";
// import { ThemeType } from "./types/theme";

export const DeviceContext = createContext<DeviceType | null>(null);
// export const ThemeContext = createContext<ThemeType | null>(null);

function App() {
  const deviceType = useMediaQuery();
  const themeType = useTheme();

  return (
    <ThemeProvider
      theme={themeType === "DARK" ? theme.darkMode : theme.lightMode}
    >
      <DeviceContext.Provider value={deviceType}>
        <Pub.Container>
          <p>MY YOUTUBE</p>

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
