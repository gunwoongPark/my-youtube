import styled from "styled-components";
import ContentsView from "./components/ContentsView";
import InputView from "./components/InputView";

function App() {
  return (
    <Pub.Container>
      <p>MY YOUTUBE</p>

      <InputView />
      <ContentsView />
    </Pub.Container>
  );
}

export default App;

const Pub = {
  Container: styled.div`
    text-align: center;
  `,
};
