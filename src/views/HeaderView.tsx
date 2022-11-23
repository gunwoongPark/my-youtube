import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InputView from "../components/InputView";
import { toggleTheme } from "../store/theme/theme";
import { RootStateType } from "../types/type";

const HeaderView = () => {
  // dispatch
  const dispatch = useDispatch();

  // state
  const { theme: themeState } = useSelector(
    (state: RootStateType) => state.theme
  );

  return (
    <Pub.Container>
      <div>
        <p>MY-YOUTUBE</p>

        <span>
          <label htmlFor="is-dark-mode-button">
            {themeState === "DARK" ? "SET LIGHT MODE" : "SET DARK MODE"}
          </label>
          <input
            type="checkbox"
            id="is-dark-mode-button"
            checked={themeState === "DARK"}
            onChange={(e) => dispatch(toggleTheme(e))}
          />
        </span>
      </div>

      <InputView />
    </Pub.Container>
  );
};

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
