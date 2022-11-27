import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const DetailPage = () => {
  const searchParams = useSearchParams()[0];

  return (
    <Pub.Container>
      <iframe
        width="85%"
        height="85%"
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

const Pub = {
  Container: styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  `,
};
