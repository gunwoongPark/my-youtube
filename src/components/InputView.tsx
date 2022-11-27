import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

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
    }
  }, 1000);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (!e.target.value.length) {
      navigate({ pathname: "/" });
    }
    debounceOnChange(e);
  };

  return (
    <Input
      placeholder="type the video you want to search for"
      type="text"
      value={searchInput}
      onChange={(e) => onChangeInput(e)}
    />
  );
};

export default InputView;

const Input = styled.input`
  border: 1px solid #303030;
  outline: none;
  width: 280px;
  height: 24px;
  padding: 8px 12px;
  border-radius: 7px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};

  &:focus {
    border: 1px solid #0075ff;
    outline: none;
  }
`;
