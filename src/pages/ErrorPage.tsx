import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

const ErrorPage = () => {
  // navigate
  const navigate = useNavigate();

  const searchParams = useSearchParams()[0];

  const code = searchParams.get("code");
  const message = searchParams.get("message");

  return (
    <Pub.Container>
      <p>{`${code}: ${message}`}</p>
      <button onClick={() => navigate("/")}>GO HOME!</button>
    </Pub.Container>
  );
};

export default ErrorPage;

const Pub = {
  Container: styled.div``,
};
