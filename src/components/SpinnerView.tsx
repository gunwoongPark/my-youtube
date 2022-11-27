import { useContext } from "react";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { themeContext } from "../context/ThemeProvider";
import theme from "../theme/theme";
import { ThemeType } from "../types/type";

const SpinnerView = () => {
  const context = useContext(themeContext);

  return (
    <Pub.Container>
      <FadeLoader color={theme[context?.value as ThemeType].color} />
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
