import { observer } from "mobx-react-lite";
import styled from "styled-components";
import InputView from "../components/InputView";
import { themeModel } from "../model/themeModel";

const HeaderView = observer(() => {
  return (
    <Pub.Container>
      <div>
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
      </div>

      <InputView />
    </Pub.Container>
  );
});

export default HeaderView;

const Pub = {
  Container: styled.div`
    width: 100%;
    text-align: center;

    & p {
      display: inline-block;
    }

    & span {
      position: absolute;
      right: 25px;
    }
  `,
};
