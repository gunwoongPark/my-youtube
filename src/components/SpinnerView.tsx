import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import theme from "../theme/theme";
import { RootStateType, ThemeType } from "../types/type";

const SpinnerView = () => {
  // state
  const { theme: themeState } = useSelector(
    (state: RootStateType) => state.theme
  );

  return (
    <Pub.Container>
      <FadeLoader color={theme[themeState as ThemeType].color} />
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
