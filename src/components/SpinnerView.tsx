import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { getTheme } from "../util/getTheme";

const SpinnerView = () => {
  const themeValue = getTheme();

  return (
    <Pub.Container>
      <FadeLoader color={themeValue.color} />
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
