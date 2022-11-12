import styled from "styled-components";

const HeaderView = () => {
  return (
    <Pub.Container>
      <p>MY-YOUTUBE</p>

      <span>
        <label htmlFor="is-dark-mode-button">dark/light</label>
        <input type="checkbox" id="is-dark-mode-button" />
      </span>
    </Pub.Container>
  );
};

export default HeaderView;

const Pub = {
  Container: styled.div`
    width: 100%;

    & p {
      display: inline-block;
    }

    & span {
      float: right;
    }
  `,
};
