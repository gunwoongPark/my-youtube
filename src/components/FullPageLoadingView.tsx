import { FadeLoader } from "react-spinners";
import styled from "styled-components";

const FullPageLoadingView = () => {
  return (
    <Pub.Container>
      <FadeLoader color="#ffffff" />
    </Pub.Container>
  );
};

export default FullPageLoadingView;

const Pub = {
  Container: styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
