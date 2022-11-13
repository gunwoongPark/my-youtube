import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { themeModel } from "../model/themeModel";

const FullPageLoadingView = () => {
  return (
    <Pub.Container>
      <FadeLoader color={themeModel.theme === "DARK" ? "#ffffff" : "#000000"} />
    </Pub.Container>
  );
};

export default FullPageLoadingView;

const Pub = {
  Container: styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.background};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
