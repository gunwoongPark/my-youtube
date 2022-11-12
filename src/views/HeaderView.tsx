import styled from "styled-components";
import { themeModel } from "../model/themeModel";

const HeaderView = () => {
  return (
    <Pub.Container>
      <p>MY-YOUTUBE</p>

      <span>
        <label htmlFor="is-dark-mode-button">
          {themeModel.theme === "DARK" ? "LIGHT MODE" : "DARK MODE"}
        </label>
        <input
          type="checkbox"
          id="is-dark-mode-button"
          checked={themeModel.theme === "DARK"}
          onChange={(e) => themeModel.onToggleTheme(e)}
        />
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
      position: absolute;
      right: 0;
    }
  `,
};
