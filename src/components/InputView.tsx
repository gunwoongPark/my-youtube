import { debounce } from "lodash";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import { searchModel } from "../model/searchModel";

const InputView = observer(() => {
  const debounceOnChange = debounce(
    action((e) => {
      searchModel.keyword = e.target.value;
    }),
    1000
  );
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    debounceOnChange(e);
  };

  return <input type="text" onChange={(e) => onChangeInput(e)} />;
});

export default InputView;
