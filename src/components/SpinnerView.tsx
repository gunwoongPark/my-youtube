import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { themeModel } from "../model/themeModel";

const SpinnerView = () => {
  return (
    <Pub.Container>
      <FadeLoader color={themeModel.theme === "DARK" ? "#ffffff" : "#000000"} />
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
