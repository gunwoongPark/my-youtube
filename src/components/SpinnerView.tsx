import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { RootStateType } from "../types/type";

const SpinnerView = () => {
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

export default SpinnerView;

const Pub = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;
  `,
};
