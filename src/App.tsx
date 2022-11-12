import { observer } from "mobx-react-lite";
import styled, { ThemeProvider } from "styled-components";
import ContentsView from "./views/ContentsView";
import HeaderView from "./views/HeaderView";
import InputView from "./components/InputView";
import { themeModel } from "./model/themeModel";
import theme from "./theme/theme";

const App = observer(() => {
  return (
    <ThemeProvider
      theme={themeModel.theme === "DARK" ? theme.darkMode : theme.lightMode}
    >
      <Pub.Container>
        <HeaderView />

        <InputView />
        <ContentsView />
      </Pub.Container>
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
