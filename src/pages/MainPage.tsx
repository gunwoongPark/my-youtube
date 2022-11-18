import { observer } from "mobx-react-lite";
import styled from "styled-components";
import InputView from "../components/InputView";
import ContentsView from "../views/ContentsView";
import HeaderView from "../views/HeaderView";

const MainPage = observer(() => {
  return (
    <Pub.Container>
      <HeaderView />

      <InputView />
      <ContentsView />
    </Pub.Container>
  );
});

export default MainPage;

const Pub = {
  Container: styled.div`
    text-align: center;

    /* theme */
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
  `,
};
