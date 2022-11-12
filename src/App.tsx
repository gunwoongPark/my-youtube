import { observer } from "mobx-react-lite";
import { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import ContentsView from "./views/ContentsView";
import HeaderView from "./views/HeaderView";
import InputView from "./components/InputView";
import useMediaQuery from "./hooks/useMediaQuery";
import { themeModel } from "./model/themeModel";
import theme from "./theme/theme";
import { DeviceType } from "./types/device";

export const DeviceContext = createContext<DeviceType | null>(null);

const App = observer(() => {
  const deviceType = useMediaQuery();

  return (
    <ThemeProvider
      theme={themeModel.theme === "DARK" ? theme.darkMode : theme.lightMode}
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
});

export default App;

const Pub = {
  Container: styled.div`
    text-align: center;

    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
  `,
};
