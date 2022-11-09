import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import ContentsView from "./components/ContentsView";
import InputView from "./components/InputView";
import useMediaQuery from "./hooks/useMediaQuery";
import theme from "./theme/theme";
import { DeviceType } from "./types/device";

function App() {
  const deviceType: DeviceType | null = useMediaQuery();

  useEffect(() => {
    console.log(deviceType);
  }, [deviceType]);

  return (
    <ThemeProvider theme={theme}>
      <Pub.Container>
        <p>MY YOUTUBE</p>

        <InputView />
        <ContentsView />
      </Pub.Container>
    </ThemeProvider>
  );
}

export default App;

const Pub = {
  Container: styled.div`
    text-align: center;
  `,
};
