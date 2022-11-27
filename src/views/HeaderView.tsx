import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InputView from "../components/InputView";
import { toggleTheme } from "../store/theme/theme";
import { RootStateType } from "../types/type";
import YoutubeLogo from "../assets/youtube_logo.png";

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
        <div className="header-container">
          <img src={YoutubeLogo} alt="youtube_logo" />
          <h1>WOONGTUBE</h1>
        </div>

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

    .header-container {
      display: inline-flex;
      align-items: center;

      img {
        width: 122px;
      }
      h1 {
        display: inline-block;
        font-size: 36px;
        color: ${(props) => props.theme.color};
      }
    }

    & span {
      position: absolute;
      right: 25px;
    }
  `,
};
