import { useContext } from "react";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { themeContext } from "../context/ThemeProvider";
import theme from "../theme/theme";
import { ThemeType } from "../types/type";

const FullPageLoadingView = () => {
  const context = useContext(themeContext);

  return (
    <Pub.Container>
      <FadeLoader color={theme[context?.value as ThemeType].color} />
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
