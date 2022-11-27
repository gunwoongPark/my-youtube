import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";
import { DeviceType } from "../types/type";

const DetailPage = () => {
  const deviceType = useMediaQuery();
  const searchParams = useSearchParams()[0];

  return (
    <Pub.Container deviceType={deviceType as DeviceType}>
      <iframe
        src={`https://www.youtube.com/embed/${searchParams.get("id")}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Pub.Container>
  );
};

export default DetailPage;

interface DetailPageStylePropsType {
  deviceType: DeviceType;
}

const Pub = {
  Container: styled.div<DetailPageStylePropsType>`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;

    & iframe {
      width: ${({ deviceType }) => {
        if (deviceType === "PC") {
          return css`85%`;
        } else {
          return css`100%`;
        }
      }};
      aspect-ratio: 16/9;
    }
  `,
};
