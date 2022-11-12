import { useContext, useEffect } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";

const HeaderView = () => {
  const value = useContext(ThemeContext);

  useEffect(() => {
    console.log(value);
  }, [value]);

  // function
  // const onChangeTheme = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.checked) {
  //     setTheme("DARK");
  //     localStorage.setItem("theme", "DARK");
  //   } else {
  //     setTheme("LIGHT");
  //     localStorage.setItem("theme", "LIGHT");
  //   }
  // }, []);

  return (
    <Pub.Container>
      <p>MY-YOUTUBE</p>

      <span>
        <label htmlFor="is-dark-mode-button">
          {/* {theme === "DARK" ? "LIGHT MODE" : "DARK MODE"} */}
        </label>
        <input
          type="checkbox"
          id="is-dark-mode-button"
          // checked={theme === "DARK"}
          // onChange={(e) => onChangeTheme(e)}
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
