import { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import ContentsView from "./components/ContentsView";
import InputView from "./components/InputView";
import useMediaQuery from "./hooks/useMediaQuery";
import theme from "./theme/theme";
import { DeviceType } from "./types/device";

export const DeviceContext = createContext<DeviceType | null>(null);

function App() {
  const deviceType: DeviceType | null = useMediaQuery();

  return (
    <ThemeProvider theme={theme}>
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
