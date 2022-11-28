import styled from "styled-components";
import InputView from "../components/InputView";
import YoutubeLogo from "../assets/youtube-icon-1.svg";
import { useContext } from "react";
import { themeContext } from "../context/ThemeProvider";

const HeaderView = () => {
  const context = useContext(themeContext);

  return (
    <Pub.Container>
      <div>
        <div className="header-container">
          <img src={YoutubeLogo} alt="youtube_logo" />
          <h1>WOONGTUBE</h1>
        </div>

        <span>
          <label htmlFor="is-dark-mode-button">
            {context?.value === "DARK" ? "SET LIGHT MODE" : "SET DARK MODE"}
          </label>
          <input
            type="checkbox"
            id="is-dark-mode-button"
            checked={context?.value === "DARK"}
            onChange={(e) => context?.action(e)}
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
    margin-top: 12px;

    .header-container {
      display: inline-flex;
      align-items: center;

      img {
        width: 56px;
        margin-right: 6px;
      }
      h1 {
        font-size: 28px;
      }
    }

    & span {
      position: absolute;
      right: 25px;
    }
  `,
};
