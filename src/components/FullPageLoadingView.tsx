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
      <FadeLoader
        className="loader"
        color={theme[context?.value as ThemeType].color}
      />
    </Pub.Container>
  );
};

export default FullPageLoadingView;

const Pub = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - 125px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: ${(props) => props.theme.background};
    &.loader {
    }
  `,
};
