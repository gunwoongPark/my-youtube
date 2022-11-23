import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { RootStateType } from "../store";

const FullPageLoadingView = () => {
  // state
  const { theme: themeState } = useSelector(
    (state: RootStateType) => state.theme
  );

  return (
    <Pub.Container>
      <FadeLoader color={themeState === "DARK" ? "#ffffff" : "#000000"} />
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
