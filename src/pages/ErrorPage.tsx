import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

const ErrorPage = () => {
  // navigate
  const navigate = useNavigate();
  // searchParams
  const searchParams = useSearchParams()[0];

  return (
    <Pub.Container>
      <p>{`${searchParams.get("code")}: ${searchParams.get("message")}`}</p>
      <button onClick={() => navigate("/")}>GO HOME!</button>
    </Pub.Container>
  );
};

export default ErrorPage;

const Pub = {
  Container: styled.div``,
};
