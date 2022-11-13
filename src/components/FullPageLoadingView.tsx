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
  Container: styled.div``,
};
