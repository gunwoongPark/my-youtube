import styled from "styled-components";

const HeaderView = () => {
  return (
    <Pub.Container>
      <p>MY-YOUTUBE</p>

      <label htmlFor="is-dark-mode-button">dark/light</label>
      <input type="checkbox" id="is-dark-mode-button" />
    </Pub.Container>
  );
};

export default HeaderView;

const Pub = {
  Container: styled.div`
    display: flex;

    & input {
    }
  `,
};
