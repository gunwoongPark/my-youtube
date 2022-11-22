import { debounce } from "lodash";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const InputView = () => {
  const navigate = useNavigate();

  const debounceOnChange = debounce((e) => {
    if (!!e.target.value.length) {
      navigate({ pathname: "/search", search: `?keyword=${e.target.value}` });
    } else {
      navigate({ pathname: "/" });
    }
  }, 750);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    debounceOnChange(e);
  };

  return <input type="text" onChange={(e) => onChangeInput(e)} />;
};

export default InputView;
