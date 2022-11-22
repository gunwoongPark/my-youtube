import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const InputView = () => {
  // navigate
  const navigate = useNavigate();
  // searchParams
  const searchParams = useSearchParams()[0];

  const [searchInput, setSearchInput] = useState<string>("");

  // useEffect
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (typeof keyword === "string") {
      setSearchInput(keyword);
    }
  }, [searchParams]);

  // function
  const debounceOnChange = debounce((e) => {
    if (!!e.target.value.length) {
      navigate({ pathname: "/search", search: `?keyword=${e.target.value}` });
    } else {
      navigate({ pathname: "/" });
    }
  }, 1000);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debounceOnChange(e);
  };

  return (
    <input type="text" value={searchInput} onChange={(e) => onChangeInput(e)} />
  );
};

export default InputView;
