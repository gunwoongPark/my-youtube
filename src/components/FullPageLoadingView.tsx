import { FadeLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";

const FullPageLoadingView = () => {
  const themeValue = useTheme();

  return (
    <Pub.Container>
      <FadeLoader className="loader" color={themeValue.color} />
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
