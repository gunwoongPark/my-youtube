import styled, { ThemeProvider } from "styled-components";
import ContentsView from "./components/ContentsView";
import InputView from "./components/InputView";
import theme from "./theme/theme";

function App() {
  console.log(window.matchMedia("screen and (max-width: 375px)"));

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
